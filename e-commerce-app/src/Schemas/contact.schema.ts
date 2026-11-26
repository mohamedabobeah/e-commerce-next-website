import * as zod from "zod";

export const contactSubjects = [
  "General Inquiry",
  "Order Support",
  "Returns & Refunds",
  "Product Question",
  "Feedback",
  "Other",
];

export const ContactSchema = zod.object({
  name: zod
    .string()
    .min(1, "name is required")
    .min(3, "min length is 3 chars"),

  email: zod.string().min(1, "email is required").email("invalid email"),

  subject: zod.string().min(1, "please select a subject"),

  message: zod
    .string()
    .min(1, "message is required")
    .min(10, "message must be at least 10 characters")
    .max(1000, "max length is 1000 chars"),
});

export type ContactType = zod.infer<typeof ContactSchema>;