import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { users } from "@/lib/mock-data";
import { Search, Trash2 } from "lucide-react";

export default function Users() {
	return (
		<div className="w-full flex flex-col gap-5 py-5">
			<div className="max-w-xs relative border border-gray-200 rounded-md">
				<Search
					className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
					size={20}
				/>
				<Input
					placeholder="Search"
					className="pl-10 bg-transparent border-none"
				/>
			</div>

			<div className="w-full border border-gray-200 rounded-lg">
				<Table className="border-collapse px-0 w-full">
					<TableHeader>
						<TableRow className="bg-primary text-white hover:bg-primary">
							<TableHead className="font-semibold text-center text-white">
								User Name
							</TableHead>
							<TableHead className="font-semibold text-center text-white">
								Email
							</TableHead>
							<TableHead className="font-semibold text-center text-white">
								Last Active
							</TableHead>
							<TableHead className="font-semibold text-center text-white">
								Email
							</TableHead>
							<TableHead className="font-semibold text-center text-white">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user, index) => (
							<TableRow
								key={index}
								className="bg-[#fefefe] text-gray-500"
							>
								<TableCell className="font-medium text-center font-montserrat">
									{user.name}
								</TableCell>
								<TableCell className="font-medium text-center font-montserrat">
									{user.email}
								</TableCell>
								<TableCell className="font-medium text-center font-montserrat">
									{user.lastActive}
								</TableCell>
								<TableCell className="font-medium text-center font-montserrat">
									{user.email}
								</TableCell>
								<TableCell className="flex items-center justify-center text-gray-400">
									<Trash2
										className="text-red-500 cursor-pointer"
										size={18}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
