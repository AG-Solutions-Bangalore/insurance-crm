import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "../../components/common/InputField";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import { INSURANCE_STATUS, UPDATE_POLICY_RENEWAL } from "../api/UseApi";

const UpdatePolicyRenewal = ({ formData, open, onClose, handleChange }) => {
  const [policystatus, setPolicyStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchPolicyStatus = async () => {
        try {
          const response = await INSURANCE_STATUS();
          setPolicyStatus(response?.data?.insuranceStatus || []);
        } catch (error) {
          console.error("Error fetching client types:", error);
        }
      };
      fetchPolicyStatus();
    }
  }, [open]);

  const Update = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await UPDATE_POLICY_RENEWAL(id, formData);

      if (response.data.code === 200) {
        toast.success(response.data.msg || "Update Policy successfully");
        // navigate("/client-list");
        onClose();
      } else {
        toast.error(response.data.msg || "Error saving Policy");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      TransitionComponent={Slide}
      transitionDuration={500}
      sx={{ backdropFilter: "blur(4px)" }}
      maxWidth="sm"
    >
      <DialogTitle>Update Policy Renewal</DialogTitle>
      <DialogContent>
        <form className="space-y-4">
          <TextField
            type="date"
            label="Insurance Date"
            name="insurance_followup_date"
            placeholder="Enter Insurance Date..."
            value={formData.insurance_followup_date}
            onChange={handleChange}
            required
            width="full"
          />
          <TextField
            label="Status"
            name="insurance_status"
            type="select"
            placeholder="Choose Insurance Status"
            value={formData.insurance_status}
            onChange={handleChange}
            options={policystatus.map((type) => ({
              value: type.insurance_status,
              label: type.insurance_status,
            }))}
            required
            width="full"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <div className="space-x-3 my-4 flex justify-center">
          <ButtonConfigColor
            loading={loading}
            type="submit"
            buttontype="submit"
            label={"Submit"}
          />
          <ButtonConfigColor
            type="button"
            buttontype="back"
            label="Back"
            onClick={onClose}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePolicyRenewal;
