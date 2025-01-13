import { ContentLayout } from '@/components/dashboard-panel/content-layout'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Summar from './components/summary'

const Home = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/')
  }
  return (
    <ContentLayout>
      <Summar />
    </ContentLayout>
  )
}

export default Home 
