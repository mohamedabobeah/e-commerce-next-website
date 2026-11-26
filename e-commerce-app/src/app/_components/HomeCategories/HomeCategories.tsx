import Link from "next/link";
import { getAllCategories } from "@/api/services/categories.service";
import Reveal from "../Reveal/Reveal";

export default async function HomeCategories() {
  const allCategories = await getAllCategories();

  return (
    <section className="mx-auto my-12 w-[90%] max-w-7xl">
      <h2 className="border-s-8 border-[#16A34A] ps-2 text-4xl font-bold">
        Shop By <span className="text-[#16A34A]">Categories</span>
      </h2>

      <div className="my-6 flex flex-wrap">
        {(allCategories ?? []).map((category, index) => (
          <Reveal
            key={category._id}
            delay={(index % 6) * 70}
            className="w-full p-3 md:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <Link
              href={`/categories/${category._id}`}
              className="flex flex-col items-center gap-3 rounded-lg border bg-white p-4 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="size-20 rounded-full object-cover"
              />
              <h3 className="text-center">{category.name}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}