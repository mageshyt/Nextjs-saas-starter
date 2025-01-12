import React from 'react'

interface HeadingProps {
  title: string
  description?: string
}
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className='text-center'>
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold tracking-tight dark:text-white text-gray-900">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-sm md:text-base leading-8 text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}

export default Heading
