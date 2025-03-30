import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet /> {/* Pages will be rendered here */}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default Layout;
