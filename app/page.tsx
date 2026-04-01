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
import { getAchievements } from "@/app/admin/achievements/actions";
import { getProjects } from "@/app/admin/projects/actions";
import { getSiteTexts } from "@/app/admin/site-texts/actions";
import { Achievement, Project } from "@prisma/client";
/* Premium enhancements — animated bg + scroll-driven transitions */
import { MeshGradient } from "@/components/ui/MeshGradientWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fallbackProjects } from "@/components/sections/ProjectGallery";

export default async function Home() {
  let dbAchievements: Achievement[] = [];
  let dbProjects: any[] = [];
  let siteTexts: Record<string, string> = {};
  
  try {
    dbAchievements = await getAchievements() as Achievement[];
    const rawProjects = (await getProjects()) as Project[];
    dbProjects = rawProjects.map(p => ({
      id: p.id.slice(0, 4).toUpperCase(), // simple ID display
      title: p.title,
      category: p.category,
      desc: p.description,
      tags: p.techStack,
      image: p.imageUrl || "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&h=450&auto=format&fit=crop",
      link: p.demoUrl || null
    }));
    siteTexts = await getSiteTexts();
  } catch (e) {
    // Database connection string might not be set yet.
  }

  // Ensure fallback works seamlessly
  const finalProjects = dbProjects.length > 0 ? dbProjects : fallbackProjects;

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
        <Hero siteTexts={siteTexts} />
        
        <Manifesto />

        {/* About section — fades up as it enters the viewport */}
        <ScrollReveal variant="fade-up">
          <AboutIdentity />
        </ScrollReveal>

        {/* Achievements — scales in for a dramatic entrance */}
        <ScrollReveal variant="fade-scale" delay={0.1}>
          <Achievements items={dbAchievements} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <ProjectGallery items={finalProjects} />
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
