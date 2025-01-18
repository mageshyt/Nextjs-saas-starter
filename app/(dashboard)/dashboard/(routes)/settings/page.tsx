import { redirect } from 'next/navigation'

import { currentUserProfile } from '@/lib/current-user'
import { constructMetadata } from '@/lib/utils'

import { ContentLayout } from '@/components/dashboard-panel/content-layout'
import { DashboardHeader } from '@/components/dashboard-panel/dashboard-header'


import UserNameForm from './components/user-name-form'
import UserRoleForm from './components/user-role-form'
import ThemeSettings from './components/theme-settings'

export const metadata = constructMetadata({
  title: "Settings",
  description: "Manage your account settings.",
});
const SettingsPage = async () => {
  const user = await currentUserProfile()
  if (!user) {
    return redirect('/')
  }
  return (
    <ContentLayout>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings."
      />
      <div className="divide-y divide-muted  pb-10 max-w-7xl mx-auto">

        <UserNameForm user={user} />
        <UserRoleForm user={user} />
        <ThemeSettings />
      </div>
    </ContentLayout>
  )

}

export default SettingsPage
