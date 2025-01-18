"use server"

import { db } from "@/lib/db"

export const getUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;

  } catch (error) {
    console.error("[ERROR] GET USER BY ID:", error);
    return null;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;

  } catch (error) {
    console.error("[ERROR] GET USER BY EMAIL:", error);
    return null;
  }
}
