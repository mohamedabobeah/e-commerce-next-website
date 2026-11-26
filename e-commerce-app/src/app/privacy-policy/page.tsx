import type { Metadata } from "next";
import {
  FaUserCog,
} from "react-icons/fa";
import {
  LuClock,
  LuCookie,
  LuDatabase,
  LuLock,
  LuMail,
  LuShare2,
  LuShieldCheck,
  LuUserCheck,
} from "react-icons/lu";
import LegalPage, { LegalArticle } from "@/app/_components/LegalPage/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

const articles: LegalArticle[] = [
  {
    icon: LuDatabase,
    title: "Information We Collect",
    items: [
      { label: "Personal Data", text: "Name, email address, phone number, and shipping address." },
      { label: "Payment Data", text: "Credit card information processed securely through our payment providers." },
      { label: "Technical Data", text: "IP address, browser type, device information, and access times." },
      { label: "Usage Data", text: "Pages viewed, products browsed, and actions taken within our platform." },
    ],
  },
  {
    icon: FaUserCog,
    title: "How We Use Your Information",
    items: [
      { text: "To process and fulfill your orders." },
      { text: "To send order confirmations and shipping updates." },
      { text: "To provide customer support and respond to inquiries." },
      { text: "To improve our products, services, and user experience." },
      { text: "To send promotional communications (with your consent)." },
    ],
  },
  {
    icon: LuLock,
    title: "Data Protection",
    items: [
      { text: "We implement industry-standard encryption (SSL/TLS) for all data transfers." },
      { text: "Payment information is processed by PCI-compliant payment providers." },
      { text: "We conduct regular security audits and vulnerability assessments." },
      { text: "Access to personal data is restricted to authorized personnel only." },
    ],
  },
  {
    icon: LuShare2,
    title: "Information Sharing",
    items: [
      { text: "We do not sell, trade, or rent your personal information to third parties." },
      { text: "We may share data with trusted service providers who assist in our operations." },
      { text: "We may disclose information when required by law or to protect our rights." },
    ],
  },
  {
    icon: LuUserCheck,
    title: "Your Rights",
    items: [
      { label: "Access", text: "Request a copy of your personal data." },
      { label: "Rectification", text: "Request correction of inaccurate data." },
      { label: "Erasure", text: "Request deletion of your personal data." },
      { label: "Portability", text: "Request your data in a portable format." },
      { label: "Opt-out", text: "Unsubscribe from marketing communications at any time." },
    ],
  },
  {
    icon: LuCookie,
    title: "Cookies",
    items: [
      { text: "We use cookies to enhance your browsing experience and remember preferences." },
      { text: "You can control cookie settings through your browser preferences." },
      { text: "Disabling cookies may affect the functionality of certain features." },
    ],
  },
  {
    icon: LuClock,
    title: "Data Retention",
    paragraph:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
  },
  {
    icon: LuMail,
    title: "Contact Us",
    paragraph: (
      <>
        For questions about this Privacy Policy or to exercise your rights,
        contact our Data Protection Officer at{" "}
        <a
          href="mailto:privacy@freshcart.com"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          privacy@freshcart.com
        </a>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="February 2026"
      heroIcon={<LuShieldCheck />}
      notice={{
        title: "Your Privacy Matters",
        text: "This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.",
        icon: LuShieldCheck,
        tone: "green",
      }}
      articles={articles}
      nextLink={{ label: "View Terms of Service", href: "/terms-of-service" }}
    />
  );
}
