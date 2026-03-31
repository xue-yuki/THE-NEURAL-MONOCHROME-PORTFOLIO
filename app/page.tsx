import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";
const Manifesto = dynamic(() => import("@/components/sections/Manifesto").then(mod => mod.Manifesto));
const AboutIdentity = dynamic(() => import("@/components/sections/AboutIdentity").then(mod => mod.AboutIdentity));
const Achievements = dynamic(() => import("@/components/sections/Achievements").then(mod => mod.Achievements));
const ProjectGallery = dynamic(() => import("@/components/sections/ProjectGallery").then(mod => mod.ProjectGallery));
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(mod => mod.TechStack));
const GitHubStats = dynamic(() => import("@/components/sections/GitHubStats").then(mod => mod.GitHubStats));
// const SpotifyPulse = dynamic(() => import("@/components/sections/SpotifyPulse").then(mod => mod.SpotifyPulse));
const ContactCLI = dynamic(() => import("@/components/sections/ContactCLI").then(mod => mod.ContactCLI));
const JarvisWidget = dynamic(() => import("@/components/sections/JarvisWidget").then(mod => mod.JarvisWidget));

import { getGithubRepos, getGithubContributions } from "@/lib/github";
/* Premium enhancements — animated bg + scroll-driven transitions */
import { MeshGradient } from "@/components/ui/MeshGradientWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default async function Home() {
  const [repos, calendar] = await Promise.all([
    getGithubRepos("xue-yuki"),
    getGithubContributions("xue-yuki")
  ]);

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Animated gradient mesh — the living, breathing background */}
      <MeshGradient />

      {/* All content sits above the mesh via relative positioning */}
      <div className="relative z-10">
        <div className="noise-overlay" />
        <Header />
        <Hero />
        
        <Manifesto />

        {/* About section — fades up as it enters the viewport */}
        <ScrollReveal variant="fade-up">
          <AboutIdentity />
        </ScrollReveal>

        {/* Achievements — scales in for a dramatic entrance */}
        <ScrollReveal variant="fade-scale" delay={0.1}>
          <Achievements />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <ProjectGallery />
        </ScrollReveal>
        
        <ScrollReveal variant="fade-up" delay={0.1}>
          <TechStack />
        </ScrollReveal>
        {/* <AIPlayground /> -- Deprecated for Floating Widget */}

        {/* GitHub — clip-path reveal from bottom for a cinematic feel */}
        <ScrollReveal variant="clip-up">
          <GitHubStats repos={repos} calendar={calendar} />
        </ScrollReveal>

        {/* Spotify — Temporarily disabled for performance pass */}
        {/* <ScrollReveal variant="blur-in" delay={0.1}>
          <SpotifyPulse />
        </ScrollReveal> */}

        {/* Contact — fade-up, the classic clean entrance */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <ContactCLI />
        </ScrollReveal>

        {/* Floating Assistant (Fixed Position) */}
        <JarvisWidget />

        <div className="h-[20vh] text-center text-neutral-800 py-10 font-mono text-xs">
          © 2026 // NEURAL MONOCHROME SYSTEM
        </div>
      </div>
    </main>
  );
}
