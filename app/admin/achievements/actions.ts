"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAchievements() {
    return await prisma.achievement.findMany({
        orderBy: { year: "desc" },
    });
}

export async function createAchievement(formData: FormData) {
    await prisma.achievement.create({
        data: {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            year: formData.get("year") as string,
            description: formData.get("description") as string,
        },
    });

    revalidatePath("/admin/achievements");
    revalidatePath("/");
    return { success: true };
}

export async function deleteAchievement(id: string) {
    await prisma.achievement.delete({
        where: { id },
    });

    revalidatePath("/admin/achievements");
    revalidatePath("/");
    return { success: true };
}
