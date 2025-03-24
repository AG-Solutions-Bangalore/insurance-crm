import axios from "axios";
import { decryptData } from "../../components/common/EncryptionDecryption";
import { Base_Url } from "../../config/BaseUrl";

////////////////////*****************All Api is Called Here Except UseManagement Page And Sigin And Forgot Password************************************** */

// Generic API Request Function
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const token_encryption = localStorage.getItem("token");
    const token = decryptData(token_encryption);
    const config = {
      method,
      url: `${Base_Url}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}`, error);
    return { code: 500, msg: "Internal Server Error" };
  }
};
export const FETCH_DASHBOARD_DATA = () =>
  apiRequest("GET", `/panel-fetch-dashboard`);
export const PANEL_CHECK = () => apiRequest("GET", `/panel-check-status`);
export const CHANGE_PASSWORD = (data) =>
  apiRequest("POST", `/panel-change-password`, data);
export const PANEL_LOGIN = (data) => apiRequest("POST", `/panel-login`, data);
export const FORGOT_PASSWORD = (mobile) =>
  apiRequest("POST", `/panel-send-password`, mobile);
// ------------------------------------------
//CLIENT TYPE
export const CLIENT_TYPE = () => apiRequest("GET", `/panel-fetch-clientType`);
//CLIENT LIST
export const CLIENT_LIST = () => apiRequest("GET", `/panel-fetch-client-list`);
export const CREATE_CLIENT = (data) =>
  apiRequest("POST", `/panel-create-client`, data);
export const FETCH_CLIENT_BY_ID = (id) =>
  apiRequest("GET", `/panel-fetch-client-by-id/${id}`);
export const UPDATE_CLIENT = (id, data) =>
  apiRequest("PUT", `/panel-update-client/${id}`, data);
//POLICY LIST
// export const POLICY_LIST = () =>
//   apiRequest("GET", `/panel-fetch-insuranceType`);
//INSURANCE TYPE
export const INSURANCE_TYPE = () =>
  apiRequest("GET", `/panel-fetch-insuranceType`);
//INSURANCE STATUS
export const INSURANCE_STATUS = () =>
  apiRequest("GET", `/panel-fetch-insuranceStatus`);
export const CREATE_POLICY = (data) =>
  apiRequest("POST", `/panel-create-insurance`, data);
export const FETCH_POLICY_BY_ID = (id) =>
  apiRequest("GET", `/panel-fetch-insurance-by-id/${id}`);
export const UPDATE_POLICY = (id, data) =>
  apiRequest("PUT", `/panel-update-insurance/${id}`, data);
//POLICY_RENEWAL
export const POLICY_RENEWAL = () =>
  apiRequest("GET", `/panel-fetch-insurance-renewal`);
export const UPDATE_POLICY_RENEWAL = (id, data) =>
  apiRequest("PUT", `/panel-update-insurance-renewal/${id}`, data);
