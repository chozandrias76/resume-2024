import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function styles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
