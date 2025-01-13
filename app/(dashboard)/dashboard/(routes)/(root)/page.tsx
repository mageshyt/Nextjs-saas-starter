import { ContentLayout } from '@/components/dashboard-panel/content-layout'
import Heading from '@/components/global/heading'
import { dateFormat } from '@/utils/format'
import React from 'react'

const Home = () => {
  const user = {
    firstName: "John",
    lastName: "Doe"
  }
  console.log(user.firstName?.charAt(0)?.toUpperCase())
  return (
    <ContentLayout>
      {/* ---------------------------header--------------------------- */}
      <div className="mb-6 ">
        <Heading
          title={`Welcome back ${user.firstName?.charAt(0)?.toUpperCase()}${user.firstName?.slice(1)}!`}
          description={`Take a look your learning progress for Today ${dateFormat(new Date(), "dd MMMM yyyy")}`}
        />
      </div>
    </ContentLayout>
  )
}

export default Home 
