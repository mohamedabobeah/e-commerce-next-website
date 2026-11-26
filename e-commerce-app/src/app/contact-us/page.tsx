import Link from "next/link";
import type { Metadata } from "next";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
  LuArrowRight,
  LuCircleHelp,
  LuClock,
  LuHeadset,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import PageHero from "@/app/_components/PageHero/PageHero";
import Reveal from "@/app/_components/Reveal/Reveal";
import ContactForm from "@/app/_components/ContactForm/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

const infoCards = [
  {
    icon: LuPhone,
    title: "Phone",
    lines: ["Mon-Fri from 8am to 6pm"],
    link: { label: "+1 (800) 123-4567", href: "tel:+18001234567" },
  },
  {
    icon: LuMail,
    title: "Email",
    lines: ["We'll respond within 24 hours"],
    link: { label: "support@freshcart.com", href: "mailto:support@freshcart.com" },
  },
  {
    icon: LuMapPin,
    title: "Office",
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
  },
  {
    icon: LuClock,
    title: "Business Hours",
    lines: [
      "Monday - Friday: 8am - 6pm",
      "Saturday: 9am - 4pm",
      "Sunday: Closed",
    ],
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        icon={<LuHeadset />}
      />

      <section className="mx-auto grid w-[90%] max-w-6xl gap-6 py-10 lg:grid-cols-[1fr_2fr]">
        {/* Info */}
        <div className="space-y-4">
          {infoCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 90}>
              <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-lg text-green-600">
                  <card.icon />
                </span>

                <div className="text-sm">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>

                  {card.lines.map((line) => (
                    <p key={line} className="mt-1 text-gray-500">
                      {line}
                    </p>
                  ))}

                  {card.link && (
                    <a
                      href={card.link.href}
                      className="mt-1 inline-block font-medium text-green-600 hover:text-green-700"
                    >
                      {card.link.label}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={360}>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-gray-900">Follow Us</h3>

              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-green-600 hover:text-white"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form + help center */}
        <div className="space-y-6">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={150}>
            <div className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm">
                <LuCircleHelp />
              </span>

              <div className="text-sm">
                <h3 className="font-semibold text-gray-900">
                  Looking for quick answers?
                </h3>

                <p className="mt-1 text-gray-600">
                  Check out our Help Center for frequently asked questions
                  about orders, shipping, returns, and more.
                </p>

                <Link
                  href="/help-center"
                  className="mt-3 inline-flex items-center gap-2 font-medium text-green-600 transition hover:gap-3 hover:text-green-700"
                >
                  Visit Help Center
                  <LuArrowRight />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}