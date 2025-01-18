"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SectionColumns } from "@/components/dashboard-panel/section-columns";
import { userNameSchema, userNameType } from "@/lib/validations/user";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";
import { updateUserName } from "@/action/user/update-user-name";
import { useRouter } from "next/navigation";

interface UserNameFormProps {
  user: User
}

const UserNameForm = ({ user }: UserNameFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const form = useForm<userNameType>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });


  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        await updateUserName({ data }).then((res) => {
          if (res?.error) {
            toast.error(res?.error);
          } else {
            toast.success(res?.success);
            router.refresh()
          }
        })
      }
      catch {
        toast.error("Failed to update user name");
      }
    });
  });;
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <SectionColumns
          title="Your Name"
          description="Please enter a display name you are comfortable with."
        >
          <div className="flex gap-4 md:items-center flex-col md:flex-row items-end">

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        form.setValue("name", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div >
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isPending}
                className="w-[130px]"
              >
                {isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )
                }
                save name
              </Button>
            </div>
          </div>
        </SectionColumns>
      </form>
    </Form>
  );
};

export default UserNameForm;
