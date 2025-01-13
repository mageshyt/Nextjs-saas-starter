import { CarrotIcon, DollarSignIcon, Users2 } from 'lucide-react'
import StatCard from './stats-card'
const Summar = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-6'>
      <StatCard title="Total Users" value={100} description="Total number of users" icon={Users2} />
      <StatCard title="Total Revenue" value={100} description="Total revenue generated" icon={DollarSignIcon} />
      <StatCard title="Total Orders" value={100} description="Total number of orders" icon={CarrotIcon} />
    </div>
  )
}

export default Summar
