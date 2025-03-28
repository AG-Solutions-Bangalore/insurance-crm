import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateEnvironment } from "./EncryptionDecryption";
import { toast } from "sonner";

const ValidationWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      validateEnvironment();
    } catch (error) {
      navigate("/");
      toast.error("Invalid environment file detected");
    }
  }, [navigate]);

  return children;
};

export default ValidationWrapper;
