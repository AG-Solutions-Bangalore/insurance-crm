import {
  IconCalendar,
  IconCircleChevronRight,
  IconPhone,
} from "@tabler/icons-react";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import { encryptId } from "../../components/common/EncryptionDecryption";
import LoaderComponent from "../../components/common/LoaderComponent";
import { CLIENT_LIST } from "../api/UseApi";

const ClientList = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_LIST();
        setClientData(response?.data?.client || []);
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = useMemo(
    () =>
      clientData.filter((client) =>
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [clientData, searchTerm]
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <input
        type="text"
        placeholder="Search client or policy"
        className="w-full p-2 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* </div> */}

      {loading ? (
        <LoaderComponent />
      ) : (
        <div className="space-y-4 mt-2">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/policy-list/${encryptId(client.id)}`)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{client.client_name}</h3>
                  <p className="text-gray-500">{client.client_area}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-[#4894FE]">
                    {client.client_type}
                  </p>
                  <p className="text-xs text-yellow-400 flex items-center gap-1">
                    <IconCalendar size={16} />{" "}
                    {moment(client.client_create_date).format("DD MMM, YYYY")}
                  </p>
                </div>
              </div>

              <hr className="my-2 border-gray-300" />

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  {client.insurance_count} Policies
                </p>
                <p className="flex space-x-2 items-center">
                  <IconPhone className="text-[#4894FE]" />
                  <IconCircleChevronRight className="text-gray-400" />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <button
        className="fixed bottom-5 right-0 bg-blue-500 text-white rounded-l-full p-3 shadow-lg flex items-center gap-2"
        onClick={() => navigate("/client-create")}
      >
        <IconPlus size={20} /> Add New
      </button> */}
      <ButtonConfigColor
        className="fixed bottom-5 right-0 bg-blue-500 text-white rounded-l-full p-3 shadow-lg flex items-center gap-2 w-32"
        type={"button"}
        buttontype={"create"}
        onClick={() => navigate("/client-create")}
        label={"Add Client"}
      />
    </div>
  );
};

export default ClientList;
