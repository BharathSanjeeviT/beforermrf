"use client";

import EditDate from "@/components/component/edit-date";
import Navbar from "@/components/component/navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AttendanceRecord, UserType } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const UserDetails = ({ params }: { params: { slug: string } }) => {
  const [load, setLoad] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));
  const [attendence, setAttendence] = useState<Array<AttendanceRecord>>([]);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.post(`${API_URL}/u/get`, {
          u_id: params.slug,
        });
        setUser(userData.data.user[0]);
        const attendenceData = await axios.post(`${API_URL}/attendance/get`, {
          u_id: params.slug,
          start_date: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
          ).toISOString(),
          end_date: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
          ).toISOString(),
        });
        setAttendence(attendenceData.data.attendance);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  const getAttendence = async () => {
    try {
      setFetching(true);
      const { data } = await axios.post(`${API_URL}/attendance/get`, {
        u_id: params.slug,
        start_date: new Date(
          date!.getFullYear(),
          date!.getMonth(),
          1,
        ).toISOString(),
        end_date: new Date(
          date!.getFullYear(),
          date!.getMonth() + 1,
          0,
        ).toISOString(),
      });
      setAttendence(data.attendance);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      <Navbar name="User Details" />
      <div className="min-h-screen flex justify-center items-center">
        {load ? (
          <div>Loading...</div>
        ) : !user ? (
          <div>No user found</div>
        ) : (
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="bg-black border rounded-t-lg bg-[#000] flex items-center justify-between py-7 px-6">
              <div className="mx-2">
                <div className="font-semibold text-xl text-[#fff]">
                  {user?.u_name}
                </div>
                <div className="text-[#fff] my-1">
                  ID: {user?.u_id.slice(0, 8)} | Adhaar Number:{" "}
                  {user?.adhaar_no}
                </div>
              </div>
              <Button variant="destructive" size="sm" disabled>
                <TrashIcon className="h-4 w-4" />
                <span className="ml-1">Delete User</span>
              </Button>
            </div>
            <div className="p-5">
              <div className="my-3 mx-2 font-semibold flex items-center">
                <span className="text-xl">Attendence</span>
                <EditDate
                  date={date}
                  setDate={setDate}
                  doTheHonours={getAttendence}
                />
              </div>
              <div>
                {fetching ? (
                  <div>Loading...</div>
                ) : attendence.length === 0 ? (
                  <div>No data found</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>OT</TableHead>
                        <TableHead>Site</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendence.map((item, key) => {
                        return (
                          <TableRow key={key}>
                            <TableCell>
                              {new Date(item.day).toDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(item.check_in).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>
                              {new Date(item.check_out).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>
                              {parseInt(item.total_hours_worked) > 8
                                ? parseInt(item.total_hours_worked) - 8
                                : 0}
                            </TableCell>
                            <TableCell>{item.s_name}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-5 mx-2 text-muted-foreground">
                  Total Days Attended: {attendence.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default UserDetails;
