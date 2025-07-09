import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationProps, notifications } from "@/lib/mock-data";
import { Trash2 } from "lucide-react";

export default function Notification() {
	return (
		<div className="w-full flex flex-col gap-5 py-5">
			<div className="py-5 flex gap-2">
				<h5 className="text-gray-400 font-medium">Today</h5>
				<Badge variant="secondary">2</Badge>
			</div>

			<div className="py-5 flex flex-col gap-5">
				{notifications.map((notification) => (
					<NotificationCard notification={notification} />
				))}
			</div>
		</div>
	);
}

function NotificationCard({
	notification,
}: {
	notification: NotificationProps;
}) {
	return (
		<div className="bg-white rounded-lg drop-shadow-sm py-4 px-4 flex items-center justify-between gap-8">
			<div className="flex flex-col gap-2 pl-20">
				<h3 className="text-primary space-x-3 font-semibold">
					{notification.title}
					<span className="font-montserrat text-gray-400 pl-2 text-sm font-normal">
						{notification.timestamp}
					</span>
				</h3>

				<p className="font-montserrat text-gray-400 text-sm">
					{notification.description}
				</p>
			</div>

			<div className="flex gap-3 items-center">
				<Button size="sm" className="rounded-lg h-8">
					View
				</Button>
				<Button variant="link" size="icon">
					<Trash2 className="text-danger" />
				</Button>
			</div>
		</div>
	);
}
