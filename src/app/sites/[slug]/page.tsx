"use client";
import EditDate from "@/components/component/edit-date";
import {
	EODInfo,
	InventoryItem,
	MountainIcon,
} from "@/components/component/site-info";
import { EODItemType, InventoryItemType } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const SitesList = ({ params: { slug } }: { params: { slug: string } }) => {
	const [date, setDate] = useState<Date | null>(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	const [load, setLoad] = useState(true);
	const [fetch, setFetch] = useState(false);
	const [eods, setEods] = useState<Array<EODItemType>>([]);
	const [inventory, setInventory] = useState<Array<InventoryItemType>>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.post(`${API_URL}/site/list`, {
					s_id: slug,
					start_date: date,
					end_date: new Date(date!.getFullYear(), date!.getMonth() + 1, 0),
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
			const { data } = await axios.post(`${API_URL}/site/list`, {
				s_id: slug,
				start_date: date,
				end_date: new Date(date!.getFullYear(), date!.getMonth() + 1, 0),
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

	return (
		<>
			{load ? (
				<div>Loading...</div>
			) : (
				<div className="grid gap-8 px-4 py-8 sm:px-6 md:max-w-4xl md:mx-auto">
					<div className="grid gap-4">
						<div className="flex items-center gap-4">
							<MountainIcon className="h-8 w-8 text-primary" />
							<h1 className="text-2xl font-bold">Acme Outdoor Supply</h1>
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
									<div key={i_id}>
										<InventoryItem name={product} quantity={quantity} />
									</div>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default SitesList;
