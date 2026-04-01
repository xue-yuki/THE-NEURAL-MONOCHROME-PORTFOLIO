"use client";

import { createProject } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await createProject(formData);
            router.push("/admin/projects");
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
                href="/admin/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to List
            </Link>

            <header>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    New Project
                </h1>
                <p className="font-mono text-sm text-neutral-500">
                    Add a new showcase to your portfolio gallery.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Title</label>
                        <input name="title" required placeholder="e.g. NEURAL_SYNC" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Category</label>
                        <input name="category" required placeholder="e.g. AI / ARCHITECTURE" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Description</label>
                    <textarea name="description" rows={3} required placeholder="Detail the architecture and problem solved..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans resize-none" />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Tech Stack (comma separated)</label>
                    <input name="techStack" required placeholder="e.g. Rust, PyTorch, gRPC" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Image URL</label>
                        <input name="imageUrl" type="url" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans" />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Demo URL (optional)</label>
                        <input name="demoUrl" type="url" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-sans" />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50">
                        {loading ? <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Save className="w-4 h-4" />} Save Project
                    </button>
                </div>
            </form>
        </div>
    );
}
