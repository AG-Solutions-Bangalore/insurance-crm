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
import { NoDataCard } from "../../components/common/NoDataCard";
import Layout from "../../components/Layout";
import { CLIENT_LIST } from "../api/UseApi";
import TextField from "../../components/common/InputField";

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

  const filteredClients = useMemo(() => {
    return clientData.filter((client) => {
      const lowerSearchTerm = searchTerm.toLowerCase();

      return (
        client.client_name.toLowerCase().includes(lowerSearchTerm) ||
        client.client_mobile.toLowerCase().includes(lowerSearchTerm) ||
        client.client_area.toLowerCase().includes(lowerSearchTerm) ||
        client.client_type.toLowerCase().includes(lowerSearchTerm) ||
        moment(client.client_create_date)
          .format("DD MMM, YYYY")
          .toLowerCase()
          .includes(lowerSearchTerm)
      );
    });
  }, [clientData, searchTerm]);

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

        {loading ? (
          <LoaderComponent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">
                        {client.client_name}
                      </h3>
                      <p className="text-gray-500">{client.client_area}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium text-[#4894FE]">
                        {client.client_type}
                      </p>
                      <p className="text-xs text-yellow-400 flex items-center gap-1">
                        <IconCalendar size={16} />{" "}
                        {moment(client.client_create_date).format(
                          "DD MMM, YYYY"
                        )}
                      </p>
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" />

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      {client.insurance_count} Policies
                    </p>
                    <p className="flex space-x-2 items-center">
                      <a href={`tel:${client.client_mobile}`}>
                        <IconPhone className="text-[#4894FE]" />
                      </a>
                      <IconCircleChevronRight
                        className="text-gray-400 cursor-pointer"
                        onClick={() =>
                          navigate(`/policy-list/${encryptId(client.id)}`)
                        }
                      />
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <NoDataCard message="No clients found." />
            )}
          </div>
        )}

        <ButtonConfigColor
          className="fixed bottom-20 right-0 bg-blue-500 text-white rounded-l-full p-3 shadow-lg flex items-center gap-2 w-32"
          type={"button"}
          buttontype={"create"}
          onClick={() => navigate("/client-create")}
          label={"Add New"}
        />
      </div>
    </Layout>
  );
};

export default ClientList;
