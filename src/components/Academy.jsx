import React, { useState, useEffect } from "react";
import "../styles/Academy.css";

export default function Academy() {
  const [activeBanner, setActiveBanner] = useState(0);

  const bannerSlides = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2l9 4-9 4-9-4 9-4z" stroke="white" strokeWidth="2" />
        </svg>
      ),
      subtitle: "AcademyOS Intelligence",
      title: "Next-Gen AI Learning System",
      description:
        "Modern platform for AI, software engineering, and cloud computing education.",
      action: "Explore System",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16v10H4z" stroke="white" strokeWidth="2" />
        </svg>
      ),
      subtitle: "Global Career Network",
      title: "98% Graduate Placement Rate",
      description:
        "Direct connection between students and global tech companies.",
      action: "View Careers",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 1v22" stroke="white" strokeWidth="2" />
        </svg>
      ),
      subtitle: "Smart Scholarships",
      title: "AI-Based Financial Support",
      description:
        "Automatic eligibility detection for tuition support and grants.",
      action: "Check Eligibility",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((p) => (p + 1) % bannerSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="academy-container">
      {/* HEADER */}
      <header className="academy-header">
        <h1 className="academy-logo">
          Academy<span>OS</span>
        </h1>

        <p className="academy-desc">
          Modern Learning Platform for AI, Software Engineering & Cloud Systems
        </p>
      </header>

      {/* ================= FRONT IMAGE HERO BANNER ================= */}
      <section className="banner-wrapper">
        {bannerSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`banner-card ${idx === activeBanner ? "active" : ""}`}
          >
            {/* BACKGROUND IMAGE */}
            <div className="banner-bg">
              <img src={slide.image} alt="banner" />
            </div>

            {/* DARK OVERLAY */}
            <div className="overlay"></div>

            {/* FRONT CONTENT */}
            <div className="banner-content">
              <div className="banner-icon">{slide.icon}</div>

              <span className="tag">{slide.subtitle}</span>

              <h2>{slide.title}</h2>

              <p>{slide.description}</p>

              <button>{slide.action} →</button>
            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="dots">
          {bannerSlides.map((_, i) => (
            <span
              key={i}
              className={i === activeBanner ? "dot active" : "dot"}
              onClick={() => setActiveBanner(i)}
            />
          ))}
        </div>
      </section>

      {/* COURSE GRID */}
      <section className="grid">
        <div className="card tech">
          <h3>Software Engineering</h3>
          <p>React, Java, Spring Boot, DevOps full-stack development.</p>
        </div>

        <div className="card ai">
          <h3>Artificial Intelligence</h3>
          <p>Machine learning, deep learning, neural networks.</p>
        </div>

        <div className="card cloud">
          <h3>Cloud & Networking</h3>
          <p>AWS, Azure, distributed systems, cybersecurity.</p>
        </div>
      </section>
    </div>
  );
}
