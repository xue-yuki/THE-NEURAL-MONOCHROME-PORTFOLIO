"use client";

import { createAchievement } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewAchievement() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await createAchievement(formData);
            router.push("/admin/achievements");
        } catch (error) {
            console.error(error);
            alert("Failed to save. Ensure Database is connected.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-16 max-w-2xl">
            <Link 
                href="/admin/achievements"
                className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to List
            </Link>

            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    New Achievement
                </h1>
                <p className="font-mono text-sm text-neutral-500">
                    Add a new milestone to your track record.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
                
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-neutral-300">Title</label>
                    <input 
                        id="title" 
                        name="title" 
                        placeholder="e.g. Best Project - Web Dev Showcase" 
                        required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium text-neutral-300">Category</label>
                        <select 
                            id="category" 
                            name="category" 
                            required
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans appearance-none"
                        >
                            <option value="Competition">Competition</option>
                            <option value="Project">Project</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Academic">Academic</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="year" className="text-sm font-medium text-neutral-300">Year</label>
                        <input 
                            id="year" 
                            name="year" 
                            placeholder="e.g. 2024" 
                            required
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-neutral-300">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows={4}
                        placeholder="Detail out your responsibilities, results, or what you built..." 
                        required
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans resize-none"
                    />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
}
