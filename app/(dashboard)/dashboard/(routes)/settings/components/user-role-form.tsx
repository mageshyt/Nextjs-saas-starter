"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionColumns } from "@/components/dashboard-panel/section-columns";

import { userRoleSchema, userRoleType } from "@/lib/validations/user";
import { Role, User } from "@prisma/client";
import { updateUserRole } from "@/action/user/update-user-role";
import { Loader2 } from "lucide-react";



interface UserRoleFormProps {
  user: User;
}

export default function UserRoleForm({ user }: UserRoleFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<userRoleType>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      role: user.role,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        const res = await updateUserRole({ data });
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Role updated successfully");
          router.refresh();
        }
      } catch {
        toast.error("Failed to update user role");
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <SectionColumns
          title="User Role"
          description="Select the user's role from the dropdown below."
        >
          <div className="flex flex-col md:flex-row items-center gap-4">

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Role).map((roleOption) => (
                          <SelectItem key={roleOption} value={roleOption}>
                            {roleOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-[130px]" type="submit" disabled={!form.formState.isDirty || isPending}>
              {isPending && <Loader2 className="size-4 mr-2 animate-spin" />} save role
            </Button>
          </div>
        </SectionColumns>
      </form>
    </Form>
  );
}
