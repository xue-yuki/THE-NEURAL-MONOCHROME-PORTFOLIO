"use client";

import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Star, GitFork, Circle } from "lucide-react";
import type { GithubRepo, GithubCalendar } from "@/lib/github";

interface GitHubStatsProps {
    repos: GithubRepo[];
    calendar: GithubCalendar;
}

export function GitHubStats({ repos = [], calendar }: GitHubStatsProps) {
    const { isRecruiterMode } = useRecruiterMode();

    // Sort by stars for display if not already sorted
    const topRepos = repos.slice(0, 4);

    // Process calendar for grid (last 52 weeks = ~364 days)
    const recentDays = calendar?.contributions?.slice(-364) || [];
    const weeks = [];
    for (let i = 0; i < recentDays.length; i += 7) {
        weeks.push(recentDays.slice(i, i + 7));
    }

    return (
        <section className="py-20 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <h3 className="font-mono text-xl mb-10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    GITHUB_ENGINE
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contribution Graph */}
                    <div className="border border-neutral-800 p-6 bg-neutral-950/50">
                        <div className="flex justify-between items-end mb-6">
                            <div className="text-sm text-neutral-500 font-mono">{calendar?.total || 0} contributions in the last year</div>
                            <div className="text-xs text-neutral-600 font-mono">LESS [ ] [ ] [ ] [ ] [ ] MORE</div>
                        </div>

                        {/* Grid */}
                        <div className="flex gap-1 overflow-x-auto pb-2">
                            {weeks.length > 0 ? weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                                    {week.map((day, dayIndex) => {
                                        const level = day.level;
                                        const opacity = level === 0 ? 0.1 : level * 0.25;

                                        return (
                                            <div
                                                key={dayIndex}
                                                className="w-3 h-3 bg-white"
                                                style={{ opacity: isRecruiterMode && level === 0 ? 0 : opacity }}
                                                title={`${day.date}: ${day.count} contributions`}
                                            />
                                        )
                                    })}
                                </div>
                            )) : (
                                <div className="text-neutral-500 text-xs text-center w-full py-10">
                                    Failed to load contributions graph.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Repo Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {topRepos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-neutral-800 p-4 hover:bg-neutral-900 transition-colors group cursor-pointer block"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-sm group-hover:underline truncate">{repo.name}</span>
                                    <span className="text-xs border border-neutral-700 rounded-full px-2 py-0.5">{repo.language}</span>
                                </div>
                                <p className="text-xs text-neutral-500 mb-4 line-clamp-2 h-8">
                                    {repo.description || "No description available."}
                                </p>
                                <div className="flex gap-4 text-xs text-neutral-500 font-mono">
                                    <div className="flex items-center gap-1">
                                        <Star size={12} /> {repo.stargazers_count}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork size={12} /> {repo.forks_count}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
