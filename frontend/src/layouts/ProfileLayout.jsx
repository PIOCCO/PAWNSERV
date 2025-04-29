import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";  // Default Navbar
import ProfileNavbar from "../components/Profilenavbar";  // Different Navbar for User Profile
import Footer from "../components/Footer"; // Footer remains the same

const ProfileLayout = () => {
  const location = useLocation();

  // Check if the current page is the UserProfile page
  const isUserProfilePage = location.pathname === "/about" || location.pathname ==="/settings" || location.pathname ==="/chatroom"// Adjust if the route is different

  return (
    <>
      {isUserProfilePage ? <ProfileNavbar /> : <Navbar />}
      
      <Outlet /> {/* Renders the child routes (pages) */}
      <Footer />
    </>
  );
};

export default ProfileLayout;
