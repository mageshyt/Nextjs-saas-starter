"use server"

import { currentUserProfile } from "@/lib/current-user"
import { db } from "@/lib/db"
import { userRoleSchema, userRoleType } from "@/lib/validations/user"

interface UpdateUserRoleProps {
  data: userRoleType
}

export async function updateUserRole({ data }: UpdateUserRoleProps) {
  try {
    const user = await currentUserProfile()

    if (!user) {
      return {
        error: "unauthorized"
      }
    }

    const isValid = userRoleSchema.safeParse(data)

    if (!isValid.success) {
      return { error: "Invalid Data" }
    }

    if (isValid.success) {
      await db.user.update({
        where: { id: user.id },
        data: {
          role: data.role
        },
      })

      return { success: "Role updated successfully" }
    }

  } catch (error) {
    console.error(error)
    return { error: "Something went wrong" }
  }
}