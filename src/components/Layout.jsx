import Navbar from "./Navbar";
import MobileBottomNav from "./common/Navbar/MobileBottomNav";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar />
      <MobileBottomNav />
      <main className="transition-all duration-300 md:pt-16 md:px-4">
        <div className="p-6 relative md:mx-1">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
