import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in first." },
        { status: 401 },
      );
    }

    const payload = await request.json();
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await res.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { message: text || "Booking request failed." };
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          message:
            data?.message ||
            data?.error ||
            `Booking failed with status ${res.status}`,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data ?? { ok: true });
  } catch (error) {
    console.error("Booking proxy error:", error);
    return NextResponse.json(
      { message: "Something went wrong while creating booking." },
      { status: 500 },
    );
  }
}
