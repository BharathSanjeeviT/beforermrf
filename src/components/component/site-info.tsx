import { useState } from "react"
import EditDate from "./edit-date"
export function SiteInfo() {
  const [date, setDate] = useState<Date | null>(new Date())
  return (
    <div className="grid gap-8 px-4 py-8 sm:px-6 md:max-w-4xl md:mx-auto">
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <MountainIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Acme Outdoor Supply</h1>
          <span className="text-sm text-muted-foreground">Seattle, WA</span>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Daily Reports</span>
            <EditDate date={date} setDate={setDate}/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Closed at 8:00 PM</span>
              </div>
              <span className="text-sm text-muted-foreground">June 1, 2024</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Closed at 7:30 PM</span>
              </div>
              <span className="text-sm text-muted-foreground">May 31, 2024</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Closed at 9:00 PM</span>
              </div>
              <span className="text-sm text-muted-foreground">May 30, 2024</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Closed at 8:45 PM</span>
              </div>
              <span className="text-sm text-muted-foreground">May 29, 2024</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <h2 className="text-lg font-semibold">Inventory Logs</h2>
        <ul className="grid gap-2">
          <li className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Hiking Backpacks</span>
            </div>
            <span className="text-sm text-muted-foreground">50 in stock</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Camping Tents</span>
            </div>
            <span className="text-sm text-muted-foreground">25 in stock</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Hiking Boots</span>
            </div>
            <span className="text-sm text-muted-foreground">75 in stock</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Camping Chairs</span>
            </div>
            <span className="text-sm text-muted-foreground">30 in stock</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}
