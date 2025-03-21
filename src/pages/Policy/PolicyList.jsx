import { Chip, Tooltip } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import moment from "moment/moment";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import {
  decryptId,
  encryptId,
} from "../../components/common/EncryptionDecryption";
import LoaderComponent from "../../components/common/LoaderComponent";
import PageHeader from "../../components/common/PageHeader";
import Layout from "../../components/Layout";
import { FETCH_CLIENT_BY_ID } from "../api/UseApi";
import ClientCard from "./ClientCard";

const PolicyList = () => {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const decryptedId = decryptId(id);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const response = await FETCH_CLIENT_BY_ID(decryptedId);

        setPolicyData(response?.data || []);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [decryptedId]);

  const columns = useMemo(
    () => [
      //1
      {
        name: "insurance_type",
        label: "Innsurance Type",
        options: {
          filter: false,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
        },
      },
      //2
      {
        name: "insurance_policy_no",
        label: "Insurance Policy",
        options: {
          filter: true,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
        },
      },
      //3
      {
        name: "combined",
        label: "Insurance Type/Policy No",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const insurancetype = tableMeta.rowData[0];
            const policyno = tableMeta.rowData[1];
            return (
              <div className=" flex flex-col w-32">
                <span>{insurancetype}</span>
                <span>{policyno}</span>
              </div>
            );
          },
        },
      },
      //5
      {
        name: "insurance_policy_company",
        label: "Insurance Company",
        options: {
          filter: false,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
        },
      },
      //6
      {
        name: "insurance_policy_amount",
        label: "Insurance Amount",
        options: {
          filter: true,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
        },
      },
      //7
      {
        name: "combined",
        label: "Insurance Company/Amount",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const insurancetype = tableMeta.rowData[3];
            const policyno = tableMeta.rowData[4];
            return (
              <div className=" flex flex-col w-32">
                <span>{insurancetype}</span>
                <span>{policyno}</span>
              </div>
            );
          },
        },
      },
      //8
      {
        name: "insurance_policy_type",
        label: "Insurance Type",
        options: {
          filter: true,
          sort: false,
        },
      },
      //9
      {
        name: "insurance_from",
        label: "Insurance From",
        options: {
          filter: true,
          sort: false,
        },
      },
      //10
      {
        name: "insurance_status",
        label: "Status",
        filter: true,
        sort: false,
        options: {
          customBodyRender: (value) => {
            const insurance_status = value || "Unknown";

            const statusColors = {
              Cancel: "error",
              Completed: "success",
              Expired: "warning",
              "Out of Town": "info",
              Pending: "primary",
              Unknown: "default",
            };

            return (
              <Chip
                label={insurance_status}
                color={statusColors[insurance_status] || "default"}
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
      //11
      {
        name: "insurance_expire_date",
        label: "Expire Date",
        options: {
          filter: true,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
          customBodyRender: (value) => {
            return value ? moment(value).format("DD-MM-YYYY") : "N/A";
          },
        },
      },
      //12
      {
        name: "insurance_followup_date",
        label: "Followup Date",
        options: {
          filter: true,
          display: "exclude",
          viewColumns: false,
          searchable: true,
          sort: false,
          customBodyRender: (value) => {
            return value ? moment(value).format("DD-MM-YYYY") : "N/A";
          },
        },
      },
      {
        name: "combined1",
        label: "Expire Date/Followup Date",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            const insurancedate = tableMeta.rowData[9];
            const followupDate = tableMeta.rowData[10];

            // Format date or show "N/A" if empty
            const formattedInsuranceDate = insurancedate
              ? moment(insurancedate).format("DD-MM-YYYY")
              : "";
            const formattedFollowupDate = followupDate
              ? moment(followupDate).format("DD-MM-YYYY")
              : "";

            return (
              <div className="flex flex-col w-32">
                <span>{formattedInsuranceDate}</span>
                <span>{formattedFollowupDate}</span>
              </div>
            );
          },
        },
      },

      //12
      {
        name: "id",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => (
            <Tooltip title="Edit" placement="top">
              <button
                onClick={() => {
                  navigate(
                    `/policy-update/${encodeURIComponent(
                      encryptId(value)
                    )}/?isedit=true`
                  );
                }}
                className="text-gray-500 hover:text-accent-500 transition-colors"
              >
                <IconEdit className="text-gray-500 hover:text-accent-500 transition-colors w-5 h-5" />
              </button>
            </Tooltip>
          ),
        },
      },
    ],
    []
  );

  // Table options
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
    setRowProps: (row) => ({
      className: "hover:bg-gray-50 transition-colors",
    }),
    setTableProps: () => ({
      className: "rounded-lg shadow-sm border border-gray-200",
    }),
    customToolbar: () => (
      <ButtonConfigColor
        type={"button"}
        buttontype={"create"}
        // onClick={() => navigate("/policy-create")}
        onClick={() => {
          navigate(
            `/policy-create/${encodeURIComponent(encryptId(decryptedId))}`
          );
        }}
        label={"Add Policy"}
      />
    ),
  };

  const data = useMemo(() => policyData, [policyData]);
  const client = policyData?.client || {};
  return (
    <Layout>
      <div className="p-2 bg-gray-50 min-h-screen space-y-3">
        <PageHeader title="Policy  List" />
        <ClientCard client={client} />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <MUIDataTable
            title="Policy  List"
            data={data?.insurance || []}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PolicyList;
