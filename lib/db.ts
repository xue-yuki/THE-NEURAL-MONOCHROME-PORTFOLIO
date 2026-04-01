import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
    // Determine the pooled URL
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        // Return dummy client during build time if missing
        return new PrismaClient();
    }
    
    // Prisma 7 requires the PG adapter for standard database pooling
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
