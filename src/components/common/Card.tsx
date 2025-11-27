import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  href?: string
  onClick?: () => void
}

export default function Card({ children, className, title, href, onClick }: CardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      navigate(href)
    }
  }

  const isClickable = !!(href || onClick)

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        isClickable && 'cursor-pointer hover:shadow-md transition-shadow duration-200',
        className
      )}
      onClick={isClickable ? handleClick : undefined}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
