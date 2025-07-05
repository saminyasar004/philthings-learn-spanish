import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { dashboardItems, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Label,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
} from "recharts";

const reveneuChartData = [
	{ month: "Jan", revenue: 5000 },
	{ month: "Feb", revenue: 7500 },
	{ month: "Mar", revenue: 9000 },
	{ month: "Apr", revenue: 12000 },
	{ month: "May", revenue: 15000 },
	{ month: "Jun", revenue: 18000 },
	{ month: "Jul", revenue: 22000 },
	{ month: "Aug", revenue: 25000 },
	{ month: "Sep", revenue: 28000 },
	{ month: "Oct", revenue: 30000 },
	{ month: "Nov", revenue: 32000 },
	{ month: "Dec", revenue: 64366.77 },
];

const affiliateClicksChartData = [
	{
		affiliate: "Affiliate Clicks ",
		clicks: 50000,
		fill: "#06402B",
	},
];

const chartConfig = {
	revenue: {
		label: "Revenue",
		color: "#112C50",
	},
} satisfies ChartConfig;

export default function AdminDashboard() {
	const [timeRange, setTimeRange] = useState("yearly");

	const totalClicks = affiliateClicksChartData.reduce(
		(acc, curr) => acc + curr.clicks,
		0
	);

	return (
		<div className="w-full pb-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{dashboardItems.map((item) => (
					<div
						key={item.title}
						className="bg-[#fefefe] drop-shadow p-5 rounded-lg w-full flex flex-col gap-4"
					>
						<div className="w-full flex items-center justify-between">
							<div className="flex flex-col gap-4">
								<h5 className="text-[#2A2A2A] font-semibold">
									{item.title}
								</h5>
								<span className="font-montserrat text-primary font-semibold text-3xl">
									{item.value.toLocaleString()}
								</span>
							</div>
							<div
								className={cn(
									"p-4 rounded-3xl",
									item.background
								)}
							>
								<item.icon
									size={30}
									className={cn(item.foreground)}
								/>
							</div>
						</div>
					</div>
				))}

				<Card className="pt-0 col-span-3">
					<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
						<div className="grid flex-1 gap-1">
							<CardTitle className="text-primary">
								Total Revenue
							</CardTitle>
						</div>
						<Select value={timeRange} onValueChange={setTimeRange}>
							<SelectTrigger
								className="w-[160px] rounded-lg sm:ml-auto sm:flex"
								aria-label="Select a time range"
							>
								<SelectValue placeholder="Yearly" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem
									value="yearly"
									className="rounded-lg"
								>
									Yearly
								</SelectItem>
								<SelectItem value="6m" className="rounded-lg">
									Last 6 months
								</SelectItem>
								<SelectItem value="3m" className="rounded-lg">
									Last 3 months
								</SelectItem>
							</SelectContent>
						</Select>
					</CardHeader>
					<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
						<ChartContainer
							config={chartConfig}
							className="aspect-auto h-[250px] w-full"
						>
							<AreaChart
								data={reveneuChartData}
								margin={{
									top: 10,
									right: 10,
									left: -10,
									bottom: 0,
								}}
							>
								<defs>
									<linearGradient
										id="fillRevenue"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="5%"
											stopColor="#F8D955"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="#F8D955"
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									vertical={false}
									strokeDasharray="3 3"
								/>
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => value}
								/>
								<Tooltip
									content={<ChartTooltipContent />}
									formatter={(value) => `$${value}`}
									labelFormatter={(label) => label}
								/>
								<Area
									type="monotone"
									dataKey="revenue"
									stroke="#F8D955"
									fill="url(#fillRevenue)"
									dot={true}
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>

				<div>
					<Card>
						<CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row w-full h-full">
							<div className="grid flex-1 gap-1">
								<CardTitle className="text-primary flex items-center justify-between">
									<h6 className="text-xl">
										Total Affiliate Clicks
									</h6>

									<Button variant="outline" size="sm">
										This Month
									</Button>
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square max-h-[250px]"
							>
								<PieChart>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent hideLabel />
										}
									/>
									<Pie
										data={affiliateClicksChartData}
										dataKey="clicks"
										nameKey="affiliate"
										innerRadius={60}
										strokeWidth={5}
									>
										<Label
											content={({ viewBox }) => {
												if (
													viewBox &&
													"cx" in viewBox &&
													"cy" in viewBox
												) {
													return (
														<text
															x={viewBox.cx}
															y={viewBox.cy}
															textAnchor="middle"
															dominantBaseline="middle"
														>
															<tspan
																x={viewBox.cx}
																y={viewBox.cy}
																className="fill-foreground text-3xl font-bold"
															>
																{totalClicks.toLocaleString()}
															</tspan>
															<tspan
																x={viewBox.cx}
																y={
																	(viewBox.cy ||
																		0) + 24
																}
																className="fill-muted-foreground"
															>
																Visitors
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>

				<div className="col-span-4 flex flex-col gap-5 py-5">
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
			</div>
		</div>
	);
}
