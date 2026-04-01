import { getProjects, deleteProject } from "./actions";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Project } from "@prisma/client";

export default async function ProjectsPage() {
    let projects: Project[] = [];
    try {
        projects = await getProjects() as Project[];
    } catch (e) {
        // Handle gracefully if DB isn't connected
    }

    return (
        <div className="space-y-8 pb-16">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Projects
                    </h1>
                    <p className="font-mono text-sm text-neutral-500">
                        Manage your portfolio showcases.
                    </p>
                </div>
                
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </Link>
            </header>

            {projects.length === 0 ? (
                <div className="border border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                        <Plus className="w-5 h-5 opacity-50" />
                    </div>
                    <p className="text-white font-medium mb-1">No projects found</p>
                    <p className="text-neutral-500 text-sm font-mono">
                        You have not added any projects yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative flex flex-col p-5 rounded-2xl border border-white/10 bg-black hover:bg-white/[0.02] transition-colors overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{project.category}</span>
                                </div>
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <button 
                                        type="submit" 
                                        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>

                            <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            
                            <div className="mt-auto flex flex-wrap gap-2 mb-4">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-neutral-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex gap-4 border-t border-white/10 pt-4 mt-2">
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-400 flex items-center gap-1 hover:text-white transition-colors">
                                        <ExternalLink className="w-3 h-3" /> DEMO
                                    </a>
                                )}
                                {project.imageUrl && (
                                    <a href={project.imageUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-neutral-400 flex items-center gap-1 hover:text-white transition-colors">
                                        <ExternalLink className="w-3 h-3" /> IMAGE
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
