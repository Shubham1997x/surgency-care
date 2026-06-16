"use client";

import { useState, useMemo, useEffect } from "react";
import { Blog } from "@prisma/client";
import { BlogCard } from "./Cards";

interface BlogListProps {
  initialBlogs: Blog[];
}

export function BlogList({ initialBlogs }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  // Reset pagination when search or category changes
  useEffect(() => {
    setVisibleCount(3);
  }, [searchQuery, selectedCategory]);

  // Gather unique categories dynamically
  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    initialBlogs.forEach((blog) => {
      if (blog.category) {
        cats.add(blog.category.trim());
      }
    });
    return Array.from(cats).sort();
  }, [initialBlogs]);

  // Filter blogs based on search query and category
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      // 1. Search Query Filter (title or excerpt)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = blog.title.toLowerCase().includes(query);
        const matchesExcerpt = blog.excerpt.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "") {
        if (blog.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });
  }, [initialBlogs, searchQuery, selectedCategory]);

  return (
    <div>
      {/* Search & Category Filter Bar */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row items-stretch md:items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 placeholder:text-slate-400"
          />
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition shadow-sm ${
              selectedCategory === ""
                ? "bg-brand-blue text-white"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Categories
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition shadow-sm ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredBlogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500 font-medium">No articles match your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
            }}
            className="mt-4 text-sm font-semibold text-brand-blue hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.slice(0, visibleCount).map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>

          {/* Load More Pagination */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <p className="text-xs text-slate-400 font-semibold text-center">
              Showing {Math.min(visibleCount, filteredBlogs.length)} of {filteredBlogs.length} articles
            </p>
            {visibleCount < filteredBlogs.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="border border-brand-blue text-brand-blue bg-white hover:bg-slate-50 transition px-8 py-3 rounded-full font-semibold text-sm shadow-sm"
              >
                Load More Articles
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
