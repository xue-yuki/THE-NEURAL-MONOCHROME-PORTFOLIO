import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("admin-session")?.value;

    const isAuthRoute = req.nextUrl.pathname.startsWith("/admin/login");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !isAuthRoute) {
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        try {
            // Verify token payload
            await verifyAuth(token);
            // If valid, allow request to continue
            return NextResponse.next();
        } catch (err) {
            // Invalid token, redirect to login
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }

    if (isAuthRoute && token) {
        try {
            await verifyAuth(token);
            // Already logged in, redirect away from login page
            return NextResponse.redirect(new URL("/admin", req.url));
        } catch (err) {
            // Token is invalid, let them see the login page
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware on admin routes
    matcher: ["/admin/:path*"],
};
