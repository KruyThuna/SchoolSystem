import { Outlet } from "react-router-dom"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="layout-container">
      <Navbar /> 
      
      
        <main>
          <Outlet /> {/* This is where Home, About, etc. will inject their content */}
        </main>
      
      <Footer />
    </div>
  );
}