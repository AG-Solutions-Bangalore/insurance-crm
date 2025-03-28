import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SignIn from "./pages/auth/SignIn";
import ClientList from "./pages/Client/ClientList";
import CreateClient from "./pages/Client/CreateClient";
import Dashboard from "./pages/home/Dashboard";
import PolicyList from "./pages/Policy/PolicyList";
import CreatePolicy from "./pages/Policy/CreatePolicy";
import PolicyRenewalList from "./pages/Renewal/PolicyRenewalList";
import ValidationWrapper from "./components/common/ValidationWrapper";
function App() {
  return (
    <>
      {/* <DisableRightClick /> */}
      <Toaster richColors position="top-right" />
      <ValidationWrapper>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* ---------------------------CLIENT--------------------------------------- */}
          <Route path="/client-list" element={<ClientList />} />
          <Route path="/client-create" element={<CreateClient />} />
          <Route
            path="/client-update/:id/:isedit?"
            element={<CreateClient />}
          />

          {/* ---------------------------POLICY--------------------------------------- */}
          <Route path="/policy-list/:id" element={<PolicyList />} />
          <Route path="/policy-create/:id" element={<CreatePolicy />} />
          <Route
            path="/policy-update/:id/:isedit?"
            element={<CreatePolicy />}
          />
          {/* ---------------------------CLIENT--------------------------------------- */}
          <Route path="/renewal-list" element={<PolicyRenewalList />} />
        </Routes>
      </ValidationWrapper>
    </>
  );
}

export default App;
