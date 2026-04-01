"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, FolderGit2, Type, LogOut, CodeSquare } from "lucide-react";
import { logoutAdminAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard, path: "/admin" },
        { name: "Achievements", icon: Target, path: "/admin/achievements" },
        { name: "Projects", icon: FolderGit2, path: "/admin/projects" },
        { name: "Site Texts", icon: Type, path: "/admin/site-texts" },
    ];

    return (
        <div className="min-h-screen bg-black text-neutral-200 font-sans flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/50 backdrop-blur-3xl shrink-0 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                        <CodeSquare className="w-4 h-4" />
                    </div>
                    <span className="font-semibold tracking-tight text-lg">Neural Admin</span>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium
                                    ${isActive 
                                        ? "bg-white/10 text-white border border-white/5" 
                                        : "text-neutral-500 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-70"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <form action={logoutAdminAction} className="mt-8 pt-6 border-t border-white/10">
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4 opacity-70" />
                        Sign Out
                    </button>
                </form>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                {/* Glow subtle effect */}
                <div className="fixed top-20 right-20 w-[40vw] h-[40vw] max-w-xl max-h-xl bg-white/[0.015] blur-[100px] rounded-full pointer-events-none -translate-z-10" />
                
                <div className="max-w-4xl mx-auto relative z-10 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
