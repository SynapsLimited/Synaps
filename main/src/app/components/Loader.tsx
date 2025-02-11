import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = '#3498db' }) => {
  const sizeMap = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeMap[size]} border-4 border-t-4 border-white rounded-full animate-spin`}
        style={{ borderTopColor: color }}
        role="status"
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loader

