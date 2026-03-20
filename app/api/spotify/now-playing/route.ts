/**
 * API Route: /api/spotify/now-playing
 * Returns the currently playing or recently played Spotify track.
 * Called by the SpotifyPulse client component every 30 seconds.
 */

import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic"; // never cache this route

export async function GET() {
    const track = await getNowPlaying();

    if (!track) {
        return NextResponse.json({ isPlaying: false }, { status: 200 });
    }

    return NextResponse.json(track);
}
