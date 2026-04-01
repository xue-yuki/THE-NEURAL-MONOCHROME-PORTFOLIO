import { Target, FolderGit2, Text, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
    return (
        <div className="space-y-12 pb-16">
            <header>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    Dashboard Overview
                </h1>
                <p className="font-mono text-sm text-neutral-500 max-w-lg leading-relaxed">
                    Welcome to the Neural Monochrome command center. Manage your portfolio's content below.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {/* Achievement Card */}
                <Link
                    href="/admin/achievements"
                    className="group relative p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                        <Target className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                            <Target className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-1.5 drop-shadow-sm">Achievements</h2>
                        <p className="text-neutral-400 text-sm font-mono opacity-80 group-hover:opacity-100">
                            Manage your track record and competition history.
                        </p>
                    </div>
                </Link>

                {/* Projects Card */}
                <Link
                    href="/admin/projects"
                    className="group relative p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                        <FolderGit2 className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-1.5 drop-shadow-sm">Projects</h2>
                        <p className="text-neutral-400 text-sm font-mono opacity-80 group-hover:opacity-100">
                            Update your showcase, tech stacks, and repos.
                        </p>
                    </div>
                </Link>

                {/* Site Texts Card */}
                <Link
                    href="/admin/site-texts"
                    className="group relative p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                        <Text className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                            <Text className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-1.5 drop-shadow-sm">Site Texts</h2>
                        <p className="text-neutral-400 text-sm font-mono opacity-80 group-hover:opacity-100">
                            Edit hero titles, about descriptions dynamically.
                        </p>
                    </div>
                </Link>

            </div>

            {/* Quick Status */}
            <div className="mt-12 p-6 rounded-2xl border border-white/[0.05] bg-black/50 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5 text-green-400" />
                </div>
                <div>
                    <h3 className="text-white font-medium mb-1">System Secure</h3>
                    <p className="text-neutral-400 text-sm">
                        You are actively logged in as root admin. Ensure your DATABASE_URL in the .env file is correct to avoid data fetch errors.
                    </p>
                </div>
            </div>
        </div>
    );
}
