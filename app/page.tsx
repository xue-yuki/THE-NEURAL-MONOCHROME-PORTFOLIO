import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { AboutIdentity } from "@/components/sections/AboutIdentity";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { AIPlayground } from "@/components/sections/AIPlayground";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { SpotifyPulse } from "@/components/sections/SpotifyPulse";
import { ContactCLI } from "@/components/sections/ContactCLI";
import { getGithubRepos, getGithubContributions } from "@/lib/github";

export default async function Home() {
  const [repos, calendar] = await Promise.all([
    getGithubRepos("xue-yuki"),
    getGithubContributions("xue-yuki")
  ]);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="noise-overlay" />
      <Header />
      <Hero />
      <AboutIdentity />
      {/* <ProjectGallery /> */}
      <AIPlayground />
      <GitHubStats repos={repos} calendar={calendar} />
      <SpotifyPulse />
      <ContactCLI />
      <div className="h-[20vh] text-center text-neutral-800 py-10 font-mono text-xs">
        © 2026 // NEURAL MONOCHROME SYSTEM
      </div>
    </main>
  );
}
