import { IconMoodSad } from "@tabler/icons-react";

export const NoDataCard = ({ message }) => (
  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 shadow-md">
    <IconMoodSad size={40} className="text-gray-400 mb-2" />
    <p className="text-gray-600 text-sm">{message}</p>
  </div>
);
