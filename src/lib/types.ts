export interface SiteType {
  latitude: string
  longitude: string
  radius: number
  s_id: string
  s_name: string
  u_id: string
}

export interface UserType {
  adhaar_no: string
  mob: string
  r_name: string
  s_id: string
  u_id: string
  u_name: string
}

export interface AttendanceRecord {
  check_in: string;
  check_out: string;
  s_name: string;
  s_id: string;
  day: string
  total_days_present: string,
  total_hours_worked: string
}
