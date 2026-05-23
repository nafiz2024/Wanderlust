"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

const getDurationText = (duration) => {
  const days = Number(duration);

  if (Number.isNaN(days) || days <= 0) {
    return "Flexible stay";
  }

  return `${days} Days/ ${Math.max(days - 1, 0)} Nights`;
};

const getTrackTransform = (index, isDesktop) =>
  isDesktop
    ? `translateX(calc(-${index} * ((100% - 16px) / 2 + 16px)))`
    : `translateX(calc(-${index} * (100% + 16px)))`;

const FeaturedDestinationsSlider = ({ destinations }) => {
  const items = useMemo(() => destinations || [], [destinations]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const canSlide = items.length > 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const handlePrevious = () => {
    if (!canSlide) {
      return;
    }

    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const handleNext = () => {
    if (!canSlide) {
      return;
    }

    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className="overflow-hidden px-4 pb-18 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="section-shell soft-grid flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <h2 className="text-[34px] leading-none font-semibold tracking-[-0.045em] text-[#0f2531] sm:text-[48px]">
              Featured Destinations
            </h2>
            <p className="mt-3 text-[13px] text-[#5f7480] sm:text-[14px]">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destination"
            className="inline-flex h-11 items-center justify-center gap-3 self-start rounded-full border border-[#8fdbf6] bg-white px-5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#0a97c5] transition hover:-translate-y-0.5 hover:bg-[#f2fbfe] sm:self-auto"
          >
            <span>All Destinations</span>
            <FiArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: getTrackTransform(activeIndex, isDesktop),
            }}
          >
            {items.map((destination, index) => (
              <article
                key={destination._id || `${destination.destinationName}-${index}`}
                className="basis-full shrink-0 md:basis-[calc((100%-16px)/2)]"
              >
                <div className="group rounded-[26px] border border-[#d4edf9] bg-white p-3 shadow-[0_18px_36px_rgba(8,36,56,0.12)] transition duration-300 hover:-translate-y-1.5">
                  <div className="relative aspect-[1.26/1] overflow-hidden rounded-[20px] bg-[#edf3f6]">
                    <Image
                      src={destination.imageUrl}
                      alt={destination.destinationName || "Destination image"}
                      fill
                      unoptimized
                      quality={100}
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.07]"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#03111ecc] via-[#03111e66] to-transparent" />

                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-[#121212] shadow-[0_8px_20px_rgba(2,22,35,0.2)]">
                      <span>4.5</span>
                      <FiStar className="h-3.5 w-3.5 fill-current" />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-white backdrop-blur-md">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-[#6d8290]">
                      <FiMapPin className="h-3.5 w-3.5" />
                      <span>{destination.country || "Unknown"}</span>
                    </div>

                    <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <h3 className="text-[21px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#152a35] sm:text-[23px]">
                        {destination.destinationName || "Untitled"}
                      </h3>

                      <div className="inline-flex shrink-0 items-end gap-1 rounded-full bg-[#ebf9ff] px-3.5 py-1.5 text-[#0f90bf]">
                        <span className="text-[20px] leading-none font-bold sm:text-[21px]">
                          ${destination.price || "0"}
                        </span>
                        <span className="text-[11px] font-medium text-[#5d7f8e]">/Person</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#6f8793]">
                      <FiCalendar className="h-3.5 w-3.5" />
                      <span>{getDurationText(destination.duration)}</span>
                    </div>

                    <Link
                      href={`/destination/${destination._id}`}
                      className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] px-4 text-[12px] font-semibold uppercase tracking-[0.05em] text-white shadow-[0_12px_24px_rgba(20,184,166,0.35)] transition hover:brightness-110"
                    >
                      <span>Book Now</span>
                      <FiArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <span className="shrink-0 text-[30px] leading-none font-light tracking-[-0.04em] text-[#1f1f1f]">
              {activeIndex + 1}/{items.length}
            </span>
            <div className="h-px flex-1 bg-[#ececec]" />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d8d8] text-[#9c9c9c] transition-colors hover:border-[#1ca7ca] hover:text-[#1ca7ca]"
              aria-label="Previous destination"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d8d8] text-[#9c9c9c] transition-colors hover:border-[#1ca7ca] hover:text-[#1ca7ca]"
              aria-label="Next destination"
            >
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinationsSlider;
