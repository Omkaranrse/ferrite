import { NextResponse } from "next/server";

// Comprehensive Steel Knowledge Base for Ferrite Structural Steels
const STEEL_SYSTEM_PROMPT = `
You are the Senior AI Technical Consultant for Ferrite Structural Steels Pvt. Ltd. (Lineage dating back to 1965, formerly Payal Enterprises).
Headquarters: Excel Plaza, 803/8 wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai - 400075.
Stockholding Yard: Plot 18, KWC (Kalamboli Warehousing Complex), Navi Mumbai - 410218.
Phone / WhatsApp: +91 88283 35168 | Email: contact@ferrite.in

PRODUCTS OFFERED:
1. Structural Beams: ISMB 100 to ISMB 600, NPB, WPB, Universal Beams & Columns. High load-bearing for multi-story framing, PEB, infrastructure.
2. Steel Channels: ISMC 75 to ISMC 400. Used in purlins, columns, equipment base frames, bridges.
3. Steel Angles: Equal and Unequal Angles (ISA 20x20x3mm up to 200x200x25mm). Transmission towers, bracing, general fabrication.
4. Hot Rolled Plates & Sheets: 5mm to 100mm+ thickness. IS 2062 Grade E250 / E350. Heavy engineering, tanks, yellow goods.
5. Chequered Plates: Tear drop and diamond pattern for industrial flooring, bridge walkways, stairs.
6. Hollow Sections: SHS (Square Hollow Sections 20x20 to 300x300mm), RHS (Rectangular Hollow Sections 40x20 to 400x200mm), Round Pipes.
7. TMT & Merchant Bars: Round, Square, Flat bars.

SERVICES & CAPABILITIES:
- Custom band saw cutting, precision CNC oxy-fuel/plasma cutting to exact drawing sizes.
- Beveling, hole punching, shot blasting, primer coating.
- 100% Mill Test Certificate (MTC) traceability directly from primary producers: SAIL, RINL (Rashtriya Ispat Nigam Ltd), Jindal.
- Pan-India dispatch from Kalamboli stockyard with weighbridge verification.

TONE & GUIDELINES:
- Professional, technically precise, polite, commercial, and helpful.
- When users ask about prices, explain that structural steel prices fluctuate daily with raw material markets, and offer an immediate official quote based on section size, quantity (MT), and delivery location.
- Encourage them to share contact details (Phone/WhatsApp) or connect directly with our sales desk at +91 88283 35168.
- Keep responses concise (2 to 4 short paragraphs or bullet points).
`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages payload" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content.trim();

    // 1. Check for Gemini API Key
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: STEEL_SYSTEM_PROMPT }],
            },
            contents: messages.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Thank you for contacting Ferrite. How can our sales engineering team assist your project today?";
        return NextResponse.json({ reply: replyText });
      }
    }

    // 2. Check for OpenAI API Key
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: STEEL_SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.3,
          max_tokens: 600,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content;
        if (replyText) {
          return NextResponse.json({ reply: replyText });
        }
      }
    }

    // 3. Built-in Steel Knowledge Engine (Deterministic Fallback)
    const reply = generateSteelExpertReply(lastUserMessage);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Our sales desk is currently processing high volume. Please call or WhatsApp our engineers directly at +91 88283 35168 or email contact@ferrite.in for instant assistance.",
      },
      { status: 200 }
    );
  }
}

