import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ClientWrapper from "@/components/wrapper/client-wrapper";
import { SignOutButton } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";

const SignOutAlert = () => {
  return (
    <ClientWrapper>

      <Alert
        variant="destructive"
        className="flex justify-between items-center dark:text-rose-700 dark:border-rose-700"
      >
        <div className="flex flex-col">
          <div className="flex gap-1 items-start">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Danger Zone</AlertTitle>
          </div>
          <AlertDescription>
            Do you want to sign out from your account?
          </AlertDescription>
        </div>
        <div>
          <Button variant="destructive" className="mx-auto rounded-full">
            <SignOutButton />
          </Button>
        </div>
      </Alert>
    </ClientWrapper>
  )
}

export default SignOutAlert
