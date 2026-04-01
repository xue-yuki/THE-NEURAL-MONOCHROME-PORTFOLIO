import { getProject } from "../../actions";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const project = await getProject(params.id);
    
    if (!project) return notFound();

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
                    Edit Project
                </h1>
                <p className="font-mono text-sm text-neutral-500">
                    Update showcase details in your portfolio gallery.
                </p>
            </header>

            <EditForm project={project} />
        </div>
    );
}
