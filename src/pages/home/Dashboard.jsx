import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Finacal_Year } from "../../config/BaseUrl";
import { FETCH_DASHBOARD_DATA } from "../api/UseApi";
import Layout from "../../components/Layout";

const Dashboard = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FETCH_DASHBOARD_DATA(); // Fetch data from API
        setResults(response.data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetching
      }
    };

    fetchData();
  }, [Finacal_Year]); // Refetch data if financial year changes

  const stats = [
    {
      title: "Today Followups",
      value: results?.todayFollowup || 0,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Missed (old) Followups",
      value: results?.oldFollowup || 0,
      color: "from-red-400 to-pink-500",
    },
  ];

  const pendingRenewals = [
    {
      title: "Vehicle Insurance",
      value: results?.vehicleinsurance || 0,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Health Insurance",
      value: results?.healthinsurance || 0,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "LIC Premium",
      value: results?.licinsurance || 0,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Other Insurance",
      value: results?.otherinsurance || 0,
      color: "from-blue-400 to-cyan-500",
    },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Monday</p>
            <h1 className="text-xl font-bold">25 October</h1>
            <h2 className="text-2xl font-bold mt-2">Hi Kishore</h2>
            <p className="text-gray-500 text-sm">85 Tasks are pending</p>
          </div>
          <div className="relative">
            <img
              src="/profile.jpg"
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-gray-200"
            />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        </div>

        {/* Show Loading Spinner */}
        {loading ? (
          <div className="text-center text-gray-600 font-semibold text-lg">
            Loading...
          </div>
        ) : (
          <>
            {/* Followups */}
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md text-white bg-gradient-to-r ${stat.color}`}
              >
                <p className="text-lg font-semibold">{stat.title}</p>
                <h2 className="text-3xl font-bold">
                  <CountUp start={0} end={stat.value} duration={2} />
                </h2>
              </div>
            ))}

            {/* Pending Renewals */}
            <h2 className="text-xl font-bold mt-4">Pending Renewals</h2>
            <div className="grid grid-cols-2 gap-4">
              {pendingRenewals.map((renewal, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-white shadow-md text-center bg-gradient-to-r ${renewal.color}`}
                >
                  <h2 className="text-3xl font-bold">
                    <CountUp start={0} end={renewal.value} duration={2} />
                  </h2>
                  <p className="text-sm">{renewal.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
