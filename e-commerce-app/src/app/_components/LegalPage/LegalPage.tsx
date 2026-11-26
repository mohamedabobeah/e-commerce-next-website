import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import PageHero from "../PageHero/PageHero";
import Reveal from "../Reveal/Reveal";

export interface LegalItem {
  label?: string; // the bold word at the start (Personal Data, Access ...)
  text: string;
}

export interface LegalArticle {
  icon: IconType;
  title: string;
  items?: LegalItem[]; // numbered list
  paragraph?: ReactNode; // or a simple paragraph
}

const noticeTones = {
  green: {
    box: "border-green-200 bg-green-50",
    icon: "bg-green-500",
    title: "text-green-900",
    text: "text-green-800",
  },
  amber: {
    box: "border-amber-200 bg-amber-50",
    icon: "bg-amber-500",
    title: "text-amber-900",
    text: "text-amber-800",
  },
};

export default function LegalPage({
  title,
  updated,
  heroIcon,
  notice,
  articles,
  nextLink,
}: {
  title: string;
  updated: string;
  heroIcon: ReactNode;
  notice: {
    title: string;
    text: string;
    icon: IconType;
    tone: "green" | "amber";
  };
  articles: LegalArticle[];
  nextLink: { label: string; href: string };
}) {
  const tone = noticeTones[notice.tone];

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title={title}
        subtitle={`Last updated: ${updated}`}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        icon={heroIcon}
      />

      <div className="mx-auto w-[90%] max-w-6xl py-10">
        {/* Important notice */}
        <Reveal>
          <div
            className={`flex items-start gap-4 rounded-2xl border p-6 ${tone.box}`}
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-xl text-white ${tone.icon}`}
            >
              <notice.icon />
            </span>

            <div>
              <h2 className={`font-semibold ${tone.title}`}>{notice.title}</h2>
              <p className={`mt-1 text-sm ${tone.text}`}>{notice.text}</p>
            </div>
          </div>
        </Reveal>

        {/* Articles */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <Reveal key={article.title} delay={(index % 2) * 120}>
              <article className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">
                <header className="mb-4 flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600 transition group-hover:bg-green-500 group-hover:text-white">
                    <article.icon />
                  </span>

                  <div className="leading-tight">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-green-600">
                      Article {index + 1}
                    </p>
                    <h2 className="text-lg font-bold text-gray-900">
                      {article.title}
                    </h2>
                  </div>
                </header>

                {article.items && (
                  <ul className="space-y-3">
                    {article.items.map((item, itemIndex) => (
                      <li
                        key={item.text}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="mt-0.5 shrink-0 rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-600">
                          {index + 1}.{itemIndex + 1}
                        </span>

                        <span>
                          {item.label && (
                            <strong className="font-semibold text-gray-900">
                              {item.label}:{" "}
                            </strong>
                          )}
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {article.paragraph && (
                  <p className="text-sm leading-relaxed text-gray-700">
                    {article.paragraph}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <LuArrowLeft />
            Back to Home
          </Link>

          <Link
            href={nextLink.href}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            {nextLink.label}
            <LuArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}