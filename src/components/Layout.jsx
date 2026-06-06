import { Outlet } from "react-router-dom"; // Essential for child routes
import Navbar from "./Navbar";
// import ShortCourses from "./ShortCourses";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      
      <div className="main-content">
        {/* <Sidebar /> */}
        
        <main>
          <Outlet /> 
        </main>

        <main>
        {/* <ShortCourses /> */}

        </main>
      </div>
      
      <Footer />
    </div>
  );
}