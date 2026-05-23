"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person1.png",
  },
  {
    id: 2,
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person2.png",
  },
  {
    id: 3,
    quote:
      '"Our Wanderlust Journey Felt Seamless From Start To Finish. Every Transfer, Stay, And Excursion Was Carefully Curated For A Truly Memorable Experience."',
    name: "Amina Noor",
    location: "Dubai, UAE",
    image: "/assets/person1.png",
  },
];

const ClientReview = () => {
  const items = useMemo(() => reviews, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? items.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === items.length - 1 ? 0 : current + 1,
    );
  };

  const visibleReviews = [
    items[activeIndex],
    items[(activeIndex + 1) % items.length],
  ];

  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[34px] leading-none font-semibold tracking-[-0.045em] text-[#112733] sm:text-[50px]">
              What Travelers Say
            </h2>
            <p className="mt-3 text-[13px] text-[#7d7d7d] sm:text-[14px]">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d8d8] text-[#9c9c9c] transition-colors hover:border-[#1ca7ca] hover:text-[#1ca7ca]"
              aria-label="Previous review"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d8d8] text-[#9c9c9c] transition-colors hover:border-[#1ca7ca] hover:text-[#1ca7ca]"
              aria-label="Next review"
            >
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="grid overflow-hidden rounded-3xl border border-[#d7effb] bg-white shadow-[0_16px_40px_rgba(10,40,60,0.08)] md:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="flex flex-col justify-between px-4 py-5 sm:px-5 sm:py-6">
                <p className="max-w-[360px] text-[14px] leading-7 text-[#202020] sm:text-[15px]">
                  {review.quote}
                </p>

                <div className="mt-8">
                  <p className="text-[14px] text-[#1ca7ca]">{review.name}</p>
                  <p className="mt-1 text-[11px] text-[#8a8a8a]">
                    {review.location}
                  </p>
                </div>
              </div>

              <div className="relative min-h-[220px] bg-[#eef3f5] md:min-h-full">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReview;
