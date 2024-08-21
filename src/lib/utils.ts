import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = 'https://xghucvykbssthcpfjh7zzpjrme0dhgyw.lambda-url.ap-south-1.on.aws'
