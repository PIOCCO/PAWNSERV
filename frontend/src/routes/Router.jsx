import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/service";
import Layout from "../layouts/Layout"; // Correct path to Layout
import Login from "../pages/Login"; // Correct path to Layout
import Signin from "../pages/Signin"; // Correct path to Layout
import Signup from "../pages/Signup";
import TypePage from "../pages/TypePage";
import UserProfile from "../pages/UserPage";
import Signupseller from "../pages/signupseller";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home page */}
          <Route path="about" element={<UserProfile />} /> {/* About page */}
          <Route path="services" element={<Services />} /> {/* Services page */}
        
          <Route path="Login" element={<Login />} /> {/* Services page */}
          <Route path="Signin" element={<Signin />} /> {/* Services page */}
          <Route path="/signup" element={<TypePage />} />
          <Route path="/signup2" element={<Signup/>} />
          <Route path="/signupseller" element={<Signupseller/>} />

          

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
