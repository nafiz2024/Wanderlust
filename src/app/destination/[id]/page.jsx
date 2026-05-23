import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { getDestinationById } from "@/lib/data";
import { EditDestinationModal } from "@/components/EditDestinationModal";
import { DeleteDestinationCard } from "@/components/DeleteDestinationCard";
import { BookingCard } from "@/components/BookingCard";

const getDurationText = (duration) => {
  const numericDuration = Number(duration);

  if (!Number.isNaN(numericDuration) && numericDuration > 0) {
    return `${numericDuration} Days / ${Math.max(numericDuration - 1, 0)} Nights`;
  }

  return duration || "Flexible stay";
};



const DestinationsDetailsPage = async ({ params }) => {
  const { id } = await params;

  const destination = await getDestinationById(id);

  return (
    <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1160px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 text-[13px] text-[#7f7f7f] transition-colors hover:text-[#1f1f1f]"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Destinations</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <EditDestinationModal destination={destination} />
            <DeleteDestinationCard destination={destination} />
          </div>
        </div>

        <div className="relative mt-7 aspect-[1.5/1] overflow-hidden rounded-3xl border border-[#d4ecf8] bg-[#eef2f5] shadow-[0_20px_42px_rgba(8,40,64,0.14)] sm:aspect-[1.8/1] lg:aspect-[2.1/1]">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName || "Destination image"}
            fill
            priority
            quality={100}
            unoptimized
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1160px"
            className="object-cover"
          />
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-10">
          <div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#8e8e8e]">
              <FiMapPin className="h-3.5 w-3.5" />
              <span>{destination.country || "Unknown"}</span>
            </div>

            <h1 className="mt-3 text-[34px] leading-[1.04] font-extralight tracking-[-0.045em] text-[#1f1f1f] sm:text-[44px] lg:text-[56px]">
              {destination.destinationName || "Untitled Destination"}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#6d6d6d]">
              <div className="flex items-center gap-1.5">
                <FiStar className="h-3.5 w-3.5 fill-[#16a34a] text-[#16a34a]" />
                <span className="font-semibold text-[#1f1f1f]">4.9</span>
                <span>(234 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar className="h-3.5 w-3.5 text-[#1f1f1f]" />
                <span className="font-medium text-[#1f1f1f]">
                  {getDurationText(destination.duration)}
                </span>
              </div>
            </div>

            <div className="mt-11">
              <h2 className="text-[22px] font-medium tracking-[-0.03em] text-[#1f1f1f]">
                Overview
              </h2>
              <p className="mt-4 max-w-[720px] break-words text-[13px] leading-7 text-[#777777] sm:text-[14px]">
                {destination.description ||
                  "No description available for this destination yet."}
              </p>
            </div>
          </div>

          <BookingCard destination={destination} />
        </div>

      </div>
    </section>
  );
};

export default DestinationsDetailsPage;
