"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/assets/Wanderlast.png";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

const getAvatarSource = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return `/api/avatar?url=${encodeURIComponent(imageUrl)}`;
  }

  return imageUrl;
};

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";
  const userImage = user?.image?.trim();
  const avatarSource = getAvatarSource(userImage);
  const [failedImageUrl, setFailedImageUrl] = useState("");
  const navLinkClassName =
    "inline-flex h-10 items-center justify-center rounded-full border border-transparent px-4 text-sm font-medium text-[#11313d] transition-all hover:border-[#cceefe] hover:bg-[#ecfaff] hover:text-[#0b93cb] focus:border-[#cceefe] focus:bg-[#ecfaff] focus:text-[#0b93cb]";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  };

  const avatar = avatarSource && avatarSource !== failedImageUrl ? (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarSource}
        alt={user.name || "User avatar"}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
        onError={() => setFailedImageUrl(avatarSource)}
        referrerPolicy="no-referrer"
      />
    </>
  ) : (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15A1BF] text-sm font-semibold text-white">
      {userInitial}
    </div>
  );

  const navLinks = (
    <>
      <li>
        <Link href="/" className={navLinkClassName}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/destination" className={navLinkClassName}>
          Destinations
        </Link>
      </li>
      <li>
        <Link href="/my-bookings" className={navLinkClassName}>
          My Bookings
        </Link>
      </li>
      <li>
        <Link href="/add-destination" className={navLinkClassName}>
          Admin
        </Link>
      </li>
    </>
  );

  const accountLinks = (
    <>
      {user ? (
        <>
          <li>
            <div className="flex items-center gap-3 rounded-full border border-[#d9eef3] bg-linear-to-r from-[#f6fcfe] to-white px-2 py-2 shadow-[0_10px_24px_rgba(21,161,191,0.08)]">
              {avatar}
              <div className="min-w-0 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6f8b92]">
                  Signed in
                </p>
                <p className="max-w-[132px] truncate text-sm font-semibold text-[#12313a]">
                  {user.name}
                </p>
              </div>
              <Link
                href="/profile"
                className="inline-flex h-10 items-center justify-center rounded-full border border-transparent px-4 text-sm font-medium text-[#12313a] transition-colors hover:border-[#d9eef3] hover:bg-white hover:text-[#15A1BF] focus:text-[#15A1BF]"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#12313a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#15A1BF]"
              >
                Logout
              </button>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/signin"
              className="font-medium hover:text-[#15A1BF] focus:text-[#15A1BF]"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="font-medium hover:text-[#15A1BF] focus:text-[#15A1BF]"
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  const mobileNavLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/destination">Destinations</Link>
      </li>
      <li>
        <Link href="/my-bookings">My Bookings</Link>
      </li>
      <li>
        <Link href="/add-destination">Admin</Link>
      </li>
      {user ? (
        <>
          <li className="mt-3">
            <div className="rounded-3xl border border-[#d9eef3] bg-[#f6fcfe] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6f8b92]">
                Signed in
              </p>
              <div className="mt-2 flex items-center gap-3">
                {avatar}
                <p className="truncate text-sm font-semibold text-[#12313a]">
                  {user.name}
                </p>
              </div>
            </div>
          </li>
          <li>
            <Link className="flex items-center gap-2" href="/profile">
              <FiUser className="h-4 w-4" />
              Profile
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 text-left"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/signin">Login</Link>
          </li>
          <li>
            <Link href="/signup">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="p-3 sm:p-4">
      <div className="max-lg:collapse w-full overflow-visible rounded-2xl border border-[#dbeafe] bg-white/90 text-[#0C0B0B] shadow-[0_16px_34px_rgba(2,32,58,0.12)] backdrop-blur-sm">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
        <label
          htmlFor="navbar-1-toggle"
          className="fixed inset-0 hidden max-lg:peer-checked:block"
        ></label>
        <div className="collapse-title navbar min-h-[70px] gap-3 px-3 sm:px-4">
          <div className="navbar-start hidden min-w-0 flex-1 lg:flex">
            <ul className="menu menu-horizontal flex gap-4 xl:gap-5">
              {navLinks}
            </ul>
          </div>
          <div className="navbar-start lg:hidden">
            <label
              htmlFor="navbar-1-toggle"
              className="btn btn-ghost h-10 min-h-10 w-10 rounded-full border border-[#d9effa] bg-white p-0 text-[#0e7399] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="navbar-center mx-auto shrink-0 lg:mx-4">
            <Link href="/" className="inline-flex items-center justify-center">
              <Image
                src={logo}
                alt="Wanderlast Logo"
                width={162}
                height={24}
                className="h-auto w-[128px] sm:w-[152px] lg:w-[162px]"
              />
            </Link>
          </div>
          <div className="navbar-end hidden min-w-0 flex-1 lg:flex">
            <ul className="menu menu-horizontal ml-auto flex gap-4 xl:gap-5">
              {accountLinks}
            </ul>
          </div>
          <div className="navbar-end w-10 lg:hidden"></div>
        </div>

        <div className="collapse-content z-1 border-t border-[#f1f1f1] px-4 pb-4 pt-2 lg:hidden">
          <ul className="menu flex gap-1 text-[14px] [&_a]:rounded-2xl [&_a]:px-3 [&_a]:py-2 [&_a:hover]:bg-[#f6fcfe] [&_button]:rounded-2xl [&_button]:px-3 [&_button]:py-2 [&_button:hover]:bg-[#f6fcfe]">
            {mobileNavLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
