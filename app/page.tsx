import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutIdentity } from "@/components/sections/AboutIdentity";
import { Achievements } from "@/components/sections/Achievements";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { TechStack } from "@/components/sections/TechStack";
import { AIPlayground } from "@/components/sections/AIPlayground";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { SpotifyPulse } from "@/components/sections/SpotifyPulse";
import { ContactCLI } from "@/components/sections/ContactCLI";
import { getGithubRepos, getGithubContributions } from "@/lib/github";
import { JarvisWidget } from "@/components/sections/JarvisWidget";
/* Premium enhancements — animated bg + scroll-driven transitions */
import { MeshGradient } from "@/components/ui/MeshGradient";
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

        {/* Spotify — blur-in for a dreamy, premium entrance */}
        <ScrollReveal variant="blur-in" delay={0.1}>
          <SpotifyPulse />
        </ScrollReveal>

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
