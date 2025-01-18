import { ContentLayout } from '@/components/dashboard-panel/content-layout'
import { DashboardHeader } from '@/components/dashboard-panel/dashboard-header'
import { currentUserProfile } from '@/lib/current-user'
import { redirect } from 'next/navigation'
import React from 'react'
import UserNameForm from './components/user-name-form'

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

      <UserNameForm user={user} />
    </ContentLayout>
  )

}

export default SettingsPage
