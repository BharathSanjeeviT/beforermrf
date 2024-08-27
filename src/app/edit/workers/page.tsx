"use client";
import Navbar from "@/components/component/navbar";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/utils";
import { useSession } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
const Edit = () => {
	const [workers, setWorkers] = useState<Array<string>>([]);
	const [load, setLoad] = useState(true);
	const [sload, setsload] = useState(false);
	const [newWorker, setNewWorker] = useState("");
	const { token } = useSession();
	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`${API_URL}/workers`);
				setWorkers([]);
				data.workers.map((item: { worker: string }) => {
					setWorkers((prev) => [...prev, item.worker])
				})
			} catch (err) {
				console.log(err);
			} finally {
				setLoad(false);
			}
		})();
	}, []);

	const createworker = async () => {
		try {
			if (newWorker === "") {
				alert("Please fill all fields");
				return;
			}
			setsload(true);
			await axios.post(`${API_URL}/workers`, {
				worker: newWorker,
				token,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setsload(false);
			setWorkers([...workers, newWorker]);
		}
	};

	return (
		<>
			<Navbar name="Edit Workers" />
			{load ? (
				<div className="flex items-center justify-center min-h-screen w-full">
					Loading...
				</div>
			) : (
				<div className="text-center min-h-screen py-5 px-5">
					<h2 className="text-center text-2xl font-semibold"> Edit Workers </h2>
					<div className="flex items-center justify-between p-4 rounded-lg mb-4">
						<div className="flex w-full justify-center items-center">
							<div className="text-center flex justify-center items-center">
								Create a new worker
							</div>
							<Input
								value={newWorker}
								disabled={sload}
								onChange={(e) => setNewWorker(e.target.value)}
								className="mx-3 w-1/2"
							/>
							<button
								onClick={createworker}
								disabled={sload}
								className="bg-[#000] text-[#fff] p-3 rounded-lg"
							>
								Create
							</button>
						</div>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
						{workers.map((user, idx) => (
							<button
								key={idx}
								className="bg-card p-4 rounded-lg hover:bg-card/80 transition-colors shadow-md hover:shadow-lg"
							>
								<div className="font-medium">{user}</div>
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);
};
export default Edit;
