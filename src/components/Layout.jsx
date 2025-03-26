import Navbar from "./Navbar";
import MobileBottomNav from "./common/Navbar/MobileBottomNav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <Navbar />

      <main className="flex-1  md:pt-16 pb-16 px-4 md:px-6 transition-all duration-300">
        <div className="py-5 md:p-6">{children}</div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default Layout;
