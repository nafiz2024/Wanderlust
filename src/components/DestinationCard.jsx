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
            className="group rounded-[26px] border border-[#d4edf9] bg-white p-3 shadow-[0_18px_36px_rgba(8,36,56,0.12)] transition duration-300 hover:-translate-y-1.5"
          >
            <div className="relative mb-3 aspect-[1.45/1] overflow-hidden rounded-[20px] bg-[#f0f0f0]">
              <Image
                src={destination.imageUrl}
                alt={destination.destinationName || "Destination image"}
                fill
                quality={100}
                unoptimized
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.07]"
              />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#03111ecc] via-[#03111e66] to-transparent" />

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-[#121212] shadow-[0_8px_20px_rgba(2,22,35,0.2)]">
                <span>4.5</span>
                <FiStar className="h-3.5 w-3.5 fill-current" />
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-[#6d8290]">
              <FiMapPin className="h-3.5 w-3.5" />
              <span>{destination.country || "Unknown"}</span>
            </div>

            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-[21px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#152a35] sm:text-[23px]">
                {destination.destinationName || "Untitled"}
              </h2>

              <div className="inline-flex shrink-0 items-end gap-1 rounded-full bg-[#ebf9ff] px-3.5 py-1.5 text-[#0f90bf]">
                <span className="text-[20px] leading-none font-bold sm:text-[21px]">
                  ${destination.price}
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
              Book Now
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        );
      })}
    </>
  );
};

export default DestinationCard;
