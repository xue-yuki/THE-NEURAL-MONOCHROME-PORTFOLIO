/**
 * API Route: /api/spotify/login
 * Redirects the user to Spotify's authorization page.
 * After authorizing, Spotify redirects back to /api/spotify/callback.
 */

import { NextResponse } from "next/server";
import { SPOTIFY_SCOPES } from "@/lib/spotify";

export async function GET() {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
    const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;

    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SPOTIFY_SCOPES,
        redirect_uri: REDIRECT_URI,
    });

    return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
