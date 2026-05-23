import Image from "next/image";
import Link from "next/link";
import {
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

  return `${days} Days/${Math.max(days - 1, 0)} Nights`;
};

const DestinationCard = ({ destinations }) => {
  return (
    <>
      {destinations.map((destination, index) => {
        return (
          <article
            key={destination._id || `${destination.destinationName}-${index}`}
            className="group rounded-3xl border border-[#d7effb] bg-white p-3 shadow-[0_14px_28px_rgba(10,40,60,0.08)] transition hover:-translate-y-1"
          >
            <div className="relative mb-3 aspect-[1.45/1] overflow-hidden rounded-2xl bg-[#f0f0f0]">
              <Image
                src={destination.imageUrl}
                alt={destination.destinationName || "Destination image"}
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />

              <div className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2 py-1 text-[11px] font-medium text-[#1f1f1f]">
                <span>4.5</span>
                <FiStar className="h-3.5 w-3.5 fill-current" />
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#8e8e8e]">
              <FiMapPin className="h-3.5 w-3.5" />
              <span>{destination.country || "Unknown"}</span>
            </div>

            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <h2 className="text-[20px] leading-[1.2] font-normal text-[#202020] sm:text-[22px]">
                {destination.destinationName || "Untitled"}
              </h2>

              <div className="shrink-0 pt-0 sm:pt-1">
                <span className="text-[20px] leading-none font-normal text-[#202020] sm:text-[22px]">
                  ${destination.price}
                </span>
                <span className="text-[11px] text-[#9a9a9a]">/Person</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#8e8e8e]">
              <FiCalendar className="h-3.5 w-3.5" />
              <span>{getDurationText(destination.duration)}</span>
            </div>

            <Link
              href={`/destination/${destination._id}`}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.01em] text-[#15A1BF]"
            >
              BOOK NOW
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        );
      })}
    </>
  );
};

export default DestinationCard;
