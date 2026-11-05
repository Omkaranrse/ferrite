import ServicesPage, { metadata as servicesMetadata } from "@/app/services/page";

export const metadata = {
  ...servicesMetadata,
  alternates: {
    canonical: "/services",
  },
};

export default ServicesPage;
