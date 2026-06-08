import React, { useState, useEffect } from "react";
import "../styles/Home.css"; // The only import needed here now!

export default function Home() {
  const slides = [
    {
      title: "Modern School Management",
      highlight: "System",
      desc: "Manage students, teachers, courses and academic performance.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    },
    {
      title: "Digital Learning",
      highlight: "Platform",
      desc: "Empowering education through technology.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
    {
      title: "Smart Analytics",
      highlight: "Dashboard",
      desc: "Track performance and institutional growth.",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home-page-wrapper">
      {/* Duplicated Navbar successfully removed from here */}
      
      {/* 1. Full-width Hero Section Block */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="section-inner hero-inner">
          <div className="hero-content">
            <span className="badge">School System</span>
            <h1>
              {slides[currentSlide].title}
              <span className="highlight-text">
                {" "}{slides[currentSlide].highlight}
              </span>
            </h1>
            <p>{slides[currentSlide].desc}</p>
            <button className="explore-btn">Explore Platform</button>
          </div>

          <div className="hero-cards-wrapper">
            <div className="hero-card card1">
              <h3>18,560</h3>
              <p>Students</p>
            </div>
            <div className="hero-card card2">
              <h3>1,240</h3>
              <p>Teachers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-width Features Section Block */}
      <section className="features-section">
        <div className="section-inner">
          <h2>Why Choose AcademyOS</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Student Management</h3>
              <p>Complete student lifecycle management.</p>
            </div>
            <div className="feature-card">
              <h3>Teacher Portal</h3>
              <p>Attendance, grading and course control.</p>
            </div>
            <div className="feature-card">
              <h3>AI Analytics</h3>
              <p>Real-time institutional insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-width Stats Section Block */}
      <section className="stats-outer-section">
        <div className="section-inner">
          <div className="stats-grid-container">
            <div className="stat-card">
              <h2>18K+</h2>
              <p>Students</p>
            </div>
            <div className="stat-card">
              <h2>1200+</h2>
              <p>Teachers</p>
            </div>
            <div className="stat-card">
              <h2>450+</h2>
              <p>Courses</p>
            </div>
            <div className="stat-card">
              <h2>99.9%</h2>
              <p>Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}