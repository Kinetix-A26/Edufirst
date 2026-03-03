import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentReports } from "@/components/admin/RecentReports";
import { RevenueOverviewChart } from "@/components/admin/RevenueOverviewChart";
import { SiteSelector } from "@/components/admin/SiteSelector";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-edu-text-main">Dashboard Admin</h1>
        <SiteSelector />
      </div>

      <div className="space-y-8">
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevenueOverviewChart />
          </div>
          <div>
            <RecentReports />
          </div>
        </div>
      </div>
    </div>
  );
}
