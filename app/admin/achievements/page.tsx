import { getAchievements, deleteAchievement } from "./actions";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

type Achievement = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
};

export default async function AchievementsPage() {
    let achievements: Achievement[] = [];
    try {
        achievements = await getAchievements() as Achievement[];
    } catch (e) {
        // If the DB isn't pushed yet, it will throw. We handle it gracefully.
    }

    return (
        <div className="space-y-8 pb-16">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Achievements
                    </h1>
                    <p className="font-mono text-sm text-neutral-500">
                        Manage your recognitions and milestones.
                    </p>
                </div>
                
                {/* We'll use a Client Component for the form, or just a simple link to a modal/new page */}
                <Link
                    href="/admin/achievements/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Entry
                </Link>
            </header>

            {achievements.length === 0 ? (
                <div className="border border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                        <Plus className="w-5 h-5 opacity-50" />
                    </div>
                    <p className="text-white font-medium mb-1">No achievements yet</p>
                    <p className="text-neutral-500 text-sm font-mono">
                        You have not added any data or the database isn't connected yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {achievements.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-black hover:bg-white/[0.02] transition-colors overflow-hidden">
                            <div className="flex-1 min-w-0 pr-6">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-white font-semibold truncate">{item.title}</h3>
                                    <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-white/20 text-neutral-400">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-500 truncate line-clamp-1">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <span className="font-mono text-sm text-neutral-500">{item.year}</span>
                                
                                <form action={async () => {
                                    "use server";
                                    await deleteAchievement(item.id);
                                }}>
                                    <button 
                                        type="submit" 
                                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
