import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getstartend = (date: Date) => {
	const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { start, end };
};

export const API_URL =
  "https://xghucvykbssthcpfjh7zzpjrme0dhgyw.lambda-url.ap-south-1.on.aws";

export function utcToIst(utcTimeStr: string): Date {
    const utcDate = new Date(utcTimeStr); // 'Z' indicates UTC time
    const istOffsetMs = 6 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
    const istDate = new Date(utcDate.getTime() + istOffsetMs);
    
    return istDate;
}

