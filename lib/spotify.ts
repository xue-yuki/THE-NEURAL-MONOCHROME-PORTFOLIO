/**
 * lib/spotify.ts — Spotify API integration
 * Handles token refresh and fetching currently playing track.
 * Uses the Authorization Code Flow with refresh tokens.
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const BASIC_AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

/* Scopes needed for now-playing and recently-played */
export const SPOTIFY_SCOPES = [
    "user-read-currently-playing",
    "user-read-recently-played",
].join(" ");

/* Get a fresh access token using the stored refresh token */
async function getAccessToken(): Promise<string | null> {
    if (!REFRESH_TOKEN) return null;

    try {
        const res = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Basic ${BASIC_AUTH}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: REFRESH_TOKEN,
            }),
        });

        const data = await res.json();
        return data.access_token || null;
    } catch {
        return null;
    }
}

/* Track data shape returned to the frontend */
export interface SpotifyTrack {
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    isPlaying: boolean;
    currentTime: number; // ms
    totalTime: number;   // ms
    songUrl: string;
}

/* Fetch the currently playing track, or fall back to recently played */
export async function getNowPlaying(): Promise<SpotifyTrack | null> {
    const token = await getAccessToken();
    if (!token) return null;

    try {
        /* Try currently playing first */
        const res = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
        });

        /* 204 = nothing playing right now */
        if (res.status === 204) {
            return await getRecentlyPlayed(token);
        }

        if (!res.ok) return null;

        const data = await res.json();

        /* If no track item in the response, try recently played */
        if (!data.item) {
            return await getRecentlyPlayed(token);
        }

        return {
            title: data.item.name,
            artist: data.item.artists.map((a: any) => a.name).join(", "),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url || "",
            isPlaying: data.is_playing,
            currentTime: data.progress_ms || 0,
            totalTime: data.item.duration_ms || 0,
            songUrl: data.item.external_urls?.spotify || "",
        };
    } catch {
        return null;
    }
}

/* Fallback: get the most recently played track */
async function getRecentlyPlayed(token: string): Promise<SpotifyTrack | null> {
    try {
        const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return null;

        const data = await res.json();
        const track = data.items?.[0]?.track;
        if (!track) return null;

        return {
            title: track.name,
            artist: track.artists.map((a: any) => a.name).join(", "),
            album: track.album.name,
            albumArt: track.album.images[0]?.url || "",
            isPlaying: false, // recently played = not currently playing
            currentTime: 0,
            totalTime: track.duration_ms || 0,
            songUrl: track.external_urls?.spotify || "",
        };
    } catch {
        return null;
    }
}
