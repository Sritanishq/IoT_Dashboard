import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import { FaUsers, FaKey } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { users, roles, permissions } from "../Api/MockDatas";
import {
  Line,
  Pie,
  Bar,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalPermissions, setTotalPermissions] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setTotalUsers(users.length);
    setTotalRoles(roles.length);
    setTotalPermissions(permissions.length);
  }, []);

  // 🔋 Line Chart - Battery
  const batteryData = {
    labels: ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM"],
    datasets: [
      {
        label: "Battery %",
        data: [95, 90, 88, 84, 80],
        fill: false,
        backgroundColor: "#f87171",
        borderColor: "#ef4444",
      },
    ],
  };

  // 🟠 Pie Chart - Access Type
  const pieData = {
    labels: ["Manual", "Bluetooth", "App"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#3b82f6", "#f59e0b", "#a855f7"],
        hoverOffset: 4,
      },
    ],
  };

  // 📊 Bar Chart - Access History
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Access Count",
        data: [2, 3, 1, 4, 2, 1, 3],
        backgroundColor: "#22c55e",
      },
    ],
  };

  // 🔐 Toggle Lock State
  const toggleLock = () => setIsLocked(!isLocked);

  const alerts = [
    "System initialized.",
    "Door Locked at 14:34:58",
    "Door Unlocked at 14:35:02",
    "Unauthorized access check needed at 14:35:02",
    "Door Unlocked at 14:35:06",
    "Unauthorized access check needed at 14:35:06",
    "Door Unlocked at 14:35:07",
    "Unauthorized access check needed at 14:35:07",
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Navbar />

      {/* Overall Stats */}
      <div className="bg-[#e7e7f0] rounded-lg shadow-md mt-6 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Overall Data</h2>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Cards */}
          <Link to="/users" className="flex items-center p-4 border rounded-lg shadow hover:bg-orange-200 transition-all">
            <div className="p-3 mr-4 bg-orange-100 text-orange-500 rounded-full">
              <FaUsers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Total Users</p>
              <p className="text-xl">{totalUsers}</p>
            </div>
          </Link>

          <Link to="/roles" className="flex items-center p-4 border rounded-lg shadow hover:bg-green-200 transition-all">
            <div className="p-3 mr-4 bg-green-100 text-green-500 rounded-full">
              <MdSecurity className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Roles</p>
              <p className="text-xl">{totalRoles}</p>
            </div>
          </Link>

          <Link to="/permissions" className="flex items-center p-4 border rounded-lg shadow hover:bg-teal-200 transition-all">
            <div className="p-3 mr-4 bg-teal-100 text-teal-500 rounded-full">
              <FaKey className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Permissions</p>
              <p className="text-xl">{totalPermissions}</p>
            </div>
          </Link>

          <Link to="/users" className="flex items-center p-4 border rounded-lg shadow hover:bg-blue-200 transition-all">
            <div className="p-3 mr-4 bg-blue-100 text-blue-500 rounded-full">
              <IoMdPeople className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Active Users</p>
              <p className="text-xl">{users.filter((u) => u.status === "Active").length}</p>
            </div>
          </Link>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-2">🔋 Battery Level</h3>
            <Line data={batteryData} />
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-2">📊 Access Type Distribution</h3>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lock Control */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-4">🔐 Lock Controls</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setIsLocked(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Lock
              </button>
              <button
                onClick={() => setIsLocked(false)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Unlock
              </button>
            </div>
            <p className="mt-4 text-sm font-semibold">
              Current Status:{" "}
              <span className={isLocked ? "text-red-500" : "text-green-500"}>
                {isLocked ? "Locked" : "Unlocked"}
              </span>
            </p>
          </div>

          {/* Access History */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold text-lg mb-2">📈 Access History</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg p-4 mt-6 shadow">
          <h3 className="font-semibold text-lg mb-2">⚠️ Alerts</h3>
          <ul className="list-disc pl-5 space-y-1">
            {alerts.map((alert, idx) => (
              <li key={idx} className={alert.includes("Unauthorized") ? "text-red-500" : ""}>
                {alert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
