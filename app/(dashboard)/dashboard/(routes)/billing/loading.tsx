import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/global/card-skeleton";
import { DashboardHeader } from "@/components/dashboard-panel/dashboard-header";
import { ContentLayout } from "@/components/dashboard-panel/content-layout";

export default function DashboardBillingLoading() {
  return (
    <ContentLayout className="space-y-6">
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Skeleton className="h-28 w-full rounded-lg md:h-24" />
        <CardSkeleton />
      </div>
    </ContentLayout>
  );
}

