import "server-only";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient | null = null;

export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL;
  return Boolean(url && !url.includes("johndoe:randompassword"));
}

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
      }),
    });
  }

  return prisma;
}

export async function withDatabase<T>(callback: (db: PrismaClient) => Promise<T>) {
  if (!isDatabaseConfigured()) return null;

  try {
    return await callback(getPrisma());
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "Database operation failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return null;
  }
}
