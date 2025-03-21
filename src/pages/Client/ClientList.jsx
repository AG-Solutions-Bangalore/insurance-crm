import { Chip, Tooltip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconEdit, IconEye } from "@tabler/icons-react";
import moment from "moment/moment";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import { encryptId } from "../../components/common/EncryptionDecryption";
import LoaderComponent from "../../components/common/LoaderComponent";
import Layout from "../../components/Layout";
import { CLIENT_LIST } from "../api/UseApi";

const ClientList = () => {
  const [clientData, setClienttData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_LIST();

        setClienttData(response?.data?.client || []);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "id",
        label: "Id",
        options: {
          filter: true,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
        },
      },
      {
        name: "client_name",
        label: "Client Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "client_mobile",
        label: "Mobile",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "client_area",
        label: "Area",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "client_type",
        label: "Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "client_create_date",
        label: "Date",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return value ? moment(value).format("DD-MM-YYYY") : "N/A";
          },
        },
      },

      {
        name: "client_status",
        label: "Status",
        filter: true,
        sort: false,
        options: {
          customBodyRender: (value) => {
            const client_status = value || "Unknown";

            return (
              <Chip
                label={client_status}
                color={client_status === "Active" ? "success" : "default"}
                size="small"
                variant="filled"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              />
            );
          },
        },
      },

      {
        name: "insurance_count",
        label: "Count",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => (
            <>
              <Tooltip title="Edit" placement="top">
                <button
                  onClick={() => {
                    navigate(
                      `/client-update/${encodeURIComponent(
                        encryptId(value)
                      )}/?isedit=true`
                    );
                  }}
                  className="text-gray-500 hover:text-accent-500 transition-colors"
                >
                  <IconEdit className="text-gray-500 hover:text-accent-500 transition-colors w-5 h-5" />
                </button>
              </Tooltip>

              {/* <Tooltip title="Policy List" placement="top">
                <button
                  onClick={() => {
                    navigate(
                      `/policy-list/${encodeURIComponent(encryptId(value))}`
                    );
                  }}
                  className="text-gray-500 hover:text-accent-500 transition-colors"
                >
                  <IconEye className="text-gray-500 hover:text-accent-500 transition-colors w-5 h-5" />
                </button>
              </Tooltip> */}
            </>
          ),
        },
      },
    ],
    []
  );

  // // Table options
  // const options = {
  //   selectableRows: "none",
  //   elevation: 0,
  //   responsive: "standard",
  //   viewColumns: false,
  //   download: false,
  //   print: false,
  //   textLabels: {
  //     body: {
  //       noMatch: loading ? <LoaderComponent /> : "Sorry, no data available",
  //     },
  //   },
  //   setRowProps: (row) => ({
  //     className: "hover:bg-gray-50 transition-colors",
  //   }),

  //   setTableProps: () => ({
  //     className: "rounded-lg shadow-sm border border-gray-200",
  //   }),
  //   customToolbar: () => (
  //     <ButtonConfigColor
  //       type={"button"}
  //       buttontype={"create"}
  //       onClick={() => navigate("/client-create")}
  //       label={"Add Client"}
  //     />
  //   ),
  // };
  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
    textLabels: {
      body: {
        noMatch: loading ? <LoaderComponent /> : "Sorry, no data available",
      },
    },
    setRowProps: () => ({
      className: "hover:bg-gray-50 transition-colors cursor-pointer",
    }),
    onRowClick: (rowData, rowMeta, e) => {
      const rowId = rowData[0];

      navigate(`/policy-list/${encodeURIComponent(encryptId(rowId))}`);
    },
    setTableProps: () => ({
      className: "rounded-lg shadow-sm border border-gray-200",
    }),
    customToolbar: () => (
      <ButtonConfigColor
        type={"button"}
        buttontype={"create"}
        onClick={() => navigate("/client-create")}
        label={"Add Client"}
      />
    ),
  };

  const data = useMemo(() => clientData, [clientData]);
  return (
    <Layout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <MUIDataTable
            title="Client  List"
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientList;
