import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FaLock, FaLockOpen } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserDashboard = () => {
  const [isLocked, setIsLocked] = useState(false);

  const batteryData = {
    labels: ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM"],
    datasets: [
      {
        label: "Battery %",
        data: [95, 90, 88, 85, 80],
        borderColor: "#ff0000",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const accessHistoryData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Access Attempts",
        data: [2, 3, 1, 4, 2, 1, 3],
        backgroundColor: "#22c55e",
      },
    ],
  };

  const loginPieData = {
    labels: ["Success", "Failed"],
    datasets: [
      {
        label: "Login Attempts",
        data: [15, 5],
        backgroundColor: ["#10b981", "#ef4444"],
      },
    ],
  };

  const alerts = [
    "Door Locked at 14:34:58",
    "Door Unlocked at 14:35:02",
    "❌ Unauthorized access check at 14:35:02",
    "Door Unlocked at 14:35:06",
    "❌ Unauthorized access check at 14:35:06",
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">🔐 User Dashboard</h2>

      {/* First Row: Lock Controls + Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Lock Controls */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-lg mb-4">🔐 Lock Controls</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setIsLocked(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
            >
              <FaLock /> Lock
            </button>
            <button
              onClick={() => setIsLocked(false)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              <FaLockOpen /> Unlock
            </button>
          </div>
          <p className="mt-4 text-sm font-semibold">
            Current Status:{" "}
            <span className={isLocked ? "text-red-500" : "text-green-500"}>
              {isLocked ? "Locked" : "Unlocked"}
            </span>
          </p>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">⚠️ Alerts</h3>
          <ul className="list-disc list-inside space-y-1">
            {alerts.map((alert, i) => (
              <li key={i} className={alert.includes("❌") ? "text-red-500" : ""}>
                {alert}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Battery Line Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🔋 Battery Level</h3>
          <Line data={batteryData} />
        </div>

        {/* Login Pie Chart (Better Alignment) */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">📈 Login History</h3>
          <div className="w-40 h-40">
            <Pie data={loginPieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Lock/Unlock Bar Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">📊 Lock/Unlock Activity</h3>
          <Bar data={accessHistoryData} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
