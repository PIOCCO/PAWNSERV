import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/service";
import Layout from "../layouts/Layout";  // Default Layout (with Navbar)
import ProfileLayout from "../layouts/ProfileLayout"; // New layout for UserProfile
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import TypePage from "../pages/TypePage";
import UserProfile from "../pages/UserPage";  // User Profile Page
import Signupseller from "../pages/signupseller";
import SettingsPage from "../pages/SettingPage";
import ChatBox from "../pages/ChatPage";
import WebsiteDesign from "../pages/WebsiteDesign";
import WordPress from "../pages/WordPress";
import LogoDesign from "../pages/LogoDesign";
import AIServices from "../pages/AIServices";
import Myservices from "../pages/Myservices";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Default Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ChatBox />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<TypePage />} />
          <Route path="signup2" element={<Signup />} />
          <Route path="signupseller" element={<Signupseller />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/service" element={<About />} />
          <Route path="/website-design" element={<WebsiteDesign />} />
          <Route path="/wordpress" element={<WordPress />} />
          <Route path="/logo-design" element={<LogoDesign />} />
          <Route path="/ai-services" element={<AIServices />} />
           <Route path="/myservices" element={<Myservices />} />

        </Route>

        {/* Profile Layout (for UserProfile only) */}
        <Route path="about" element={<ProfileLayout />}>
          <Route index element={<UserProfile />} />
        </Route>

        <Route path="/settings" element={<ProfileLayout />}>
          <Route index element={<SettingsPage />} />
        </Route>

        <Route path="/chatroom" element={<ProfileLayout />}>
          <Route index element={<ChatBox />} />
        </Route>

        
      </Routes>
    </Router>
  );
};

export default AppRouter;
