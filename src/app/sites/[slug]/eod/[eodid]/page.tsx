"use client";
import Navbar from "@/components/component/navbar";
import { AttendanceRecord, EODItemType, LogType, PLogType } from "@/lib/types";
import { API_URL, utcToIst } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
const EOD = ({
  params: { slug, eodid },
}: {
  params: {
    slug: string;
    eodid: string;
  };
}) => {
  const [eod, setEod] = useState<EODItemType>();
  const [log, setLog] = useState<Array<LogType>>([]);
  const [plog, setPlog] = useState<Array<PLogType>>([]);
  const [transfers, setTransfers] = useState<Array<PLogType>>([]);
  const [attendence, setAttendence] = useState<Array<AttendanceRecord>>([]);
  const [load, setLoad] = useState(true);
  const sid = slug;
  useEffect(() => {
    (async () => {
      try {
				console.log(slug, eodid);
        const { data } = await axios.post(`${API_URL}/site/get`, {
          s_id: slug,
          date: new Date(eodid),
        });
        console.log(data);
        setEod(data.data.eod[0]);
        setLog(data.data.log);
        setAttendence(data.data.attendance);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);
  useEffect(() => {
    const groupedLogs: { [key: string]: Array<LogType> } = log.reduce(
      (acc, logEntry) => {
        if (!acc[logEntry.p_name]) {
          acc[logEntry.p_name] = [];
        }
        acc[logEntry.p_name].push(logEntry);
        return acc;
      },
      {} as { [key: string]: Array<LogType> },
    );

    const transformedPLog: Array<PLogType> = [];
    const transformedTransfers: Array<PLogType> = [];

    Object.keys(groupedLogs).forEach((pname) => {
      const regularLogs: Array<LogType> = [];
      const transferLogs: Array<LogType> = [];

      groupedLogs[pname].forEach((logEntry) => {
        if (logEntry.sender_name && logEntry.receiver_name) {
          transferLogs.push(logEntry);
        } else {
          regularLogs.push(logEntry);
        }
      });

      if (regularLogs.length > 0) {
        transformedPLog.push({
          pname,
          logs: regularLogs.map((logEntry) => ({
            p_id: logEntry.p_id,
            quant: logEntry.quant,
            receive_time: logEntry.receive_time,
            sender_name: logEntry.sender_name,
            receiver_name: logEntry.receiver_name,
            receiver: logEntry.receiver,
            requested_time: logEntry.requested_time,
            sender: logEntry.sender,
          })),
        });
      }

      if (transferLogs.length > 0) {
        transformedTransfers.push({
          pname,
          logs: transferLogs.map((logEntry) => ({
            p_id: logEntry.p_id,
            quant: logEntry.quant,
            receive_time: logEntry.receive_time,
            sender_name: logEntry.sender_name,
            receiver_name: logEntry.receiver_name,
            receiver: logEntry.receiver,
            requested_time: logEntry.requested_time,
            sender: logEntry.sender,
          })),
        });
      }
    });

    setPlog(transformedPLog);
    setTransfers(transformedTransfers);
  }, [log]);

  return (
    <>
      <Navbar name="EOD" />
      {load ? (
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">End of Day Report</h1>
              <p className="text-muted-foreground">
                Construction Site, {utcToIst(eodid).toDateString()}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Site Attendance</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {attendence.map((item, idx) => (
                  <div className="rounded-lg border bg-card p-4" key={idx}>
                    <h3 className="text-lg font-medium">
                      {item.r_name.toUpperCase()}
                    </h3>
                    <div className="mt-2 text-muted-foreground">
                      <p>{item.u_name}</p>
                      <p>
                        In: {utcToIst(item.check_in).toLocaleTimeString()} -
                        Out: {utcToIst(item.check_out).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Material Inventory Log</h2>

              <div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {plog.length === 0 ? (
                    <p className="text-muted-foreground">No logs available</p>
                  ) : (
                    plog.map((item, idx) => (
                      <div className="rounded-lg border bg-card p-4" key={idx}>
                        <h3 className="text-lg font-medium">{item.pname}</h3>
                        <div className="mt-2 text-muted-foreground">
                          {item.logs.map((log, idx) => {
                            return (
                              <p key={idx}>
                                {utcToIst(
                                  log.receive_time,
                                ).toLocaleTimeString()}
                                - {log.quant} units{" "}
                                {log.sender === null ? "imported" : "used"}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <h2 className="text-2xl my-2 font-bold">Transfers Log</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {transfers.length === 0 ? (
                    <p className="text-muted-foreground">No transfers made</p>
                  ) : (
                    transfers.map((item, idx) => (
                      <div className="rounded-lg border bg-card p-4" key={idx}>
                        <h3 className="text-lg font-medium">{item.pname}</h3>
                        <div className="mt-2 text-muted-foreground">
                          {item.logs.map((log, idx) => {
                            return (
                              <p key={idx}>
                                {utcToIst(
                                  log.receive_time,
                                ).toLocaleTimeString()}
                                - {log.quant} units{" "}
                                {log.sender === sid
                                  ? `sent to ${log.receiver_name}`
                                  : `received from ${log.sender_name}`}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Photos Uploaded</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {eod?.images && eod.images.length > 0 ? (
                  eod?.images.map((image, idx) => (
                    <div className="rounded-lg border bg-card p-4" key={idx}>
                      <img
                        src={image}
                        alt="Photo 1"
                        width="300"
                        height="200"
                        className="w-full object-cover rounded-lg"
                        style={{ aspectRatio: "300/200", objectFit: "cover" }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No photos uploaded</p>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Worker Logs</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {eod?.workers && eod?.workers.length === 0 ? (
                  <p className="text-muted-foreground">No workers present</p>
                ) : (
                  eod?.workers.map((eoditem, idx) => (
                    <div className="rounded-lg border bg-card p-4" key={idx}>
                      <h3 className="text-lg font-medium">{eoditem.worker}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {eoditem.quantity} workers
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EOD;
