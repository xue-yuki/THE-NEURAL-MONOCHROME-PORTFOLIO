import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RecruiterProvider } from "../components/providers/RecruiterProvider";
import SmoothScroll from "../components/layout/SmoothScroll";
import { Cursor } from "../components/ui/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neural Monochrome Portfolio",
  description: "A cinematic, high-performance, and minimalist portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  history.scrollRestoration = 'manual';
                  
                  // Immediate reset
                  window.scrollTo(0, 0);
                  
                  // Persistent reset for first 500ms
                  var resetCount = 0;
                  var resetInterval = setInterval(function() {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    resetCount++;
                    if (resetCount > 10) clearInterval(resetInterval);
                  }, 50);
                  
                  // Final reset on load
                  window.addEventListener('load', function() {
                    window.scrollTo(0, 0);
                    clearInterval(resetInterval);
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white`}
      >
        <RecruiterProvider>
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
        </RecruiterProvider>
      </body>
    </html>
  );
}
