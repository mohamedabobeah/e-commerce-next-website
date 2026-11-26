import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type SearchParams = Record<string, string | string[] | undefined>;

// keep every filter in the url and change only the page number
function buildHref(basePath: string, searchParams: SearchParams, page: number) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.set(key, value);
    }
  }

  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

// 1 ... 4 5 6 ... 20
function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const wanted = [1, total, current - 1, current, current + 1]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)
    .filter((page, index, list) => list.indexOf(page) === index);

  const result: (number | "...")[] = [];

  wanted.forEach((page, index) => {
    if (index > 0 && page - wanted[index - 1] > 1) result.push("...");
    result.push(page);
  });

  return result;
}

export default function Pagination({
  currentPage,
  numberOfPages,
  basePath,
  searchParams,
}: {
  currentPage: number;
  numberOfPages: number;
  basePath: string;
  searchParams: SearchParams;
}) {
  if (numberOfPages <= 1) return null;

  const arrowClasses =
    "flex size-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-green-600 hover:text-green-600";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, searchParams, currentPage - 1)}
          aria-label="Previous page"
          className={arrowClasses}
        >
          <LuChevronLeft />
        </Link>
      ) : (
        <span className={`${arrowClasses} pointer-events-none opacity-40`}>
          <LuChevronLeft />
        </span>
      )}

      {getPageNumbers(currentPage, numberOfPages).map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-1 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(basePath, searchParams, page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex size-10 items-center justify-center rounded-md border text-sm font-medium transition ${
              page === currentPage
                ? "border-green-600 bg-green-600 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-600"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < numberOfPages ? (
        <Link
          href={buildHref(basePath, searchParams, currentPage + 1)}
          aria-label="Next page"
          className={arrowClasses}
        >
          <LuChevronRight />
        </Link>
      ) : (
        <span className={`${arrowClasses} pointer-events-none opacity-40`}>
          <LuChevronRight />
        </span>
      )}
    </nav>
  );
}