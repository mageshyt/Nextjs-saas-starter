"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { openCustomerPortal } from "@/action/stripe/customer-protal";
import { Loader2 } from "lucide-react";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleOpenCustomerPortal = async () => {
    startTransition(async () => {
      await openCustomerPortal(userStripeId)
    })
  }


  return (
    <Button disabled={isPending} onClick={handleOpenCustomerPortal}>
      {isPending ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : null}
      Open Customer Portal
    </Button>
  );
}
