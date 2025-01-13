"use client"

import DashboardPanelLayout from "@/components/dashboard-panel/dashboard-layout";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardPanelLayout>{children}</DashboardPanelLayout>
  );
};

export default DashboardLayout;
