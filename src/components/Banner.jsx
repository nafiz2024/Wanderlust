"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const Banner = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("3 Days");
  const [budget, setBudget] = useState("$0-$3000");
  const [people, setPeople] = useState("5-10");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (duration) {
      params.set("duration", duration);
    }

    if (budget) {
      params.set("budget", budget);
    }

    if (people) {
      params.set("people", people);
    }

    const query = params.toString();
    router.push(query ? `/destination?${query}` : "/destination");
  };

  return (
    <section
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(3, 17, 32, 0.5), rgba(3, 17, 32, 0.58)), url('/assets/Banner.png')",
      }}
    >
      <div className="soft-grid absolute inset-0 opacity-30" />
      <div className="absolute inset-x-0 top-0 z-20">
        <Navbar />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 items-center justify-center px-4 pb-14 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="max-w-[1160px]">
          <h1 className="text-[38px] font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-[76px]">
            Discover Your
            <br />
            Next Adventure
          </h1>

          <p className="mx-auto mt-5 max-w-[1120px] text-sm font-normal text-white/90 sm:text-xl lg:text-2xl">
            Explore breathtaking destinations and create unforgettable
            memories with our curated travel experiences.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={() => router.push("/destination")}
              className="w-full rounded-full bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] px-6 py-3 text-base font-medium uppercase text-white shadow-[0_12px_30px_rgba(20,184,166,0.35)] transition hover:-translate-y-0.5 hover:brightness-110 sm:min-w-[148px] sm:w-auto sm:text-lg"
            >
              Explore Now
            </button>

            <button
              type="button"
              onClick={() => router.push("/destination")}
              className="w-full rounded-full border border-white/60 bg-white/22 px-6 py-3 text-base font-medium uppercase text-white backdrop-blur-md transition hover:bg-white/34 sm:min-w-[181px] sm:w-auto sm:text-lg"
            >
              View Destination
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-white/25 bg-[#021322]/40 backdrop-blur-md">
        <div className="grid min-h-[72px] w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.2fr_1.1fr_1fr_1fr_auto]">
          <div className="flex min-h-[72px] flex-col justify-center border-b border-white/20 px-4 py-3 text-left md:border-r md:border-white/20 xl:border-b-0">
            <label
              htmlFor="banner-location"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Location
            </label>
            <input
              id="banner-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Address, City or Zip"
              className="bg-transparent text-[14px] leading-5 text-white outline-none placeholder:text-white/75"
            />
          </div>

          <div className="flex min-h-[72px] flex-col justify-center border-b border-white/20 px-4 py-3 text-left md:border-r md:border-white/20 xl:border-b-0">
            <label
              htmlFor="banner-duration"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Date/Duration
            </label>
            <select
              id="banner-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-transparent text-[14px] leading-5 text-white outline-none"
            >
              <option className="text-black">1 Day</option>
              <option className="text-black">3 Days</option>
              <option className="text-black">5 Days</option>
              <option className="text-black">7 Days</option>
            </select>
          </div>

          <div className="flex min-h-[72px] flex-col justify-center border-b border-white/20 px-4 py-3 text-left md:border-r md:border-white/20 xl:border-b-0">
            <label
              htmlFor="banner-budget"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Budget
            </label>
            <select
              id="banner-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent text-[14px] leading-5 text-white outline-none"
            >
              <option className="text-black">$0-$3000</option>
              <option className="text-black">$3000-$5000</option>
              <option className="text-black">$5000-$8000</option>
              <option className="text-black">$8000+</option>
            </select>
          </div>

          <div className="flex min-h-[72px] flex-col justify-center border-b border-white/20 px-4 py-3 text-left md:border-r md:border-white/20 xl:border-b-0">
            <label
              htmlFor="banner-people"
              className="text-[14px] font-medium leading-5 text-white"
            >
              People
            </label>
            <select
              id="banner-people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="bg-transparent text-[14px] leading-5 text-white outline-none"
            >
              <option className="text-black">1-2</option>
              <option className="text-black">3-5</option>
              <option className="text-black">5-10</option>
              <option className="text-black">10+</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="flex min-h-[72px] items-center justify-center bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] px-6 text-[16px] font-medium text-white transition hover:brightness-110 md:col-span-2 xl:col-span-1"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
