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

  const client = policyData?.client || {};
  const policie = policyData?.insurance || {};
  return (
    <div>
      <ClientCard client={client} policies={policie} />
    </div>
  );
};

export default PolicyList;