function generateSteelExpertReply(query: string): string {
  const q = query.toLowerCase();

  // Price / Quote queries
  if (q.includes("price") || q.includes("rate") || q.includes("quote") || q.includes("cost") || q.includes("pricing")) {
    return (
      "Structural steel rates fluctuate daily based on primary mill rollings (SAIL/RINL) and raw material index.\n\n" +
      "To provide an accurate, competitive landed quote, please share:\n" +
      "• Required Section (e.g. ISMB 300, ISMC 150, Plate 25mm)\n" +
      "• Steel Grade (IS 2062 E250 / E350)\n" +
      "• Approximate Tonnage (MT)\n" +
      "• Delivery Location\n\n" +
      "You can also click below to forward your specs directly to our Kalamboli sales team on WhatsApp (+91 88283 35168)."
    );
  }

  // Stock / Kalamboli / Availability
  if (q.includes("stock") || q.includes("inventory") || q.includes("yard") || q.includes("kalamboli") || q.includes("delivery")) {
    return (
      "We maintain extensive ready inventory at Plot 18, Kalamboli Warehousing Complex (KWC), Navi Mumbai.\n\n" +
      "• Fast Dispatch: Standard ISMB, ISMC, ISA, plates, and hollow sections can be weighed and dispatched within 24 to 48 hours.\n" +
      "• Pan-India Fleet: Direct trailer transit across Maharashtra, Gujarat, Goa, Karnataka, and nationwide.\n" +
      "• Full Traceability: Every batch is issued with primary producer Mill Test Certificates (MTC)."
    );
  }

  // Beam queries
  if (q.includes("beam") || q.includes("ismb") || q.includes("npb") || q.includes("wpb") || q.includes("joist")) {
    return (
      "Ferrite stocks a complete range of structural beams:\n\n" +
      "• Indian Standard Medium Beams: ISMB 100 up to ISMB 600\n" +
      "• Wide Flange & Parallel Flange: NPB, WPB, Universal Beams / Columns\n" +
      "• Primary Mills: Authorized MoU partner for SAIL & RINL\n" +
      "• Value-Added Processing: Cut-to-length band saw sizing ready for on-site PEB/girder erection."
    );
  }

  // Channel queries
  if (q.includes("channel") || q.includes("ismc")) {
    return (
      "We stock heavy and medium structural channels conforming to IS 2062:\n\n" +
      "• Standard Sizes: ISMC 75 up to ISMC 400\n" +
      "• Applications: Industrial purlins, base frames, bridge walkways, support columns\n" +
      "• Custom Fabrication: Precision mitre cutting and hole punching available prior to dispatch."
    );
  }

  // Angle queries
  if (q.includes("angle") || q.includes("isa")) {
    return (
      "Our angle inventory covers both equal and unequal sections:\n\n" +
      "• Sizes: ISA 20x20x3mm up to heavy 200x200x25mm\n" +
      "• Standards: Conforming to IS 2062 Grade E250 BR/BO with full impact testing certificates available\n" +
      "• Usage: Telecom towers, solar structures, industrial roof trusses."
    );
  }

  // Plate / Sheet queries
  if (q.includes("plate") || q.includes("sheet") || q.includes("chequered") || q.includes("cheker")) {
    return (
      "We stock hot rolled structural plates & chequered sheets:\n\n" +
      "• Thickness: 5mm to 100mm+ in standard dimensions (1500x6000, 2000x8000, 2500x12000)\n" +
      "• Grades: IS 2062 E250, E350 (High Tensile), Boiler Quality ASTM/ASME\n" +
      "• Chequered Plates: Tear-drop pattern for safe industrial walkways and ramp flooring\n" +
      "• Profiling: High-definition CNC flame/plasma profiling to client drawings."
    );
  }

  // Pipe / Hollow section queries
  if (q.includes("pipe") || q.includes("hollow") || q.includes("shs") || q.includes("rhs")) {
    return (
      "Our structural tubing inventory includes:\n\n" +
      "• Square Hollow Sections (SHS): 20x20mm to 300x300mm\n" +
      "• Rectangular Hollow Sections (RHS): 40x20mm to 400x200mm\n" +
      "• Round Structural & ERW Pipes: Conforming to IS 4923 / IS 1239\n" +
      "• Surface Finishes: Black (as rolled), shop-primed, or hot-dip galvanized."
    );
  }

  // MTC / Certification / Quality
  if (q.includes("mtc") || q.includes("test") || q.includes("cert") || q.includes("quality") || q.includes("sail") || q.includes("rinl")) {
    return (
      "Ferrite provides 100% genuine Mill Test Certificates (MTC) with every delivery:\n\n" +
      "• Heat Number Traceability: Stamped directly on the steel and matched to official test documents.\n" +
      "• Mechanical & Chemical Properties: Yield strength, tensile strength, elongation, and carbon equivalent values verified.\n" +
      "• Third-Party Inspection (TPI): Lloyd's, Bureau Veritas, SGS, and TUV inspections welcomed at our Kalamboli yard."
    );
  }

  // Contact / Office / Hours
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("address") || q.includes("location") || q.includes("office")) {
    return (
      "Here is how you can connect with our leadership and sales team:\n\n" +
      "🏢 Commercial HQ: Excel Plaza, 803/8 wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai - 400075\n" +
      "🏗️ Warehouse: Plot 18, Kalamboli Warehousing Complex (KWC), Navi Mumbai\n" +
      "📞 Direct Call & WhatsApp: +91 88283 35168\n" +
      "✉️ Email: contact@ferrite.in\n" +
      "⏰ Working Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST"
    );
  }

  // Default helpful response
  return (
    "Hello! I am the Ferrite AI Steel Consultant. We supply primary structural steel (Beams, Channels, Angles, Plates, Pipes) directly from our Kalamboli warehousing facility.\n\n" +
    "How can I assist your project today? You can ask about:\n" +
    "• Current sectional dimensions & weights\n" +
    "• Mill Test Certificates (MTC) & IS 2062 specifications\n" +
    "• Ready stock status at Kalamboli\n" +
    "• Requesting an instant landed quote for your bill of materials (BOQ)"
  );
}
