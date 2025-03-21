import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import {
  decryptId,
  encryptId,
} from "../../components/common/EncryptionDecryption";
import TextField from "../../components/common/InputField";
import PageHeader from "../../components/common/PageHeader";
import PageLayout from "../../components/common/PageLayout";
import Layout from "../../components/Layout";
import {
  CREATE_POLICY,
  FETCH_POLICY_BY_ID,
  INSURANCE_STATUS,
  INSURANCE_TYPE,
  UPDATE_POLICY,
} from "../api/UseApi";
import { EditLoaderComponent } from "../../components/common/LoaderComponent";

const CreatePolicy = () => {
  const [insurancetype, setInsuranceType] = useState([]);
  const [policystatus, setPolicyStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingdata, setLoadingData] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const decryptedId = decryptId(id);
  const searchParams = new URLSearchParams(location.search);
  const isEditing = searchParams.get("isedit") === "true";
  const [formData, setFormData] = useState({
    client_id: isEditing ? "" : decryptedId,
    insurance_type: isEditing ? undefined : "",
    insurance_policy_no: "",
    insurance_policy_company: "",
    insurance_policy_amount: "",
    insurance_policy_type: "",
    insurance_vehicle_no: "",
    insurance_make: "",
    insurance_model: "",
    insurance_from: isEditing ? undefined : "",
    insurance_expire_date: "",
    insurance_create_date: isEditing ? undefined : "",
    insurance_status: isEditing ? "" : undefined,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "insurance_policy_amount" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch insuranceType types
  useEffect(() => {
    const fetchInsuranceTypes = async () => {
      setLoadingData(true);
      try {
        const response = await INSURANCE_TYPE();
        setInsuranceType(response?.data?.insuranceType || []);
      } catch (error) {
        console.error("Error fetching client types:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchInsuranceTypes();
  }, []);
  useEffect(() => {
    if (isEditing) {
      const fetchPolicyStatus = async () => {
        setLoadingData(true);

        try {
          const response = await INSURANCE_STATUS();
          setPolicyStatus(response?.data?.insuranceStatus || []);
        } catch (error) {
          console.error("Error fetching client types:", error);
        } finally {
          setLoadingData(false);
        }
      };
      fetchPolicyStatus();
    }
  }, [isEditing]);

  // Fetch client data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchPolicyById = async () => {
        setLoadingData(true);

        try {
          const response = await FETCH_POLICY_BY_ID(decryptedId);
          setFormData(response.data.insurance || {});
        } catch (error) {
          console.error("Error fetching client data:", error);
        } finally {
          setLoadingData(false);
        }
      };

      fetchPolicyById();
    }
  }, [isEditing, decryptedId]);

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isEditing) {
        response = await UPDATE_POLICY(decryptedId, formData);
      } else {
        response = await CREATE_POLICY(formData);
      }

      if (response.data.code === 200) {
        toast.success(response.data.msg || "Client saved successfully");
        navigate(-1);
      } else {
        toast.error(response.data.msg || "Error saving client");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader title={isEditing ? "Edit Policy" : "Create Policy"} />
        {loadingdata ? (
          <EditLoaderComponent />
        ) : (
          <PageLayout>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {!isEditing && (
                  <TextField
                    type="select"
                    label="Insurance Type"
                    name="insurance_type"
                    placeholder="Enter Insurance Type..."
                    value={formData.insurance_type}
                    options={insurancetype.map((type) => ({
                      value: type.insurance_type,
                      label: type.insurance_type,
                    }))}
                    onChange={handleChange}
                    required
                  />
                )}
                <TextField
                  label="Policy No"
                  name="insurance_policy_no"
                  placeholder="Enter Policy No..."
                  value={formData.insurance_policy_no}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Policy Company"
                  name="insurance_policy_company"
                  placeholder="Enter Policy Company..."
                  value={formData.insurance_policy_company}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Policy Amount"
                  name="insurance_policy_amount"
                  placeholder="Enter Policy Amount..."
                  value={formData.insurance_policy_amount}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Policy Type"
                  name="insurance_policy_type"
                  placeholder="Enter Policy Type..."
                  value={formData.insurance_policy_type}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Vehicle No"
                  name="insurance_vehicle_no"
                  placeholder="Enter Vehicle No..."
                  value={formData.insurance_vehicle_no}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Insurance Make"
                  name="insurance_make"
                  placeholder="Enter Insurance Make..."
                  value={formData.insurance_make}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Insurance Model"
                  name="insurance_model"
                  placeholder="Enter Insurance Model..."
                  value={formData.insurance_model}
                  onChange={handleChange}
                  required
                />
                {!isEditing && (
                  <TextField
                    label="Insurance From"
                    name="insurance_from"
                    placeholder="Enter  Insurance From..."
                    value={formData.insurance_from}
                    onChange={handleChange}
                    required
                  />
                )}
                <TextField
                  type="date"
                  label="Expire Date"
                  name="insurance_expire_date"
                  placeholder="Enter Expire Date..."
                  value={formData.insurance_expire_date}
                  onChange={handleChange}
                  required
                />
                {!isEditing && (
                  <TextField
                    type="date"
                    label="Create Date"
                    name="insurance_create_date"
                    placeholder="Enter Create Date..."
                    value={formData.insurance_create_date}
                    onChange={handleChange}
                    required
                  />
                )}
                {isEditing && (
                  <TextField
                    label="Status"
                    name="insurance_status"
                    type="select"
                    placeholder="Choose Client Type"
                    value={formData.insurance_status}
                    onChange={handleChange}
                    options={policystatus.map((type) => ({
                      value: type.insurance_status,
                      label: type.insurance_status,
                    }))}
                    required
                  />
                )}
              </div>
              <div className="space-x-3 my-4 flex justify-center">
                <ButtonConfigColor
                  loading={loading}
                  type="submit"
                  buttontype="submit"
                  label={isEditing ? "Update" : "Submit"}
                />
                <ButtonConfigColor
                  type="button"
                  buttontype="back"
                  label="Back"
                  onClick={() => navigate(-1)}
                />
              </div>
            </form>
          </PageLayout>
        )}
      </div>
    </Layout>
  );
};

export default CreatePolicy;
