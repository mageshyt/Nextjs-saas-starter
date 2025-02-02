import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextRequest } from "next/server";



export const currentProfilePage = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  console.log("User ID:", userId);

  if (!userId) {
    return null;
  }
  const user = await db.user.findUnique({
    where: {
      user_id: userId,
    },
  });
  return user;
};
