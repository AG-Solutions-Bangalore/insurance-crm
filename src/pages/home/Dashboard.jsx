import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Finacal_Year } from "../../config/BaseUrl";
import { FETCH_DASHBOARD_DATA } from "../api/UseApi";
import Layout from "../../components/Layout";
import user from "../../assets/users.gif";
import { decryptData } from "../../components/common/EncryptionDecryption";
import LoaderComponent from "../../components/common/LoaderComponent";
const Dashboard = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const decryptedUsername = localStorage.getItem("username");
  const username = decryptData(decryptedUsername);
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
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <h1 className="text-xl font-bold">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </h1>

            <h2 className="text-2xl font-bold mt-2">
              Hi {username.charAt(0).toUpperCase() + username.slice(1)}
            </h2>
          </div>
          <div className="relative">
            <img
              src={user}
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-gray-200"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 font-semibold text-lg">
            <LoaderComponent />
          </div>
        ) : (
          <>
            {/* Followups */}
            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
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
            </div>

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
