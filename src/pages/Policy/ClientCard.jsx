import {
  IconCalendarWeek,
  IconMail,
  IconMapPin,
  IconPhone
} from "@tabler/icons-react";
import moment from "moment";
import React from "react";
import {
  FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonConfigColor from "../../components/common/ButtonConfig";
import EmailContent from "../../components/common/Emailcontent";
import { encryptId } from "../../components/common/EncryptionDecryption";
import { NoDataCard } from "../../components/common/NoDataCard";
import Layout from "../../components/Layout";

const ClientProfile = ({ client, policies }) => {
  const navigate = useNavigate();
  const openEmail = (email) => {
    const emailSubject = encodeURIComponent(EmailContent.subject);
    const emailBody = encodeURIComponent(EmailContent.body);
    const attachmentUrl = encodeURIComponent(EmailContent.attachmentUrl);

    const mailtoLink = `mailto:${email}?subject=${emailSubject}&body=${emailBody}%0A%0AAttachment: ${attachmentUrl}`;

    window.location.href = mailtoLink;
  };
  const getInsuranceBg = (type) => {
    switch (type.split(" ")[0]) {
      case "Health":
        return "linear-gradient(to bottom, #FFD29D, #FF9E2D)";
      case "LIC":
        return "linear-gradient(to bottom, #B1EEFF, #29BAE2)";
      case "Vehicle":
        return "linear-gradient(to bottom, #FFA0BC, #FF1B5E)";
      default:
        return "linear-gradient(to bottom, #E0E0E0, #A0A0A0)"; // Default fallback color
    }
  };
  return (
    <>
      <div className=" rounded-xl space-y-2 py-2 md:mt-16">
        <div className="p-2 text-xs">
          <h2 className="text-xl font-bold text-end">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg shadow border border-blue-300 hover:bg-blue-600 hover:text-white transition-all"
            >
              <FaArrowLeft className="text-lg" />
            </button>{" "}
            {client.client_name || "N/A"}
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href={`tel:${client.client_mobile}`}
              className="flex items-center gap-2 text-gray-700"
            >
              <IconPhone className="text-[#5F33E1] h-4 w-4" />
              <span>{client.client_mobile || "N/A"}</span>
            </a>

            <a
              onClick={() => openEmail(client.client_email_id)}
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <IconMail className="text-[#5F33E1] h-4 w-4" />
              <span className="overflow-x-auto">
                {client.client_email_id || "N/A"}
              </span>
            </a>
            <div className="flex items-center gap-2 text-gray-700">
              <IconMapPin className="text-[#5F33E1] h-4 w-4" />
              <span>{client.client_area || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <IconCalendarWeek className="text-[#5F33E1] h-4 w-4" />
              <span>
                {moment(client.client_create_date).format("DD MMM, YYYY") ||
                  "N/A"}
              </span>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 ml-4 flex-1">
            {policies.length > 1 ? policies.length : "0"} Policies
          </p>
          <ButtonConfigColor
            className="bg-blue-500 text-white rounded-l-full p-3 shadow-lg flex justify-end gap-2 w-32"
            type="button"
            buttontype="create"
            onClick={() => {
              navigate(
                `/policy-create/${encodeURIComponent(encryptId(client.id))}`
              );
            }}
            label="Add Policy"
          />
        </div>
      </div>
      <Layout>
        <div className="w-full mt-2">
          {policies?.length > 0 ? (
            policies.map((policy, index) => (
              <div key={index} className="mb-4 grid md:grid-cols-2">
                <div className="flex items-center gap-1 mb-2">
                  <h3 className="font-semibold text-2xl">
                    {policy.insurance_type.split(" ")[0]}
                  </h3>
                  <h1 className="bg-[#8B78FF] rounded-full mt-2 w-4 h-4 ml-2"></h1>
                  <div className="flex-1 border-t border-[#8B78FF] mt-2"></div>
                </div>
                <div
                  className=" p-4 rounded-lg shadow-md text-[10px]"
                  style={{ background: getInsuranceBg(policy.insurance_type) }}
                >
                  <div className=" grid grid-cols-3 gap-2">
                    <p className="text-black">
                      <span className="text-[#6E6A7C]">Policy Number:</span>{" "}
                      <p> {policy?.insurance_policy_no}</p>
                    </p>
                    <p className="text-black">
                      <span className="text-[#6E6A7C]">Policy Company:</span>{" "}
                      <p> {policy?.insurance_policy_company}</p>
                    </p>
                    <p
                      className="text-black flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/policy-update/${encodeURIComponent(
                            encryptId(policy?.id)
                          )}/?isedit=true`
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.625 2.625 0 1 1 3.713 3.713L6.75 21H3v-3.75L16.862 3.487z"
                        />
                      </svg>
                      Edit
                    </p>

                    <p className="text-black">
                      <span className="text-[#6E6A7C]">Policy Holder:</span>{" "}
                      <p> {policy?.insurance_policy_company}</p>
                    </p>
                    <p className="text-black">
                      <span className="text-[#6E6A7C]">Premium Amount:</span>{" "}
                      <p> {policy?.insurance_policy_company}</p>
                    </p>
                    <p className="text-black">
                      <span className="text-[#6E6A7C]">Premium:</span>{" "}
                      <p> {policy?.insurance_policy_company}</p>
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-white"></p>
                    <p className="text-white">{policy?.insurance_from}</p>

                    <p className="text-white ">
                      {moment(policy.insurance_expire_date).format(
                        "DD/MM/YYYY"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoDataCard message="No Policy found." />
          )}
        </div>
      </Layout>
    </>
  );
};

export default ClientProfile;
