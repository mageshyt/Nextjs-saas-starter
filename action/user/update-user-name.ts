"use server"

import { currentUserProfile } from "@/lib/current-user"
import { db } from "@/lib/db"
import { userNameSchema, userNameType } from "@/lib/validations/user"

interface UpdateUserNameProps {
  data: userNameType
}

export async function updateUserName({ data }: UpdateUserNameProps) {
  try {

    const user = await currentUserProfile()

    if (!user) {
      return {
        error: "unauthorized"
      }
    }

    const isValid = userNameSchema.safeParse(data)

    if (!isValid.success) {
      return { error: "Invalid Data" }
    }

    if (isValid.success) {
      await db.user.update({
        where: { id: user.id },
        data: {
          name: data.name
        },
      })

      return { success: "Name updated successfully" }
    }

  }
  catch (error) {
    console.error(error)
    return { error: "Somethign went wrong" }
  }
}
