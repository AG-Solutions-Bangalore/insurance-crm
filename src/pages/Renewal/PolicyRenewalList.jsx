import { Chip } from "@mui/material";
import {
  IconCalendar,
  IconCalendarMonth,
  IconCircleChevronRight,
  IconPhone,
} from "@tabler/icons-react";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import TextField from "../../components/common/InputField";
import LoaderComponent from "../../components/common/LoaderComponent";
import { NoDataCard } from "../../components/common/NoDataCard";
import Layout from "../../components/Layout";
import { POLICY_RENEWAL } from "../api/UseApi";
import UpdatePolicyRenewal from "./UpdatePolicyRenewal";
import { useNavigate } from "react-router-dom";

const PolicyRenewalList = () => {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChip, setSelectedChip] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    insurance_followup_date: "",
    insurance_status: "",
    id: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const response = await POLICY_RENEWAL();
      setPolicyData(response?.data?.insurance || []);
    } catch (error) {
      console.error("Error fetching policy data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPolicy();
  }, []);

  const handleEdit = (id) => {
    const selectedData = policyData.find((item) => item.id === id);
    if (selectedData) {
      setFormData(selectedData);
      setOpenDialog(true);
    }
  };

  const handleChipClick = (insuranceType) => {
    setSelectedChip(insuranceType);
  };

  const insuranceTypes = [
    "All",
    ...new Set(policyData.map((client) => client.insurance_type.split(" ")[0])),
  ];

  const filteredClients = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return policyData.filter((client) => {
      const matchesSearch =
        client.client_name.toLowerCase().includes(lowerSearchTerm) ||
        client.client_mobile.toLowerCase().includes(lowerSearchTerm) ||
        client.insurance_from.toLowerCase().includes(lowerSearchTerm) ||
        client.insurance_status.toLowerCase().includes(lowerSearchTerm) ||
        client.insurance_type.toLowerCase().includes(lowerSearchTerm) ||
        moment(client.insurance_expire_date)
          .format("DD MMM, YYYY")
          .toLowerCase()
          .includes(lowerSearchTerm) ||
        moment(client.insurance_followup_date)
          .format("DD MMM, YYYY")
          .toLowerCase()
          .includes(lowerSearchTerm);

      const matchesChip =
        selectedChip === "All" || client.insurance_type.includes(selectedChip);

      return matchesSearch && matchesChip;
    });
  }, [policyData, searchTerm, selectedChip]);
  const statusColors = {
    Cancel: "error",
    Completed: "success",
    Expired: "warning",
    "Out of Town": "info",
    Pending: "primary",
    Unknown: "default",
  };
  return (
    <Layout>
      <div>
        <TextField
          type="text"
          placeholder="Search client or policy"
          width="full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {insuranceTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              color={selectedChip === type ? "primary" : "default"}
              size="small"
              variant="outlined"
              onClick={() => handleChipClick(type)}
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                cursor: "pointer",
                padding: "10px",
                color: selectedChip === type ? "primary.light" : "gray",
              }}
            />
          ))}
        </div>

        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-[12px] md:text-sm">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{client.client_name}</h3>
                      <p className="text-gray-500">{client.insurance_type}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className=" text-blue-400 flex items-center gap-1">
                        {client.insurance_from}
                      </p>
                      <p className=" text-[#ed6c02] flex items-center gap-1">
                        <IconCalendar size={16} />{" "}
                        {moment(client.insurance_expire_date).format(
                          "DD MMM, YYYY"
                        )}
                      </p>
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" />

                  <div className="flex justify-between items-center text-[12px] md:text-sm">
                    <p className="flex items-center text-blue-400">
                      <IconCalendar size={16} />{" "}
                      {client.insurance_followup_date
                        ? moment(client.insurance_followup_date).format(
                            "DD MMM, YYYY"
                          )
                        : "-"}
                    </p>
                    <p className=" text-gray-400">
                      <Chip
                        label={client.insurance_status}
                        color={
                          statusColors[client.insurance_status] || "default"
                        }
                        size="small"
                        variant="filled"
                        sx={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      />
                    </p>
                    <p className="flex space-x-2 items-center">
                      <a href={`tel:${client.client_mobile}`}>
                        <IconPhone className="text-[#4894FE]" />
                      </a>
                      <p className="flex space-x-2 items-center">
                        <IconCircleChevronRight
                          className="text-gray-400 cursor-pointer"
                          onClick={() => handleEdit(client.id)}
                        />
                      </p>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <NoDataCard message="No clients found." />
            )}
          </div>
        )}

        {/* 🔹 Add New Client Button */}
        <ButtonConfigColor
          className="fixed bottom-24 right-0 bg-blue-500 text-white rounded-l-full p-3 shadow-lg flex items-center gap-2 w-32"
          type={"button"}
          buttontype={"create"}
          onClick={() => navigate("/client-create")}
          label={"Add New"}
        />
      </div>

      <UpdatePolicyRenewal
        setFormData={setFormData}
        formData={formData}
        setOpenDialog={setOpenDialog}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        handleChange={handleChange}
        onUpdated={fetchPolicy}
      />
    </Layout>
  );
};

export default PolicyRenewalList;
