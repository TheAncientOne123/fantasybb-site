import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { buttonClass, type ButtonSize, type ButtonVariant } from './styles'

type Variants = { variant?: ButtonVariant; size?: ButtonSize }

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button type={type} className={cn(buttonClass(variant, size), className)} {...props} />
}

export function LinkButton({ variant, size, className, ...props }: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonClass(variant, size), className)} {...props} />
}
