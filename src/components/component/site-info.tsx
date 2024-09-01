import { EODItemType } from "@/lib/types";
import { utcToIst } from "@/lib/utils";
import Link from "next/link";

export function EODInfo({ eod, site_id }: { eod: EODItemType, site_id: string }) {
	const eodTime = (eod.eod_time);
	return (
		<Link className="flex items-center justify-between border-b pb-2"
			href={`${site_id}/eod/${utcToIst(eodTime).toISOString().split("T")[0]}`}
		>
			<div className="flex items-center gap-2">
				<ClockIcon className="h-5 w-5 text-muted-foreground" />
				<span className="text-sm">
					Closed at{" "}
					{utcToIst(eodTime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
			<span className="text-sm text-muted-foreground">
				{" "}
				{utcToIst(eodTime).toLocaleDateString()}{" "}
			</span>
		</Link>
	);
}

export function InventoryItem({
	name,
	quantity,
}: {
	name: string;
	quantity: number;
}) {
	return (
		<li className="flex items-center justify-between border-b pb-2">
			<div className="flex items-center gap-2">
				<PackageIcon className="h-5 w-5 text-muted-foreground" />
				<span className="text-sm">{name}</span>
			</div>
			<span className="text-sm text-muted-foreground">{quantity} in stock</span>
		</li>
	);
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
	);
}

export function MountainIcon(props: any) {
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
	);
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
	);
}
