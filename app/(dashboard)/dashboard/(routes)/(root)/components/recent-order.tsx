import { getProducts } from '@/action/dashboard/get-products'
import React from 'react'
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table/pagination-data-table';
import { Card, CardContent } from '@/components/ui/card';



const RecentOrder = async () => {
  const { data } = await getProducts();


  return (

    <div>
      <Card >
        <CardContent>

          <DataTable
            columns={columns}
            data={data}
          />
        </CardContent>

      </Card>


    </div>
  )
}

export default RecentOrder
