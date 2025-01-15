"use client"

import { getProducts } from '@/action/dashboard/get-products'
import React from 'react'
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table/pagination-data-table';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { DataTableSkeleton } from '@/components/ui/data-table/data-table-skleton';



const RecentOrder = () => {

  const { data, isLoading, isFetching } = useQuery(
    {
      queryKey: ['products'],
      queryFn: () => getProducts()
    }
  )

  if (isLoading || isFetching) {
    return <DataTableSkeleton columnCount={6} />
  }


  return (

    <div>
      <Card>
        <CardContent>
          <DataTable
            searchKey='code'
            columns={columns}
            data={data?.data || []}
            alignment='align-bottom'
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default RecentOrder
