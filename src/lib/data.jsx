import { headers } from "next/headers";
import { auth } from "./auth";

export const getDestinationsData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export const getDestinationById = async (id) => {
    const {token} = await auth.api.getToken({
    headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export const getBookingsByUserId = async (id) => {
    const {token} = await auth.api.getToken({
    headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();
    return data;
}

