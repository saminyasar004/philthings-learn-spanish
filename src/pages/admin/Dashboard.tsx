import { Button } from "@/components/ui/button";
import { DataProvider } from "@/Context/DataContext";
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
import { dashboardItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
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
import { useData } from "@/Context/DataContext";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// const affiliateClicksChartData = [
// 	{
// 		affiliate: "Affiliate Clicks ",
// 		clicks: 50000,
// 		fill: "#06402B",
// 	},
// ];

const chartConfig = {
	revenue: {
		label: "Users",
		color: "#112C50",
	},
} satisfies ChartConfig;

function AdminDashboard() {
	const [timeRange, setTimeRange] = useState("yearly");
	const { dashboardData, fetchDashboardData, userGrowthData, fetchUserGrowthData, userData, fetchUserData, deleteUser, loading, error } = useData();

	useEffect(() => {
		fetchDashboardData();
		fetchUserGrowthData();
		fetchUserData();
	}, []);

	const handleDelete = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			const success = await deleteUser(id);
			if (success) {
				alert("User deleted successfully.");
			} else {
				alert("Failed to delete user. Please try again.");
			}
		}
	};

	// const totalClicks = affiliateClicksChartData.reduce(
	// 	(acc, curr) => acc + curr.clicks,
	// 	0
	// );

	// Update dashboard items with real data if available
	if (dashboardData) {
		dashboardItems[0].value = dashboardData.total_users; // Total Users
		dashboardItems[1].value = dashboardData.active_users; // Active Users
		dashboardItems[2].value = dashboardData.total_ai_conversation_count; // Total Conversations
	}

	return (
		<div className="w-full pb-8">
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
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

				<Card className="pt-0 col-span-full w-full">
  <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
    <div className="grid flex-1 gap-1">
      <CardTitle className="text-primary">Total Users</CardTitle>
    </div>
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger
        className="w-[160px] rounded-lg sm:ml-auto sm:flex"
        aria-label="Select a time range"
      >
        <SelectValue placeholder="Yearly" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="yearly" className="rounded-lg">Yearly</SelectItem>
        <SelectItem value="6m" className="rounded-lg">Last 6 months</SelectItem>
        <SelectItem value="3m" className="rounded-lg">Last 3 months</SelectItem>
      </SelectContent>
    </Select>
  </CardHeader>

  <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart
        data={userGrowthData ? userGrowthData.monthly_user_growth.map(item => ({ month: monthNames[item.month - 1], users: item.user_count })) : []}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F8D955" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F8D955" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Tooltip
          content={<ChartTooltipContent />}
          formatter={(value) => `${value}`}
          labelFormatter={(label) => label}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#F8D955"
          fill="url(#fillRevenue)"
          dot={true}
        />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>


				{/* <div>
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
				</div> */}

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
										Level
									</TableHead>
									<TableHead className="font-semibold text-center text-white">
										Date Joined
									</TableHead>
									<TableHead className="font-semibold text-center text-white">
										Status
									</TableHead>
									<TableHead className="font-semibold text-center text-white">
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{userData && userData.length > 0 ? (
									userData.map((user) => (
										<TableRow
											key={user.id}
											className="bg-[#fefefe] text-gray-500"
										>
											<TableCell className="font-medium text-center font-montserrat">
												{user.username || "N/A"}
											</TableCell>
											<TableCell className="font-medium text-center font-montserrat">
												{user.email}
											</TableCell>
											<TableCell className="font-medium text-center font-montserrat">
												{user.level || "Beginner"}
											</TableCell>
											<TableCell className="font-medium text-center font-montserrat">
												{user.date_joined}
											</TableCell>
											<TableCell className="font-medium text-center font-montserrat">
												{user.status || "Active"}
											</TableCell>
											<TableCell className="flex items-center justify-center text-gray-400">
												<Trash2
													className="text-red-500 cursor-pointer"
													size={18}
													onClick={() => handleDelete(user.id)}
												/>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow className="bg-[#fefefe] text-gray-500">
										<TableCell colSpan={6} className="font-medium text-center font-montserrat">
											{loading ? "Loading user data..." : "No user data available"}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}

const WrappedAdminDashboard = () => (
  <DataProvider>
    <AdminDashboard />
  </DataProvider>
);

export default WrappedAdminDashboard;
