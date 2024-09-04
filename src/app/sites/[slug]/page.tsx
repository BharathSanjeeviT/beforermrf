"use client";
import EditDate from "@/components/component/edit-date";
import EditDateLog from "@/components/component/edit-date-log";
import Navbar from "@/components/component/navbar";
import {
	EODInfo,
	InventoryItem,
	MountainIcon,
} from "@/components/component/site-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	EODItemType,
	InventoryItemType,
	LogType,
	PLogType,
	SiteType,
	UserType,
} from "@/lib/types";
import { API_URL, getstartend, utcToIst } from "@/lib/utils";
import { useSession } from "@/store";
import axios from "axios";
import { SetStateAction, useEffect, useMemo, useState } from "react";

const SitesList = ({ params: { slug } }: { params: { slug: string } }) => {
	const [date, setDate] = useState<Date | null>(new Date(Date.now()));
	const [load, setLoad] = useState(true);
	const [sload, setSload] = useState(false);
	const [fetch, setFetch] = useState(false);
	const [eods, setEods] = useState<Array<EODItemType>>([]);
	const [inventory, setInventory] = useState<Array<InventoryItemType>>([]);
	const [show, setShow] = useState(false);
	const [currsid, setCurrsid] = useState("");
	const [sited, setSited] = useState<SiteType>();
	const [logpop, setLogpop] = useState(false);
	const [product, setProduct] = useState("");
	const { token } = useSession();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(`${API_URL}/site/details`, {
					s_id: slug,
				});
				setSited(data.sites[0]);
				setCurrsid(data.sites[0].u_id);
			} catch (err) {
				console.log(err);
			} finally {
				setLoad(false);
			}
		})();
	}, []);


	useEffect(() => {
		(async () => {
			try {
				const { start, end } = getstartend(date!); 
				console.log(start.toLocaleDateString(), end.toLocaleDateString())
				const { data } = await axios.post(`${API_URL}/site/list`, {
					s_id: slug,
					start_date: start.toLocaleDateString(),
					end_date: end.toLocaleDateString()
				});
				console.log(data);
				setEods(data.eods);
			} catch (err) {
				alert("No such site found");
				setTimeout(() => {
					location.href = "/";
				}, 2000);
				console.log(err);
			} finally {
				setLoad(false);
			}
		})();
	}, []);

	const dataChanged = async () => {
		try {
			setFetch(true);
			const { start, end } = getstartend(date!);
			const { data } = await axios.post(`${API_URL}/site/list`, {
				s_id: slug,
				start_date: start.toLocaleDateString(),
				end_date: end.toLocaleDateString()
			});
			console.log(data);
			setEods(data.eods);
		} catch (err) {
			alert("No such site found");
			setTimeout(() => {
				location.href = "/";
			}, 2000);
			console.log(err);
		} finally {
			setFetch(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(`${API_URL}/inventory`, {
					s_id: slug,
				});
				console.log(data);
				setInventory(data.inventory);
			} catch (err) {
				console.log(err);
			} finally {
				setLoad(false);
			}
		})();
	}, []);

	const makeSupervisor = async () => {
		try {
			setSload(true);
			await axios.post(`${API_URL}/site/assignSite`, {
				s_id: slug,
				u_id: currsid,
				token,
			});
			window.location.reload();
		} catch (err) {
			console.log(err);
		} finally {
			setSload(false);
		}
	};

	return (
		<>
			<Navbar name="Sites Details" />
			{load ? (
				<div>Loading...</div>
			) : (
				<div className="grid gap-8 px-4 py-8 sm:px-6 md:max-w-4xl md:mx-auto">
					<div className="grid gap-4">
						{show && (
							<SupervisorSelectPopUp
								setClose={setShow}
								doTheHonors={makeSupervisor}
								cuid={currsid}
								setCuid={setCurrsid}
								sload={sload}
							/>
						)}
						{logpop && (
							<Logpop setLogpop={setLogpop} site_id={slug} product={product} />
						)}
						<div className="flex items-center gap-4">
							<MountainIcon className="h-8 w-8 text-primary" />
							<h1 className="text-2xl font-bold">{sited?.s_name}</h1>
						</div>
						<div>
							<span className="text-lg font-semibold">Site Supervisor</span>{" "}
							{" : "}
							<span className="text-lg">{sited?.u_name}</span>
							<Button className="mx-2" onClick={() => setShow(true)}>
								{" "}
								Change{" "}
							</Button>
						</div>
						<div className="grid gap-4">
							<div className="flex items-center">
								<span className="text-lg font-semibold">Daily Reports</span>
								<EditDate
									date={date}
									setDate={setDate}
									doTheHonours={dataChanged}
								/>
							</div>
							<div className="grid gap-2">
								{fetch ? (
									<div>Loading...</div>
								) : eods.length === 0 ? (
									<div>No data found</div>
								) : (
									eods.map((eod) => (
										<div key={eod.eod_time}>
											<EODInfo eod={eod} site_id={slug} />
										</div>
									))
								)}
							</div>
						</div>

						<div className="grid gap-4">
							<h2 className="text-lg font-semibold">Inventory Logs</h2>
							<ul className="grid gap-2">
								{inventory.map(({ i_id, product, quantity }) => (
									<button
										key={i_id}
										onClick={() => {
											setProduct(product);
											setLogpop(true);
										}}
									>
										<InventoryItem name={product} quantity={quantity} />
									</button>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
const SupervisorSelectPopUp = ({
	setClose,
	doTheHonors,
	cuid,
	setCuid,
	sload,
}: {
	setClose: React.Dispatch<SetStateAction<boolean>>;
	doTheHonors: () => void;
	cuid: string;
	setCuid: React.Dispatch<SetStateAction<string>>;
	sload: boolean;
}) => {
	const [search, setSearch] = useState("");
	const [load, setLoad] = useState(true);
	const [users, setUsers] = useState<Array<UserType>>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`${API_URL}/u`);
				setUsers(data.users);
				console.log(data.users);
			} catch (err) {
				console.log(err);
			} finally {
				setLoad(false);
			}
		})();
	}, []);

	const filteredUsers = useMemo(() => {
		return users.filter((user) =>
			user.u_name.toLowerCase().includes(search.toLowerCase()),
		);
	}, [search, users]);

	return (
		<div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center z-20">
			<div className="bg-[#fff] p-8 rounded shadow-lg relative rounded-lg w-9/12 max-h-3/5">
				{load ? (
					<div className="flex items-center justify-center">Loading...</div>
				) : (
					<div className="container mx-auto px-4 md:px-6 py-8">
						<div className="mb-6 flex justify-between items-center">
							<Input
								type="search"
								placeholder="Search users..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full"
							/>
						</div>
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll py-2">
							{filteredUsers.map((user) => (
								<button
									key={user.u_id}
									onClick={() => {
										setCuid(user.u_id);
									}}
									disabled={sload || user.r_name !== "head-supervisor"}
									className={`p-4 rounded-lg transition-colors shadow-md hover:shadow-lg ${user.u_id === cuid ? "bg-[#000] text-[#fff]" : "bg-card"} ${user.r_name !== "head-supervisor" && "cursor-not-allowed"} `}
								>
									<div className="font-medium">
										{user.u_name ? user.u_name : "New User"}
									</div>
								</button>
							))}
						</div>
						<div className="mt-10 flex justify-center gap-10">
							<Button onClick={doTheHonors} disabled={sload}>
								{sload ? "Loading" : "Change"}
							</Button>
							<Button onClick={() => setClose(false)} disabled={sload}>
								Close
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const Logpop = ({
	setLogpop,
	site_id,
	product,
}: {
	setLogpop: React.Dispatch<SetStateAction<boolean>>;
	site_id: string;
	product: string;
}) => {
	const [load, setLoad] = useState(true);
	const [date, setDate] = useState<Date | null>(
		new Date(new Date().setDate(new Date().getDate() - 1)),
	);
	const [log, setLog] = useState<Array<LogType>>([]);
	const [plog, setPlog] = useState<Array<PLogType>>([]);

	useEffect(() => {
		(async () => {
			try {
				console.log(date?.toLocaleDateString());
				const { data } = await axios.post(`${API_URL}/inventory/product`, {
					s_id: site_id,
					product,
					date: date,
				});
				setLog(data.log);
				console.log(data);
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
					sender_name: logEntry.sender_name,
					receiver_name: logEntry.receiver_name,
					receiver: logEntry.receiver,
					requested_time: logEntry.requested_time,
					sender: logEntry.sender,
				})),
			}),
		);
		setPlog(transformedPLog);
	}, [log]);

	const getProductLog = async () => {
		console.log("Hello");
		try {
			const { data } = await axios.post(`${API_URL}/inventory/product`, {
				s_id: site_id,
				product,
				date: date,
			});
			console.log(data);
			setLog(data.log);
		} catch (err) {
			console.log(err);
		} finally {
		}
	};

	return (
		<div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center z-20">
			<div className="bg-[#fff] p-8 rounded shadow-lg relative rounded-lg px-5 max-h-3/5">
				{load ? (
					<div className="flex items-center justify-center">Loading...</div>
				) : (
					<>
						<div className="text-center text-lg font-semibold mb-3">
							Inventory Log for {product} on {date?.toLocaleDateString()}
						</div>
						<div className="flex justify-center items-center my-5">
							<EditDateLog
								date={date}
								setDate={setDate}
								doTheHonours={getProductLog}
							/>
						</div>
						{plog.length === 0 ? (
							<div className="text-center text-lg font-semibold mb-3">
								No logs found
							</div>
						) : (
							plog.map((item, idx) => (
								<div className="rounded-lg border bg-card p-4" key={idx}>
									<div className="mt-2 text-muted-foreground">
										{item.logs.map((log, idx) => {
											return (
												<p key={idx}>
													{utcToIst(log.receive_time).toLocaleTimeString()}-{" "}
													{log.quant} units{" "}
													{log.sender === site_id
														? log.receiver_name !== null
															? `sent for ${log.receiver_name}`
															: "used"
														: log.sender_name !== null
															? `received from ${log.sender_name}`
															: `imported`}{" "}
												</p>
											);
										})}
									</div>
								</div>
							))
						)}
								<div>
								Total Items Bought:{" "} XXX
								</div>
								<div>
								Total Items Used:{" "} XXX
								</div>
						<div className="flex justify-center items-center mt-4">
							<Button onClick={() => setLogpop(false)}>Close</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default SitesList;
