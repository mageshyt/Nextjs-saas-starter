import { ContentLayout } from '@/components/dashboard-panel/content-layout'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Summar from './components/summary'
import { SaleHistory } from './components/sale-history'
import { TopSelling } from './components/top-selling'
import RecentOrder from './components/recent-order'

const Home = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/')
  }
  return (
    <ContentLayout className='space-y-6'>
      {/* Summar */}
      <Summar />

      {/* Sale History and Top Selling */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SaleHistory />
        <TopSelling products={[
          { productName: "Product A", earnings: 1200 },
          { productName: "Product B", earnings: 3250 },
          { productName: "Product C", earnings: 870 },
          { productName: "Product D", earnings: 800 },
          { productName: "Product E", earnings: 750 },
          { productName: "Product M", earnings: 200 },
          { productName: "Product K", earnings: 500 },
        ]} />
      </div>

      {/* Recent Orders */}
      <RecentOrder/>
    </ContentLayout>
  )
}

export default Home 
