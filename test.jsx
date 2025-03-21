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
import Layout from "../../components/Layout";
import { POLICY_RENEWAL } from "../api/UseApi";
import UpdatePolicyRenewal from "./UpdatePolicyRenewal";

const PolicyRenewalList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingdata, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = {
    insurance_followup_date: "",
    insurance_status: "",
  };
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const response = await POLICY_RENEWAL();

        if (
          response?.data?.insurance &&
          Array.isArray(response.data.insurance)
        ) {
          setPolicyData(response.data.insurance);
        } else {
          setPolicyData([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setPolicyData([]); // Avoid undefined errors
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "client_name",
        label: "Client Name",
        options: {
          filter: false,
          searchable: true,
          sort: false,
        },
      },

      {
        name: "client_mobile",
        label: "Client Mobile",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "insurance_from",
        label: "Insurance From",
        options: {
          filter: true,
          sort: false,
        },
      },

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
            const insurancedate = tableMeta.rowData[3];
            const followupDate = tableMeta.rowData[4];

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
      {
        name: "insurance_status",
        label: "Status",
        filter: false,
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
  };

  // const data = useMemo(() => policyData, [policyData]);
  const client = policyData?.client || {};
  return (
    <Layout>
      <div className="p-2 bg-gray-50 min-h-screen space-y-3">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <MUIDataTable
            title="Policy Renewal  List"
            data={policyData || []}
            columns={columns}
            options={options}
          />
        </div>
      </div>
      {/* <UpdatePolicyRenewal
        setFormData={setFormData}
        formData={setFormData}
        loading={loadingdata}
        setOpenDialog={setOpenDialog}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      /> */}
    </Layout>
  );
};

export default PolicyRenewalList;
