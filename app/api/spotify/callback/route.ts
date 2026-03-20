/**
 * API Route: /api/spotify/callback
 * Handles the OAuth callback from Spotify authorization.
 * Exchanges the authorization code for access + refresh tokens.
 * Displays the refresh token for the user to copy into .env.local.
 */

import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
    const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
    const BASIC_AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${BASIC_AUTH}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const data = await res.json();

        if (data.error) {
            return NextResponse.json({ error: data.error, description: data.error_description }, { status: 400 });
        }

        /* Show the refresh token to the user with instructions */
        const html = `
        <!DOCTYPE html>
        <html>
        <head><title>Spotify Connected!</title>
        <style>
            body { background: #0a0a0a; color: #fff; font-family: monospace; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; }
            .token-box { background: #111; border: 1px solid #1DB954; border-radius: 12px; padding: 24px; max-width: 600px; word-break: break-all; margin: 20px 0; }
            .success { color: #1DB954; font-size: 24px; margin-bottom: 16px; }
            .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
            .value { color: #1DB954; font-size: 14px; line-height: 1.6; }
            .instructions { color: #666; font-size: 13px; margin-top: 16px; line-height: 1.8; max-width: 600px; }
            code { background: #222; padding: 2px 6px; border-radius: 4px; color: #1DB954; }
        </style>
        </head>
        <body>
            <div class="success">✓ Spotify Connected!</div>
            <div class="token-box">
                <div class="label">Your Refresh Token:</div>
                <div class="value">${data.refresh_token}</div>
            </div>
            <div class="instructions">
                Copy the refresh token above and paste it in your <code>.env.local</code> file:<br/>
                <code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code><br/><br/>
                Then restart your dev server. The Spotify widget will auto-connect! 🎵
            </div>
        </body>
        </html>`;

        return new NextResponse(html, {
            headers: { "Content-Type": "text/html" },
        });
    } catch (err) {
        return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
    }
}
