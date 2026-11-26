import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

const gradients = {
  green: "from-green-600 to-emerald-400",
  purple: "from-purple-600 to-fuchsia-400",
};

export default function PageHero({
  title,
  subtitle,
  crumbs,
  icon,
  image,
  color = "green",
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  icon?: ReactNode; // small icon box (like the design)
  image?: string; // or a picture (category / brand details)
  color?: "green" | "purple";
}) {
  return (
    <section className={`bg-gradient-to-r ${gradients[color]}`}>
      <div className="w-[90%] mx-auto py-10 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
          {crumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}

              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {image ? (
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white p-3">
              <img
                src={image}
                alt={title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : icon ? (
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl text-white">
              {icon}
            </div>
          ) : null}

          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {title}
            </h1>

            {subtitle && <p className="mt-1 text-white/90">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}