"use client";

import { authClient } from "@/lib/auth-client";
import { useRef, useState } from "react";
import { FiCalendar, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";

const getToday = () => new Date().toISOString().split("T")[0];

export function BookingCard({ destination }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const departureDateRef = useRef(null);
  const [departureDate, setDepartureDate] = useState(null);
  const selectedDepartureDate = departureDate ? new Date(departureDate) : null;

  const handleOpenDatePicker = () => {
    if (!departureDateRef.current) {
      return;
    }

    departureDateRef.current.click();
    departureDateRef.current.focus();
    departureDateRef.current.showPicker?.();
  };
  
  const { price, _id, destinationName, imageUrl, country } = destination;

  const handleBooking = async () => {
    if (!user?.id) {
      toast.error("Please sign in before booking.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!departureDate) {
      toast.error("Please select a departure date.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const bookingData = {
      userId: user?.id,
      userImage: user?.image || "",
      userName: user?.name || "",
      destinationId: _id,
      destinationName,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };

    const {data:tokenData} = await authClient.token()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error(`Booking failed: ${res.status}`);
      }

      toast.success("Booking Complete", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Booking failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });

      console.error(error);
    }
  };

  return (
    <aside className="h-fit rounded-3xl border border-[#ccecf9] bg-white px-5 py-6 shadow-[0_18px_34px_rgba(8,40,64,0.12)] lg:sticky lg:top-6">
      <p className="text-[11px] text-[#9a9a9a]">Starting from</p>
      <p className="mt-2 text-[38px] leading-none font-bold text-[#0aa2d2]">
        ${price || "0"}
      </p>
      <p className="mt-1 text-[12px] text-[#8d8d8d]">per person</p>

      <div
        className="relative mt-6 rounded-2xl border border-[#d7edf8] bg-[#f8fcff]"
        onClick={handleOpenDatePicker}
      >
        <input
          id="bookingDepartureDate"
          ref={departureDateRef}
          name="bookingDepartureDate"
          type="date"
          min={getToday()}
          value={departureDate ?? ""}
          onChange={(e) => setDepartureDate(e.target.value || null)}
          className="h-11 w-full bg-transparent px-4 pr-11 text-[13px] text-[#1f2937] outline-none [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0"
        />
        <button
          type="button"
          aria-label="Open calendar"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDatePicker();
          }}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#b2bcc8] transition-colors hover:text-[#24a3bd]"
        >
          <FiCalendar className="h-4 w-4" />
        </button>
      </div>

      {selectedDepartureDate ? (
        <p className="mt-2 text-[12px] text-[#7a7a7a]">
          Selected: {selectedDepartureDate.toLocaleDateString("en-US")}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleBooking}
        className="mt-[14px] inline-flex h-[50px] w-full items-center justify-center rounded-full bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(20,184,166,0.35)] transition hover:brightness-110"
      >
        Book Now
      </button>

      <div className="mt-6 space-y-3 text-[12px] text-[#7a7a7a]">
        <div className="flex items-start gap-2">
          <FiCheck className="mt-0.5 h-3.5 w-3.5 text-[#2fb36d]" />
          <span>Free cancellation up to 7 days</span>
        </div>
        <div className="flex items-start gap-2">
          <FiCheck className="mt-0.5 h-3.5 w-3.5 text-[#2fb36d]" />
          <span>Travel insurance included</span>
        </div>
        <div className="flex items-start gap-2">
          <FiCheck className="mt-0.5 h-3.5 w-3.5 text-[#2fb36d]" />
          <span>24/7 customer support</span>
        </div>
      </div>
    </aside>
  );
}
