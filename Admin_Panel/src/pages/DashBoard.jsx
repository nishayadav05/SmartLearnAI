import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <Topbar />

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <StatCard title="Customers" value="3,782" percent="11.01%" up />
          <StatCard title="Orders" value="5,359" percent="9.05%" />
          <StatCard title="Revenue" value="$20K" percent="10%" up />
        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <SalesChart />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-blue-400">75.55%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
