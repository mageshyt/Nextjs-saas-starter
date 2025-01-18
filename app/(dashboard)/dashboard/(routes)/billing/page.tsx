import React from 'react'

import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from '@/components/dashboard-panel/dashboard-header';
import { ContentLayout } from '@/components/dashboard-panel/content-layout';
import { currentUserProfile } from '@/lib/current-user';
import { getUserSubscription } from '@/lib/subscription';
import { redirect } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { BillingInfo } from './components/billion-info';

export const metadata = constructMetadata({
  title: "Billing – SaaS Starter",
  description: "Manage billing and your subscription plan.",
});



const page = async () => {
  const user = await currentUserProfile()
  if (!user) {
    redirect('/')
  }
  const userSubscription = await getUserSubscription(user.id)
  if (!userSubscription) {
    redirect('/pricing')
  }
  console.log(userSubscription)
  return (
    <ContentLayout className='space-y-6' >

      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />

      <div className="grid gap-8">
        <Alert className="!pl-14">
          <AlertTriangle />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription className="text-balance">
            SaaS Starter app is a demo app using a Stripe test environment. You
            can find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>

        <BillingInfo {...userSubscription} />
      </div>
    </ContentLayout >
  )
}

export default page
