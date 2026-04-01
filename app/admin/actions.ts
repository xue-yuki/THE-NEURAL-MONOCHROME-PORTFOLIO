"use server";

import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";

export async function loginAdminAction(formData: FormData) {
    const password = formData.get("password") as string;
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
        return { error: "Server error: Admin password not configured limit env." };
    }

    if (password !== correctPassword) {
        return { error: "Incorrect password." };
    }

    // Create session token
    const token = await createToken();

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set({
        name: "admin-session",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
}

export async function logoutAdminAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin-session");
}
