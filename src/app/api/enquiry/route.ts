import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let company = "";
    let email = "";
    let phone = "";
    let productCategory = "";
    let processingNeeds: string[] = [];
    let tonnage = "";
    let destination = "";
    let message = "";
    let honeypot = "";
    let attachmentName = "";
    let attachmentSize = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      company = (formData.get("company") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      productCategory = (formData.get("productCategory") as string) || "";
      tonnage = (formData.get("tonnage") as string) || "";
      destination = (formData.get("destination") as string) || "";
      message = (formData.get("message") as string) || "";
      honeypot = (formData.get("botcheck") as string) || "";

      const rawNeeds = formData.getAll("processingNeeds");
      processingNeeds = rawNeeds.map((n) => n.toString());

      const file = formData.get("attachment") as File | null;
      if (file && file.size > 0) {
        // Validate file type
        const allowedExtensions = [".pdf", ".dwg", ".dxf", ".xlsx", ".xls", ".doc", ".docx"];
        const lowerName = file.name.toLowerCase();
        const hasValidExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));

        if (!hasValidExt) {
          return NextResponse.json(
            { success: false, error: "Invalid file type. Only CAD drawings (.dwg, .dxf), PDF schedules, and Excel BOQ files are permitted." },
            { status: 400 }
          );
        }

        // Validate max 10MB
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: "File exceeds 10MB size limit. Please compress or link via drawing notes." },
            { status: 400 }
          );
        }

        attachmentName = file.name;
        attachmentSize = file.size;
      }
    } else {
      const body = await req.json();
      name = body.name || "";
      company = body.company || "";
      email = body.email || "";
      phone = body.phone || "";
      productCategory = body.productCategory || body.requirement || "";
      processingNeeds = Array.isArray(body.processingNeeds) ? body.processingNeeds : [];
      tonnage = body.tonnage || "";
      destination = body.destination || "";
      message = body.message || body.specifications || "";
      honeypot = body.botcheck || "";
      attachmentName = body.attachmentName || "";
    }

    // 1. Spam Honeypot Protection
    if (honeypot && honeypot.trim().length > 0) {
      console.warn("[Spam Rejected] Honeypot field filled by bot.");
      return NextResponse.json({ success: true, ticketId: "FSS-REC-SPM" });
    }

    // 2. Field Validations
    const errors: string[] = [];
    if (!name.trim()) errors.push("Full name is required.");
    if (!company.trim()) errors.push("Company name is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errors.push("A valid business email address is required.");
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      errors.push("A valid phone number (minimum 9 digits) is required.");
    }

    if (!productCategory.trim()) {
      errors.push("Material / product requirement is required.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // 3. Generate Official Quotation / Tracking Reference
    const currentYear = new Date().getFullYear();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const ticketId = `FSS-${currentYear}-${randomCode}`;

    const enquiryRecord = {
      ticketId,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      company: company.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      productCategory,
      tonnage: tonnage || "Unspecified",
      destination: destination || "Pan-India",
      processingNeeds,
      message: message.trim(),
      attachment: attachmentName ? `${attachmentName} (${Math.round(attachmentSize / 1024)} KB)` : "None",
    };

    console.info("[Enquiry Received via API]", enquiryRecord);

    // 4. Dispatch Email / Webhook Notification if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL || "contact@ferrite.in";
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Ferrite Inquiries <rfq@ferrite.in>",
            to: [notificationEmail],
            reply_to: email,
            subject: `[New Structural RFQ: ${ticketId}] from ${company} - ${productCategory}`,
            html: `
              <h2>Ferrite Structural Steels — Quotation Request</h2>
              <p><strong>Reference Ticket:</strong> ${ticketId}</p>
              <p><strong>Client:</strong> ${name} (${company})</p>
              <p><strong>Contact:</strong> ${phone} | ${email}</p>
              <p><strong>Material Category:</strong> ${productCategory}</p>
              <p><strong>Tonnage:</strong> ${tonnage}</p>
              <p><strong>Destination:</strong> ${destination}</p>
              <p><strong>Processing Requirements:</strong> ${processingNeeds.join(", ") || "Standard Mill Stock"}</p>
              <p><strong>Drawing / Specifications:</strong></p>
              <blockquote style="background:#f4f3ef;padding:12px;border-left:4px solid #c47a48;">${message || "No additional text provided"}</blockquote>
              <p><strong>Attachment:</strong> ${attachmentName || "None"}</p>
            `,
          }),
        });
      } catch (err) {
        console.error("[Email Dispatch Warning]", err);
      }
    }

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enquiryRecord),
        });
      } catch (webhookErr) {
        console.error("[Webhook Dispatch Warning]", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Quotation request successfully logged with the commercial desk.",
      assignedHubs: {
        commercial: "Ghatkopar Headquarters, Mumbai",
        facility: "Kalamboli Warehousing Complex, Navi Mumbai",
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[Enquiry Handler Exception]", errorMsg);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your quotation request. Please reach our desk at +91 88283 35168." },
      { status: 500 }
    );
  }
}
