"use client";
import { EODItemType, LogType, PLogType } from "@/lib/types";
import { API_URL } from "@/lib/utils";
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
	const [load, setLoad] = useState(true);
	const sid = slug;
	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(`${API_URL}/site/get`, {
					s_id: slug,
					date: new Date(eodid),
				});
				console.log(data);
				setEod(data.data.eod[0]);
				setLog(data.data.log);
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
		const transformedPLog: Array<PLogType> = Object.keys(groupedLogs).map(
			(pname) => ({
				pname,
				logs: groupedLogs[pname].map((logEntry) => ({
					p_id: logEntry.p_id,
					quant: logEntry.quant,
					receive_time: logEntry.receive_time,
					receiver: logEntry.receiver,
					requested_time: logEntry.requested_time,
					sender: logEntry.sender,
				})),
			}),
		);
		setPlog(transformedPLog);
	}, [log]);
	return (
		<>
			<div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
				<div className="space-y-8">
					<div>
						<h1 className="text-3xl font-bold">End of Day Report</h1>
						<p className="text-muted-foreground">
							Construction Site, August 18, 2024
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-bold">Site Attendance</h2>
						<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div className="rounded-lg border bg-card p-4">
								<h3 className="text-lg font-medium">Site Manager</h3>
								<div className="mt-2 text-muted-foreground">
									<p>Emily Nguyen</p>
									<p>In: 8:00 AM, Out: 6:00 PM</p>
								</div>
							</div>
							<div className="rounded-lg border bg-card p-4">
								<h3 className="text-lg font-medium">Safety Officer</h3>
								<div className="mt-2 text-muted-foreground">
									<p>Michael Lee</p>
									<p>In: 8:30 AM, Out: 5:30 PM</p>
								</div>
							</div>
							<div className="rounded-lg border bg-card p-4">
								<h3 className="text-lg font-medium">Project Coordinator</h3>
								<div className="mt-2 text-muted-foreground">
									<p>Sophia Patel</p>
									<p>In: 9:00 AM, Out: 6:30 PM</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-bold">Material Inventory Log</h2>
						<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{plog.map((item) => (
								<div className="rounded-lg border bg-card p-4">
									<h3 className="text-lg font-medium">{item.pname}</h3>
									<div className="mt-2 text-muted-foreground">
										{item.logs.map((log, idx) => {
												return (
													<p key={idx}>
														{new Date(log.receive_time).toLocaleTimeString()}- {log.quant} units {log.sender === sid ? (log.receiver ? "sent" : "used") : "received"}{" "}
													</p>
												);
										})}
									</div>
								</div>
							))}
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
							{eod?.workers.map((eoditem, idx) => (
								<div className="rounded-lg border bg-card p-4" key={idx}>
									<h3 className="text-lg font-medium">{eoditem.worker}</h3>
									<p className="mt-2 text-muted-foreground">
										{eoditem.quantity} workers
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default EOD;
