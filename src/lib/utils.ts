import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const formatter=new Intl.NumberFormat("en-US",{style:"decimal",maximumFractionDigits:2,currency:"USD"})