"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getProject(id: string) {
    return await prisma.project.findUnique({
        where: { id },
    });
}

export async function createProject(formData: FormData) {
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map(t => t.trim()).filter(Boolean);

    await prisma.project.create({
        data: {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            description: formData.get("description") as string,
            imageUrl: formData.get("imageUrl") as string || null,
            demoUrl: formData.get("demoUrl") as string || null,
            repoUrl: formData.get("repoUrl") as string || null,
            techStack,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map(t => t.trim()).filter(Boolean);

    await prisma.project.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            description: formData.get("description") as string,
            imageUrl: formData.get("imageUrl") as string || null,
            demoUrl: formData.get("demoUrl") as string || null,
            repoUrl: formData.get("repoUrl") as string || null,
            techStack,
        },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}
