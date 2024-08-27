export interface AttendanceRecord {
	check_in: string;
	check_out: string;
	day: string;
	s_id: string;
	u_id: string;
	u_name: string;
	r_name: string;
}
export interface MessageType {
	nid: string;
	time: Date;
	uid: string;
	value: string;
	u_name: string;
}

export interface SiteType {
  latitude: string;
  longitude: string;
  radius: number;
  s_id: string;
  s_name: string;
  u_id: string;
  u_name: string;
}
export interface LogType {
  p_name: string;
  p_id: string;
  quant: string;
  receive_time: string;
  receiver: string;
  requested_time: string | null;
  sender_name: string;
  receiver_name: string;
  sender: string | null;
}

export interface PLogType {
  pname: string;
  logs: Array<{
    p_id: string;
    quant: string;
    receive_time: string;
    receiver: string | null;
    requested_time: string | null;
    sender_name: string;
    receiver_name: string;
    sender: string | null;
  }>;
}

export interface EODItemType {
  s_id: string;
  workers: Array<{
    worker: string;
    quantity: number;
  }>;
  images: string[];
  eod_time: string;
}

export interface SiteType {
  latitude: string;
  longitude: string;
  radius: number;
  s_id: string;
  s_name: string;
  u_id: string;
}

export interface UserType {
  adhaar_no: string;
  mob: string;
  r_name: string;
  s_id: string;
  u_id: string;
  u_name: string;
}

export interface AttendanceRecord {
  check_in: string;
  check_out: string;
  s_name: string;
  s_id: string;
  day: string;
  total_days_present: string;
  total_hours_worked: string;
}
export interface InventoryItemType {
  i_id: string;
  product: string;
  quantity: number;
  s_id: string;
  url: string;
}
