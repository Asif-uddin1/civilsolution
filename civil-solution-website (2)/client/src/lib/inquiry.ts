export type InquiryFields = {
  name: string;
  phone: string;
  projectLocation: string;
  email?: string;
  service?: string;
  message: string;
};

export function hasRequiredInquiryFields({ name, phone, projectLocation, message }: Pick<InquiryFields, "name" | "phone" | "projectLocation" | "message">) {
  return Boolean(name.trim() && phone.trim() && projectLocation.trim() && message.trim());
}

export function buildInquiryText({ name, phone, projectLocation, email, service, message }: InquiryFields) {
  return [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Project location: ${projectLocation}`,
    email?.trim() ? `Email: ${email.trim()}` : "",
    service?.trim() ? `Service: ${service.trim()}` : "",
    `Message: ${message}`,
  ].filter(Boolean).join("\n");
}
