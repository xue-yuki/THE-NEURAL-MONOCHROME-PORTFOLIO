"use client";

import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Star, GitFork, ExternalLink, Activity } from "lucide-react";
import type { GithubRepo, GithubCalendar } from "@/lib/github";

interface GitHubStatsProps {
    repos: GithubRepo[];
    calendar: GithubCalendar;
}

/* Color map for contribution intensity — green-tinted for GitHub-native feel */
const levelColors = [
    "bg-white/[0.04]",   // level 0 — near-invisible
    "bg-emerald-500/30", // level 1
    "bg-emerald-500/50", // level 2
    "bg-emerald-400/70", // level 3
    "bg-emerald-400",    // level 4 — full intensity
];

/* Maps common languages to accent dot colors */
const langColor: Record<string, string> = {
    TypeScript: "bg-blue-400",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-400",
    Rust: "bg-orange-400",
    HTML: "bg-red-400",
    CSS: "bg-purple-400",
    Code: "bg-neutral-400",
};

export function GitHubStats({ repos = [], calendar }: GitHubStatsProps) {
    const { isRecruiterMode } = useRecruiterMode();

    const topRepos = repos.slice(0, 6);

    // Build contribution weeks grid (last 52 weeks)
    const recentDays = calendar?.contributions?.slice(-364) || [];
    const weeks: typeof recentDays[] = [];
    for (let i = 0; i < recentDays.length; i += 7) {
        weeks.push(recentDays.slice(i, i + 7));
    }

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Section header with activity indicator */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter mb-2 text-gradient">
                            GitHub
                        </h3>
                        <p className="font-mono text-sm text-neutral-500">
                            Open-source contributions & projects
                        </p>
                    </div>
                    {/* Live total contributions badge */}
                    <div className="glass glow-border rounded-full px-4 py-2 flex items-center gap-2">
                        <Activity size={14} className="text-emerald-400" />
                        <span className="font-mono text-xs text-neutral-300">
                            {calendar?.total || 0} <span className="text-neutral-600">commits</span>
                        </span>
                    </div>
                </div>

                {/* Contribution graph — glass card with green-tinted tiles */}
                <div className="glass glow-border rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-xs text-neutral-500">Contribution activity</span>
                        {/* Legend showing intensity levels */}
                        <div className="flex items-center gap-1 text-[10px] text-neutral-600 font-mono">
                            Less
                            {levelColors.map((c, i) => (
                                <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                            ))}
                            More
                        </div>
                    </div>

                    {/* Scrollable contribution grid */}
                    <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
                        {weeks.length > 0 ? weeks.map((week, wi) => (
                            <div key={wi} className="grid grid-rows-7 gap-[3px]">
                                {week.map((day, di) => (
                                    <div
                                        key={di}
                                        className={`w-[11px] h-[11px] rounded-[2px] ${levelColors[day.level]} transition-all duration-200 hover:scale-150 hover:ring-1 hover:ring-emerald-400/50`}
                                        title={`${day.date}: ${day.count} contributions`}
                                    />
                                ))}
                            </div>
                        )) : (
                            <div className="text-neutral-500 text-xs text-center w-full py-10 font-mono">
                                Unable to load contribution data.
                            </div>
                        )}
                    </div>
                </div>

                {/* Repository cards grid — glassmorphic with hover glow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topRepos.map((repo) => (
                        <a
                            key={repo.name}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass glow-border rounded-xl p-5 group cursor-pointer block transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Repo name + external link icon */}
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors truncate max-w-[70%]">
                                    {repo.name}
                                </span>
                                <ExternalLink size={14} className="text-neutral-600 group-hover:text-white transition-colors shrink-0 mt-0.5" />
                            </div>

                            {/* Description */}
                            <p className="text-xs text-neutral-500 mb-4 line-clamp-2 min-h-[2rem] leading-relaxed">
                                {repo.description || "No description available."}
                            </p>

                            {/* Footer: language badge + stats */}
                            <div className="flex items-center justify-between">
                                {/* Language pill with colored dot */}
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${langColor[repo.language] || "bg-neutral-500"}`} />
                                    <span className="font-mono text-[11px] text-neutral-400">{repo.language}</span>
                                </div>
                                {/* Stars and forks */}
                                <div className="flex gap-3 text-[11px] text-neutral-500 font-mono">
                                    <span className="flex items-center gap-1">
                                        <Star size={11} /> {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork size={11} /> {repo.forks_count}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
