import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import { decryptId } from "../../components/common/EncryptionDecryption";
import TextField from "../../components/common/InputField";
import PageHeader from "../../components/common/PageHeader";
import PageLayout from "../../components/common/PageLayout";
import Layout from "../../components/Layout";
import {
  CLIENT_TYPE,
  CREATE_CLIENT,
  FETCH_CLIENT_BY_ID,
  UPDATE_CLIENT,
} from "../api/UseApi";
import LoaderComponent from "../../components/common/LoaderComponent";

const CreateClient = () => {
  const { id } = useParams(); // Only get the `id` param
  const location = useLocation(); // Get the full location object
  const navigate = useNavigate();
  const decryptedId = decryptId(id);
  const [loadingdata, setLoadingData] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const isEditing = searchParams.get("isedit") == "true";

  const [clienttype, setClientType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_mobile: "",
    client_email_id: "",
    client_area: "",
    client_type: "",
    client_status: isEditing ? "" : undefined,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "client_mobile" && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch client types
  useEffect(() => {
    const fetchClientTypes = async () => {
      try {
        const response = await CLIENT_TYPE();
        setClientType(response?.data?.clientType || []);
      } catch (error) {
        console.error("Error fetching client types:", error);
      }
    };

    fetchClientTypes();
  }, []);

  // Fetch client data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchClientById = async () => {
        setLoadingData(true);

        try {
          const response = await FETCH_CLIENT_BY_ID(decryptedId);
          setFormData(response.data.client || {});
        } catch (error) {
          console.error("Error fetching client data:", error);
        } finally {
          setLoadingData(false);
        }
      };

      fetchClientById();
    }
  }, [isEditing, decryptedId]);

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isEditing) {
        response = await UPDATE_CLIENT(decryptedId, formData);
      } else {
        response = await CREATE_CLIENT(formData);
      }

      if (response.data.code === 200) {
        toast.success(response.data.msg || "Client saved successfully");
        navigate("/client-list");
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
        <PageHeader title={isEditing ? "Edit Client" : "Create Client"} />
        {loadingdata ? (
          <LoaderComponent />
        ) : (
          <PageLayout>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextField
                  label="Client Name"
                  name="client_name"
                  placeholder="Enter Client Name..."
                  value={formData.client_name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Client Mobile"
                  name="client_mobile"
                  placeholder="Enter Client Mobile..."
                  value={formData.client_mobile}
                  onChange={handleChange}
                  required
                />
                <TextField
                  type="email"
                  label="Client Email"
                  name="client_email_id"
                  placeholder="Enter Client Email..."
                  value={formData.client_email_id}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Client Area"
                  name="client_area"
                  placeholder="Enter Client Area..."
                  value={formData.client_area}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Client Type"
                  name="client_type"
                  type="select"
                  placeholder="Choose Client Type"
                  value={formData.client_type}
                  onChange={handleChange}
                  options={clienttype.map((type) => ({
                    value: type.client_type,
                    label: type.client_type,
                  }))}
                  required
                />
                {isEditing && (
                  <TextField
                    label="Client Status"
                    name="client_status"
                    type="select"
                    placeholder="Choose Client Status"
                    value={formData.client_status}
                    onChange={handleChange}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
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

export default CreateClient;
