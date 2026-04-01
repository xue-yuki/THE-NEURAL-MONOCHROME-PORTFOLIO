"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSiteTexts() {
    const texts = await prisma.siteText.findMany();
    // Convert to dictionary map for O(1) lookups
    return texts.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
}

export async function updateSiteText(formData: FormData) {
    const key = formData.get("key") as string;
    const value = formData.get("value") as string;

    await prisma.siteText.upsert({
        where: { key },
        update: { value },
        create: { key, value },
    });

    revalidatePath("/");
    revalidatePath("/admin/site-texts");
}
