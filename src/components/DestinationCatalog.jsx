"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import DestinationCard from "@/components/DestinationCard";

const withinPriceRange = (price, range) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return range === "all";
  }

  switch (range) {
    case "under-1000":
      return numericPrice < 1000;
    case "1000-3000":
      return numericPrice >= 1000 && numericPrice <= 3000;
    case "3000-5000":
      return numericPrice > 3000 && numericPrice <= 5000;
    case "over-5000":
      return numericPrice > 5000;
    default:
      return true;
  }
};

const sortDestinations = (items, sortBy) => {
  const sortedItems = [...items];

  switch (sortBy) {
    case "price-low-high":
      return sortedItems.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-high-low":
      return sortedItems.sort((a, b) => Number(b.price) - Number(a.price));
    case "name-a-z":
      return sortedItems.sort((a, b) =>
        (a.destinationName || "").localeCompare(b.destinationName || ""),
      );
    default:
      return sortedItems;
  }
};

const filterClassName =
  "flex h-[48px] w-full appearance-none items-center justify-between rounded-full border border-[#cbe9f8] bg-white px-4 text-left text-[12px] font-medium tracking-[0.01em] text-[#547381] outline-none";

const DestinationCatalog = ({ destinations }) => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      destinations
        .map((destination) => destination?.category)
        .filter(Boolean),
    );

    return ["all", ...uniqueCategories];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    const matched = destinations.filter((destination) => {
      const categoryMatches =
        category === "all" || destination?.category === category;
      const priceMatches = withinPriceRange(destination?.price, priceRange);

      return categoryMatches && priceMatches;
    });

    return sortDestinations(matched, sortBy);
  }, [category, destinations, priceRange, sortBy]);

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${filterClassName} pr-10`}
          >
            <option value="all">CATEGORY</option>
            {categories
              .filter((item) => item !== "all")
              .map((item) => (
                <option key={item} value={item}>
                  {String(item).toUpperCase()}
                </option>
              ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
        </div>

        <div className="relative">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={`${filterClassName} pr-10`}
          >
            <option value="all">PRICE RANGE</option>
            <option value="under-1000">UNDER $1000</option>
            <option value="1000-3000">$1000 - $3000</option>
            <option value="3000-5000">$3000 - $5000</option>
            <option value="over-5000">OVER $5000</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`${filterClassName} pr-10`}
          >
            <option value="default">SORT BY</option>
            <option value="price-low-high">PRICE: LOW TO HIGH</option>
            <option value="price-high-low">PRICE: HIGH TO LOW</option>
            <option value="name-a-z">NAME: A TO Z</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9a9a9a]" />
        </div>
      </div>

      <p className="mt-3 text-[13px] text-[#7b7b7b]">
        Showing {filteredDestinations.length} destinations
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <DestinationCard destinations={filteredDestinations} />
      </div>
    </>
  );
};

export default DestinationCatalog;
