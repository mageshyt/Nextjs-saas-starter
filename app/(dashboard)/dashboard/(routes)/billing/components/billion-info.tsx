
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dateFormat } from "@/utils/format";
import { CustomerPortalButton } from "./customer-portal-button";

interface BillingInfoProps {
    name: string ;
    description: string;
    stripeCustomerId: string;
    hasActiveSubscription: boolean;
    isCanceled: boolean;
    stripeCurrentPeriodEnd: Date | null;
}
export function BillingInfo({ 
  name,
  description,
  stripeCustomerId,
  hasActiveSubscription,
  isCanceled,
  stripeCurrentPeriodEnd}: BillingInfoProps) {
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{name}</strong> plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 border-t bg-accent py-2 md:flex-row md:justify-between md:space-y-0">
        {hasActiveSubscription ? (
          <p className="text-sm font-medium text-muted-foreground">
            {isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {dateFormat(stripeCurrentPeriodEnd!,"MMMM d, yyyy")}.
          </p>
        ) : null}

        {hasActiveSubscription && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            Choose a plan
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
