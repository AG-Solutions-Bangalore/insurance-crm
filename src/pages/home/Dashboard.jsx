import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CountUp from "react-countup";
import {
  FiUsers,
  FiClock,
  FiHeart,
  FiTruck,
  FiShield,
  FiPackage,
} from "react-icons/fi";
import { Finacal_Year } from "../../config/BaseUrl";
import { FETCH_DASHBOARD_DATA } from "../api/UseApi";
import { Home } from "@mui/icons-material";

const Dashboard = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FETCH_DASHBOARD_DATA();
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Finacal_Year]);

  const stats = [
    {
      title: "Total Follow-Up",
      value: results?.todayFollowup || 0,
      color: "border-green-500 bg-green-100",
      iconColor: "bg-green-500",
      icon: <FiUsers size={24} className="text-white" />,
    },
    {
      title: "Old Follow-Up",
      value: results?.oldFollowup || 0,
      color: "border-blue-500 bg-blue-100",
      iconColor: "bg-blue-500",
      icon: <FiClock size={24} className="text-white" />,
    },
    {
      title: "Health Insurance",
      value: results?.healthinsurance || 0,
      color: "border-yellow-500 bg-yellow-100",
      iconColor: "bg-yellow-500",
      icon: <FiHeart size={24} className="text-white" />,
    },
    {
      title: "Vehicle Insurance",
      value: results?.vehicleinsurance || 0,
      color: "border-red-500 bg-red-100",
      iconColor: "bg-red-500",
      icon: <FiTruck size={24} className="text-white" />,
    },
    {
      title: "License Insurance",
      value: results?.licinsurance || 0,
      color: "border-purple-500 bg-purple-100",
      iconColor: "bg-purple-500",
      icon: <FiShield size={24} className="text-white" />,
    },
    {
      title: "Other Insurance",
      value: results?.otherinsurance || 0,
      color: "border-orange-500 bg-orange-100",
      iconColor: "bg-orange-500",
      icon: <FiPackage size={24} className="text-white" />,
    },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="relative bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 border-l-8 border-r-8 border-blue-500">
          {/* Icon Section */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
            <Home size={32} className="text-white" />
          </div>

          {/* Text Section */}
          <div>
            <h1 className="text-xl font-extrabold text-gray-800 uppercase tracking-wide">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your business insights at a glance
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 border-l-4 border-r-4 rounded-xl shadow-md hover:shadow-lg transform transition hover:scale-105 ${stat.color}`}
            >
              <div className={`p-3 rounded-full ${stat.iconColor} shadow-md`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-600">{stat.title}</p>
                <p className="text-xl font-semibold">
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    useEasing={true}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
