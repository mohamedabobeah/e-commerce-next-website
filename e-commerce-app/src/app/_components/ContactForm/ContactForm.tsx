"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LuHeadset, LuSend } from "react-icons/lu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ContactSchema,
  ContactType,
  contactSubjects,
} from "@/Schemas/contact.schema";

// the same look for the select and the textarea
const controlClasses =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 aria-invalid:border-red-500";

export default function ContactForm() {
  const form = useForm<ContactType>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: ContactType) {
    // there is no contact api in this project, so we only pretend to send it
    console.log("Contact message:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Your message has been sent. We will reply within 24 hours.", {
      position: "top-center",
      duration: 3000,
    });

    reset();
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600">
          <LuHeadset />
        </span>

        <div className="leading-tight">
          <h2 className="text-lg font-bold text-gray-900">Send us a Message</h2>
          <p className="text-sm text-gray-500">
            Fill out the form and we&apos;ll get back to you
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="nameInput" className="text-[#16A34A]!">
                  Full Name
                </FieldLabel>
                <Input
                  {...field}
                  id="nameInput"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="emailInput" className="text-[#16A34A]!">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id="emailInput"
                  aria-invalid={fieldState.invalid}
                  placeholder="john@example.com"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subjectInput" className="text-[#16A34A]!">
                Subject
              </FieldLabel>

              <select
                {...field}
                id="subjectInput"
                aria-invalid={fieldState.invalid}
                className={controlClasses}
              >
                <option value="">Select a subject</option>

                {contactSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="messageInput" className="text-[#16A34A]!">
                Message
              </FieldLabel>

              <textarea
                {...field}
                id="messageInput"
                rows={6}
                aria-invalid={fieldState.invalid}
                placeholder="How can we help you?"
                className={`${controlClasses} resize-y`}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuSend />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}