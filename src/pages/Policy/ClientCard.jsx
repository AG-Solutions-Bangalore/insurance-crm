import moment from "moment";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import PageLayout from "../../components/common/PageLayout";
import EmailContent from "../../components/common/Emailcontent";

const ClientCard = ({ client }) => {
  const openEmail = (email) => {
    const emailSubject = encodeURIComponent(EmailContent.subject);
    const emailBody = encodeURIComponent(EmailContent.body);
    const attachmentUrl = encodeURIComponent(EmailContent.attachmentUrl);

    const mailtoLink = `mailto:${email}?subject=${emailSubject}&body=${emailBody}%0A%0AAttachment: ${attachmentUrl}`;

    window.location.href = mailtoLink;
  };
  return (
    <PageLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {client.client_name || "N/A"}
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-gray-700">
          {/* Phone */}
          <a
            href={`tel:${client.client_mobile}`}
            className="flex items-center bg-gradient-to-r from-blue-100 to-blue-300 p-3 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <FaPhone className="mr-3 text-blue-700" />
            <span className="font-semibold">
              {client.client_mobile || "N/A"}
            </span>
          </a>

          {/* Email */}
          <a
            onClick={() => openEmail(client.client_email_id)}
            className="flex items-center bg-gradient-to-r from-red-100 to-red-300 p-3 rounded-xl shadow-md hover:scale-105 transition-transform w-full cursor-pointer"
          >
            <FaEnvelope className="mr-3 text-red-700 flex-shrink-0" />
            <span className="font-semibold min-w-0 truncate">
              {client.client_email_id || "N/A"}
            </span>
          </a>

          {/* Address */}
          <div className="flex items-center bg-gradient-to-r from-green-100 to-green-300 p-3 rounded-xl shadow-md">
            <FaMapMarkerAlt className="mr-3 text-green-700" />
            <span className="font-semibold">{client.client_area || "N/A"}</span>
          </div>

          {/* Client Type */}
          <div className="flex items-center bg-gradient-to-r from-purple-100 to-purple-300 p-3 rounded-xl shadow-md">
            <FaUser className="mr-3 text-purple-700" />
            <span className="font-semibold">{client.client_type || "N/A"}</span>
          </div>

          {/* Registration Date */}
          <div className="flex items-center bg-gradient-to-r from-orange-100 to-orange-300 p-3 rounded-xl shadow-md">
            <FaCalendarAlt className="mr-3 text-orange-700" />
            <span className="font-semibold">
              {moment(client.client_create_date || "N/A").format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="text-center mt-6">
        <span
          className={`px-5 py-2 rounded-full text-white text-md font-semibold shadow-lg transform transition-all ${
            client.client_status === "Active"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {client.client_status || "N/A"}
        </span>
      </div>
    </PageLayout>
  );
};

export default ClientCard;
