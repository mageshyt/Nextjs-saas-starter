import { getProducts } from '@/action/dashboard/get-products'
import { DataTable } from '@/components/ui/data-table/data-table';
import React from 'react'
import { columns } from './columns';



const RecentOrder = async () => {
  const tasks = await getProducts();
  return (

    <div>

      <div
        className='bg-zinc-950 p-4 rounded-md'
      >


        <DataTable
          searchKey="title"
          columns={columns}
          data={tasks}
        />
      </div>


    </div>
  )
}

export default RecentOrder
