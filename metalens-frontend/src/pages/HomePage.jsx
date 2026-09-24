// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";  // ← ADD THIS
// import "./HomePage.css";

// const HomePage = () => {
//   const navigate = useNavigate();  // ← ADD THIS
//   const [activeSection, setActiveSection] = useState("home");

//   useEffect(() => {
//     const sections = document.querySelectorAll("section[id]");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((entry) => entry.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

//         if (visible.length > 0) {
//           setActiveSection(visible[0].target.id);
//         }
//       },
//       {
//         rootMargin: "-25% 0px -60% 0px",
//         threshold: [0.1, 0.3, 0.5],
//       }
//     );

//     sections.forEach((section) => observer.observe(section));

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (id) => {
//     document.getElementById(id)?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   // ← ADD THIS FUNCTION
//   const goToAnalyze = () => {
//     navigate('/analyze');
//   };

//   return (
//     <div className="metalens-page">

//       {/* ================= BACKGROUND ================= */}

//       <div className="background-grid"></div>

//       <div className="background-glow glow-blue"></div>
//       <div className="background-glow glow-cyan"></div>
//       <div className="background-glow glow-purple"></div>

//       {/* ================= NAVBAR ================= */}

//       <header className="navbar">

//         <button
//           className="brand"
//           onClick={() => scrollToSection("home")}
//           aria-label="Go to home"
//         >
//           <div className="brand-logo">
//             <div className="logo-ring"></div>
//             <div className="logo-eye">
//               <span></span>
//             </div>
//             <div className="logo-scan"></div>
//           </div>

//           <div className="brand-text">
//             <strong>META<span>LENS</span></strong>
//             <small>DIGITAL FORENSICS</small>
//           </div>
//         </button>

//         <nav className="nav-links">

//           {[
//             ["home", "Home"],
//             ["analysis", "Analysis"],
//             ["techniques", "Techniques"],
//             ["reports", "Reports"],
//             ["about", "About"],
//           ].map(([id, label]) => (
//             <button
//               key={id}
//               className={`nav-link ${
//                 activeSection === id ? "active" : ""
//               }`}
//               onClick={() => scrollToSection(id)}
//             >
//               {label}
//             </button>
//           ))}

//         </nav>

//         {/* UPDATED: This button now navigates to /analyze */}
//         <button
//           className="nav-cta"
//           onClick={goToAnalyze}  // ← CHANGED THIS
//         >
//           <span>OPEN ANALYZER</span>
//           <b>↗</b>
//         </button>

//       </header>

//       {/* =====================================================
//           HOME / HERO
//       ===================================================== */}

//       <section className="hero-section" id="home">

//         {/* LEFT */}

//         <div className="hero-content">

//           <div className="system-status">
//             <span className="status-light"></span>
//             <span>AI FORENSIC ENGINE</span>
//             <b>ONLINE</b>
//           </div>

//           <div className="eyebrow">
//             <span>01</span>
//             DIGITAL IMAGE INTELLIGENCE
//           </div>

//           <h1 className="hero-title">
//             See Beyond
//             <br />
//             <span>the Image.</span>
//           </h1>

//           <p className="hero-description">
//             MetaLens transforms ordinary digital images into forensic
//             intelligence. Extract hidden metadata, recover location
//             information, verify image integrity and uncover visual evidence
//             with AI-powered analysis.
//           </p>

//           <div className="hero-buttons">

//             {/* UPDATED: This button now navigates to /analyze */}
//             <button
//               className="primary-button"
//               onClick={goToAnalyze}  // ← CHANGED THIS
//             >
//               <span className="button-icon">⌁</span>
//               <span>START ANALYSIS</span>
//               <strong>→</strong>
//             </button>

//             <button
//               className="secondary-button"
//               onClick={() => scrollToSection("techniques")}
//             >
//               EXPLORE TECHNIQUES
//               <span>↓</span>
//             </button>

//           </div>

//           <div className="feature-grid">

//             <div className="feature">
//               <div className="feature-icon">⌬</div>
//               <div>
//                 <strong>18+</strong>
//                 <span>Forensic Techniques</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">◈</div>
//               <div>
//                 <strong>AI</strong>
//                 <span>Visual Intelligence</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">▤</div>
//               <div>
//                 <strong>PDF</strong>
//                 <span>Evidence Reports</span>
//               </div>
//             </div>

//           </div>

//         </div>

//         {/* RIGHT IMAGE */}

//         <div className="hero-visual">

//           <div className="visual-area">

//             <div className="orbit orbit-large"></div>
//             <div className="orbit orbit-small"></div>

//             <div className="forensic-frame">

//               <div className="frame-corner top-left"></div>
//               <div className="frame-corner top-right"></div>
//               <div className="frame-corner bottom-left"></div>
//               <div className="frame-corner bottom-right"></div>

//               <img
//                 src="/images/metalens-hero.png"
//                 alt="MetaLens forensic analysis"
//                 className="hero-image"
//               />

//               <div className="image-dark-overlay"></div>

//               <div className="image-grid-overlay"></div>

//               <div className="scan-line"></div>

//               <div className="hud-top">

//                 <span>IMAGE FORENSIC / LIVE FEED</span>

//                 <span className="live-status">
//                   <i></i>
//                   LIVE
//                 </span>

//               </div>

//               <div className="crosshair">
//                 <div className="cross-horizontal"></div>
//                 <div className="cross-vertical"></div>
//               </div>

//               <div className="analysis-corners">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>

//               <div className="hud-bottom">

//                 <span>ANALYSIS_READY</span>

//                 <strong>98.7%</strong>

//               </div>

//             </div>

//             <div className="intelligence-tag">
//               <span></span>
//               VISUAL INTELLIGENCE
//             </div>

//             <div className="metadata-card">

//               <div className="metadata-header">

//                 <div>
//                   <small>FORENSIC SCAN</small>
//                   <h3>Image Intelligence</h3>
//                 </div>

//                 <div className="verified-icon">✓</div>

//               </div>

//               <div className="metadata-divider"></div>

//               <div className="metadata-item">
//                 <span>Metadata</span>
//                 <strong className="cyan">EXIF FOUND</strong>
//               </div>

//               <div className="metadata-item">
//                 <span>Integrity</span>
//                 <strong className="green">VERIFIED</strong>
//               </div>

//               <div className="metadata-item">
//                 <span>AI Detection</span>
//                 <strong className="cyan">98.7%</strong>
//               </div>

//             </div>

//           </div>

//         </div>

//         <div className="hero-bottom-line">

//           <div>
//             <span>SYS://METALENS</span>
//             <i></i>
//             SECURE FORENSIC ENVIRONMENT
//           </div>

//           <button onClick={() => scrollToSection("analysis")}>
//             SCROLL TO EXPLORE
//             <span>↓</span>
//           </button>

//         </div>

//       </section>

//       {/* =====================================================
//           ANALYSIS
//       ===================================================== */}

//       <section className="content-section analysis-section" id="analysis">

//         <div className="section-heading">

//           <div className="section-number">02 / ANALYSIS</div>

//           <h2>
//             Turn Images Into
//             <span> Evidence.</span>
//           </h2>

//           <p>
//             A forensic analysis pipeline designed to inspect digital images
//             layer by layer and expose information that ordinary viewers miss.
//           </p>

//         </div>

//         <div className="analysis-grid">

//           <div className="analysis-card large-card">
//             <span className="card-number">01</span>
//             <div className="card-symbol">◉</div>
//             <h3>EXIF Extraction</h3>
//             <p>
//               Extract camera, timestamp, software and embedded metadata
//               hidden inside an image file.
//             </p>
//             <div className="card-status">METADATA_SCAN // READY</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">02</span>
//             <div className="card-symbol">⌖</div>
//             <h3>GPS Recovery</h3>
//             <p>
//               Identify available geographic coordinates and location
//               information embedded within image metadata.
//             </p>
//             <div className="card-status">LOCATION // DETECT</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">03</span>
//             <div className="card-symbol">◈</div>
//             <h3>AI Visual Analysis</h3>
//             <p>
//               Use AI-assisted visual intelligence to identify suspicious
//               patterns and potential manipulation.
//             </p>
//             <div className="card-status">AI_ENGINE // ONLINE</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">04</span>
//             <div className="card-symbol">#</div>
//             <h3>SHA-256 Hash</h3>
//             <p>
//               Generate a cryptographic fingerprint to help establish the
//               digital identity of the analyzed evidence.
//             </p>
//             <div className="card-status">HASH // VERIFIED</div>
//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           TECHNIQUES
//       ===================================================== */}

//       <section className="content-section techniques-section" id="techniques">

//         <div className="section-heading centered">

//           <div className="section-number">03 / TECHNIQUES</div>

//           <h2>
//             Forensic
//             <span> Techniques.</span>
//           </h2>

//           <p>
//             Multiple inspection layers working together to provide a
//             structured digital evidence profile.
//           </p>

//         </div>

//         <div className="technique-list">

//           {[
//             ["01", "EXIF METADATA", "Camera, device & software information"],
//             ["02", "GPS RECOVERY", "Embedded geographical coordinates"],
//             ["03", "PLATFORM DETECTION", "Identify image source platforms"],
//             ["04", "IMAGE INTEGRITY", "Inspect file consistency & structure"],
//             ["05", "AI VISUAL ANALYSIS", "AI-assisted image intelligence"],
//             ["06", "HASH FINGERPRINT", "SHA-256 evidence identification"],
//           ].map(([number, title, description]) => (

//             <div className="technique-row" key={number}>

//               <span className="technique-number">{number}</span>

//               <div className="technique-name">
//                 <h3>{title}</h3>
//                 <p>{description}</p>
//               </div>

//               <span className="technique-arrow">↗</span>

//             </div>

//           ))}

//         </div>

//       </section>

//       {/* =====================================================
//           REPORTS
//       ===================================================== */}

//       <section className="content-section reports-section" id="reports">

//         <div className="report-visual">

//           <div className="report-window">

//             <div className="report-topbar">
//               <span>METALENS_FORENSIC_REPORT.pdf</span>
//               <span>SECURE</span>
//             </div>

//             <div className="report-body">

//               <div className="report-logo">
//                 META<span>LENS</span>
//               </div>

//               <div className="report-line"></div>

//               <small>FORENSIC ANALYSIS REPORT</small>

//               <h3>Digital Evidence Summary</h3>

//               <div className="report-data">

//                 <div>
//                   <span>FILE STATUS</span>
//                   <strong>VERIFIED</strong>
//                 </div>

//                 <div>
//                   <span>EXIF</span>
//                   <strong>FOUND</strong>
//                 </div>

//                 <div>
//                   <span>AI SCORE</span>
//                   <strong>98.7%</strong>
//                 </div>

//                 <div>
//                   <span>HASH</span>
//                   <strong>SHA-256</strong>
//                 </div>

//               </div>

//               <div className="fake-report-lines">
//                 <i></i>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//               </div>

//               <div className="report-stamp">
//                 VERIFIED
//               </div>

//             </div>

//           </div>

//         </div>

//         <div className="report-content">

//           <div className="section-number">04 / REPORTS</div>

//           <h2>
//             Evidence
//             <span> Ready.</span>
//           </h2>

//           <p>
//             Convert your analysis into a structured forensic report that
//             can be reviewed, stored and shared as digital evidence.
//           </p>

//           <div className="report-features">

//             <div>
//               <b>✓</b>
//               Evidence summary
//             </div>

//             <div>
//               <b>✓</b>
//               Metadata findings
//             </div>

//             <div>
//               <b>✓</b>
//               AI analysis results
//             </div>

//             <div>
//               <b>✓</b>
//               SHA-256 fingerprint
//             </div>

//           </div>

//           <button
//             className="report-button"
//             onClick={() => scrollToSection("about")}
//           >
//             EXPLORE REPORTING
//             <span>→</span>
//           </button>

//         </div>

//       </section>

//       {/* =====================================================
//           ABOUT
//       ===================================================== */}

//       <section className="content-section about-section" id="about">

//         <div className="about-number">05</div>

//         <div className="about-content">

//           <div className="section-number">ABOUT METALENS</div>

//           <h2>
//             Look Deeper.
//             <br />
//             <span>Find More.</span>
//           </h2>

//           <p>
//             MetaLens is an AI-powered digital image forensic platform built
//             to help investigators, analysts and security professionals
//             inspect digital images beyond what is visible to the human eye.
//           </p>

//           <div className="about-stats">

//             <div>
//               <strong>18+</strong>
//               <span>TECHNIQUES</span>
//             </div>

//             <div>
//               <strong>AI</strong>
//               <span>INTELLIGENCE</span>
//             </div>

//             <div>
//               <strong>SHA</strong>
//               <span>FINGERPRINT</span>
//             </div>

//           </div>

//         </div>

//         <div className="about-terminal">

//           <div className="terminal-header">
//             <span>METALENS // SYSTEM</span>
//             <i>●</i>
//           </div>

//           <div className="terminal-body">

//             <p>
//               <span>&gt;</span> initialize forensic_engine
//             </p>

//             <p>
//               <span>&gt;</span> loading image_intelligence...
//             </p>

//             <p className="success">
//               <span>&gt;</span> engine_status: ONLINE
//             </p>

//             <p>
//               <span>&gt;</span> evidence_pipeline: READY
//             </p>

//             <p className="cursor-line">
//               <span>&gt;</span> _
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           FINAL CTA
//       ===================================================== */}

//       <section className="final-section">

//         <div className="final-grid"></div>

//         <div className="final-content">

//           <div className="section-number">06 / READY</div>

//           <h2>
//             Investigate
//             <br />
//             <span>What Others Can't See.</span>
//           </h2>

//           <p>
//             Upload an image. Start the investigation.
//           </p>

//           {/* UPDATED: This button now navigates to /analyze */}
//           <button
//             className="final-button"
//             onClick={goToAnalyze}  // ← CHANGED THIS
//           >
//             OPEN METALENS
//             <span>↗</span>
//           </button>

//         </div>

//       </section>

//       {/* FOOTER */}

//       <footer className="footer">

//         <div>
//           META<span>LENS</span>
//         </div>

//         <p>
//           DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE
//         </p>

//         <small>© 2026 METALENS</small>

//       </footer>

//     </div>
//   );
// };

// export default HomePage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./HomePage.css";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("home");

//   useEffect(() => {
//     const sections = document.querySelectorAll("section[id]");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((entry) => entry.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

//         if (visible.length > 0) {
//           setActiveSection(visible[0].target.id);
//         }
//       },
//       {
//         rootMargin: "-25% 0px -60% 0px",
//         threshold: [0.1, 0.3, 0.5],
//       }
//     );

//     sections.forEach((section) => observer.observe(section));

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (id) => {
//     document.getElementById(id)?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const goToAnalyze = () => {
//     navigate('/analyze');
//   };

//   // ============================================================
//   //  TECHNIQUE ARROW CLICK - Navigate to relevant pages
//   // ============================================================
//   const handleTechniqueClick = (technique) => {
//     // Navigate to analyze page with technique param
//     navigate('/analyze', { state: { technique } });
//   };

//   return (
//     <div className="metalens-page">

//       {/* ================= BACKGROUND ================= */}

//       <div className="background-grid"></div>

//       <div className="background-glow glow-blue"></div>
//       <div className="background-glow glow-cyan"></div>
//       <div className="background-glow glow-purple"></div>

//       {/* ================= NAVBAR ================= */}

//       <header className="navbar">

//         <button
//           className="brand"
//           onClick={() => scrollToSection("home")}
//           aria-label="Go to home"
//         >
//           <div className="brand-logo">
//             <div className="logo-ring"></div>
//             <div className="logo-eye">
//               <span></span>
//             </div>
//             <div className="logo-scan"></div>
//           </div>

//           <div className="brand-text">
//             <strong>META<span>LENS</span></strong>
//             <small>DIGITAL FORENSICS</small>
//           </div>
//         </button>

//         <nav className="nav-links">

//           {[
//             ["home", "Home"],
//             ["analysis", "Analysis"],
//             ["techniques", "Techniques"],
//             ["reports", "Reports"],
//             ["about", "About"],
//           ].map(([id, label]) => (
//             <button
//               key={id}
//               className={`nav-link ${activeSection === id ? "active" : ""}`}
//               onClick={() => scrollToSection(id)}
//             >
//               {label}
//             </button>
//           ))}

//         </nav>

//         <button
//           className="nav-cta"
//           onClick={goToAnalyze}
//         >
//           <span>OPEN ANALYZER</span>
//           <b>↗</b>
//         </button>

//       </header>

//       {/* =====================================================
//           HOME / HERO
//       ===================================================== */}

//       <section className="hero-section" id="home">

//         <div className="hero-content">

//           <div className="system-status">
//             <span className="status-light"></span>
//             <span>AI FORENSIC ENGINE</span>
//             <b>ONLINE</b>
//           </div>

//           <div className="eyebrow">
//             <span>01</span>
//             DIGITAL IMAGE INTELLIGENCE
//           </div>

//           <h1 className="hero-title">
//             See Beyond
//             <br />
//             <span>the Image.</span>
//           </h1>

//           <p className="hero-description">
//             MetaLens transforms ordinary digital images into forensic
//             intelligence. Extract hidden metadata, recover location
//             information, verify image integrity and uncover visual evidence
//             with AI-powered analysis.
//           </p>

//           <div className="hero-buttons">

//             <button
//               className="primary-button"
//               onClick={goToAnalyze}
//             >
//               <span className="button-icon">⌁</span>
//               <span>START ANALYSIS</span>
//               <strong>→</strong>
//             </button>

//             <button
//               className="secondary-button"
//               onClick={() => scrollToSection("techniques")}
//             >
//               EXPLORE TECHNIQUES
//               <span>↓</span>
//             </button>

//           </div>

//           <div className="feature-grid">

//             <div className="feature">
//               <div className="feature-icon">⌬</div>
//               <div>
//                 <strong>18+</strong>
//                 <span>Forensic Techniques</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">◈</div>
//               <div>
//                 <strong>AI</strong>
//                 <span>Visual Intelligence</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon">▤</div>
//               <div>
//                 <strong>PDF</strong>
//                 <span>Evidence Reports</span>
//               </div>
//             </div>

//           </div>

//         </div>

//         {/* RIGHT IMAGE */}

//         <div className="hero-visual">

//           <div className="visual-area">

//             <div className="orbit orbit-large"></div>
//             <div className="orbit orbit-small"></div>

//             <div className="forensic-frame">

//               <div className="frame-corner top-left"></div>
//               <div className="frame-corner top-right"></div>
//               <div className="frame-corner bottom-left"></div>
//               <div className="frame-corner bottom-right"></div>

//               <img
//                 src="/images/metalens-hero.png"
//                 alt="MetaLens forensic analysis"
//                 className="hero-image"
//               />

//               <div className="image-dark-overlay"></div>

//               <div className="image-grid-overlay"></div>

//               <div className="scan-line"></div>

//               <div className="hud-top">

//                 <span>IMAGE FORENSIC / LIVE FEED</span>

//                 <span className="live-status">
//                   <i></i>
//                   LIVE
//                 </span>

//               </div>

//               <div className="crosshair">
//                 <div className="cross-horizontal"></div>
//                 <div className="cross-vertical"></div>
//               </div>

//               <div className="analysis-corners">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>

//               <div className="hud-bottom">

//                 <span>ANALYSIS_READY</span>

//                 <strong>98.7%</strong>

//               </div>

//             </div>

//             <div className="intelligence-tag">
//               <span></span>
//               VISUAL INTELLIGENCE
//             </div>

//             <div className="metadata-card">

//               <div className="metadata-header">

//                 <div>
//                   <small>FORENSIC SCAN</small>
//                   <h3>Image Intelligence</h3>
//                 </div>

//                 <div className="verified-icon">✓</div>

//               </div>

//               <div className="metadata-divider"></div>

//               <div className="metadata-item">
//                 <span>Metadata</span>
//                 <strong className="cyan">EXIF FOUND</strong>
//               </div>

//               <div className="metadata-item">
//                 <span>Integrity</span>
//                 <strong className="green">VERIFIED</strong>
//               </div>

//               <div className="metadata-item">
//                 <span>AI Detection</span>
//                 <strong className="cyan">98.7%</strong>
//               </div>

//             </div>

//           </div>

//         </div>

//         <div className="hero-bottom-line">

//           <div>
//             <span>SYS://METALENS</span>
//             <i></i>
//             SECURE FORENSIC ENVIRONMENT
//           </div>

//           <button onClick={() => scrollToSection("analysis")}>
//             SCROLL TO EXPLORE
//             <span>↓</span>
//           </button>

//         </div>

//       </section>

//       {/* =====================================================
//           ANALYSIS SECTION
//       ===================================================== */}

//       <section className="content-section analysis-section" id="analysis">

//         <div className="section-heading">

//           <div className="section-number">02 / ANALYSIS</div>

//           <h2>
//             Turn Images Into
//             <span> Evidence.</span>
//           </h2>

//           <p>
//             A forensic analysis pipeline designed to inspect digital images
//             layer by layer and expose information that ordinary viewers miss.
//           </p>

//         </div>

//         <div className="analysis-grid">

//           <div className="analysis-card large-card">
//             <span className="card-number">01</span>
//             <div className="card-symbol">◉</div>
//             <h3>EXIF Extraction</h3>
//             <p>
//               Extract camera, timestamp, software and embedded metadata
//               hidden inside an image file.
//             </p>
//             <div className="card-status">METADATA_SCAN // READY</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">02</span>
//             <div className="card-symbol">⌖</div>
//             <h3>GPS Recovery</h3>
//             <p>
//               Identify available geographic coordinates and location
//               information embedded within image metadata.
//             </p>
//             <div className="card-status">LOCATION // DETECT</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">03</span>
//             <div className="card-symbol">◈</div>
//             <h3>AI Visual Analysis</h3>
//             <p>
//               Use AI-assisted visual intelligence to identify suspicious
//               patterns and potential manipulation.
//             </p>
//             <div className="card-status">AI_ENGINE // ONLINE</div>
//           </div>

//           <div className="analysis-card">
//             <span className="card-number">04</span>
//             <div className="card-symbol">#</div>
//             <h3>SHA-256 Hash</h3>
//             <p>
//               Generate a cryptographic fingerprint to help establish the
//               digital identity of the analyzed evidence.
//             </p>
//             <div className="card-status">HASH // VERIFIED</div>
//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           TECHNIQUES SECTION
//       ===================================================== */}

//       <section className="content-section techniques-section" id="techniques">

//         <div className="section-heading centered">

//           <div className="section-number">03 / TECHNIQUES</div>

//           <h2>
//             Forensic
//             <span> Techniques.</span>
//           </h2>

//           <p>
//             Multiple inspection layers working together to provide a
//             structured digital evidence profile.
//           </p>

//         </div>

//         <div className="technique-list">

//           {[
//             { number: "01", title: "EXIF METADATA", description: "Camera, device & software information", path: "exif" },
//             { number: "02", title: "GPS RECOVERY", description: "Embedded geographical coordinates", path: "gps" },
//             { number: "03", title: "PLATFORM DETECTION", description: "Identify image source platforms", path: "platform" },
//             { number: "04", title: "IMAGE INTEGRITY", description: "Inspect file consistency & structure", path: "integrity" },
//             { number: "05", title: "AI VISUAL ANALYSIS", description: "AI-assisted image intelligence", path: "ai" },
//             { number: "06", title: "HASH FINGERPRINT", description: "SHA-256 evidence identification", path: "hash" },
//           ].map((technique) => (

//             <div className="technique-row" key={technique.number}>
//               <span className="technique-number">{technique.number}</span>
//               <div className="technique-name">
//                 <h3>{technique.title}</h3>
//                 <p>{technique.description}</p>
//               </div>
//               <button
//                 className="technique-arrow"
//                 onClick={() => handleTechniqueClick(technique.path)}
//                 aria-label={`Learn about ${technique.title}`}
//               >
//                 ↗
//               </button>
//             </div>

//           ))}

//         </div>

//       </section>

//       {/* =====================================================
//           REPORTS SECTION
//       ===================================================== */}

//       <section className="content-section reports-section" id="reports">

//         <div className="report-visual">

//           <div className="report-window">

//             <div className="report-topbar">
//               <span>METALENS_FORENSIC_REPORT.pdf</span>
//               <span>SECURE</span>
//             </div>

//             <div className="report-body">

//               <div className="report-logo">
//                 META<span>LENS</span>
//               </div>

//               <div className="report-line"></div>

//               <small>FORENSIC ANALYSIS REPORT</small>

//               <h3>Digital Evidence Summary</h3>

//               <div className="report-data">

//                 <div>
//                   <span>FILE STATUS</span>
//                   <strong>VERIFIED</strong>
//                 </div>

//                 <div>
//                   <span>EXIF</span>
//                   <strong>FOUND</strong>
//                 </div>

//                 <div>
//                   <span>AI SCORE</span>
//                   <strong>98.7%</strong>
//                 </div>

//                 <div>
//                   <span>HASH</span>
//                   <strong>SHA-256</strong>
//                 </div>

//               </div>

//               <div className="fake-report-lines">
//                 <i></i>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//               </div>

//               <div className="report-stamp">
//                 VERIFIED
//               </div>

//             </div>

//           </div>

//         </div>

//         <div className="report-content">

//           <div className="section-number">04 / REPORTS</div>

//           <h2>
//             Evidence
//             <span> Ready.</span>
//           </h2>

//           <p>
//             Convert your analysis into a structured forensic report that
//             can be reviewed, stored and shared as digital evidence.
//           </p>

//           <div className="report-features">

//             <div>
//               <b>✓</b>
//               Evidence summary
//             </div>

//             <div>
//               <b>✓</b>
//               Metadata findings
//             </div>

//             <div>
//               <b>✓</b>
//               AI analysis results
//             </div>

//             <div>
//               <b>✓</b>
//               SHA-256 fingerprint
//             </div>

//           </div>

//           <button
//             className="report-button"
//             onClick={() => scrollToSection("about")}
//           >
//             EXPLORE REPORTING
//             <span>→</span>
//           </button>

//         </div>

//       </section>

//       {/* =====================================================
//           ABOUT SECTION
//       ===================================================== */}

//       <section className="content-section about-section" id="about">

//         <div className="about-number">05</div>

//         <div className="about-content">

//           <div className="section-number">ABOUT METALENS</div>

//           <h2>
//             Look Deeper.
//             <br />
//             <span>Find More.</span>
//           </h2>

//           <p>
//             MetaLens is an AI-powered digital image forensic platform built
//             to help investigators, analysts and security professionals
//             inspect digital images beyond what is visible to the human eye.
//           </p>

//           <div className="about-stats">

//             <div>
//               <strong>18+</strong>
//               <span>TECHNIQUES</span>
//             </div>

//             <div>
//               <strong>AI</strong>
//               <span>INTELLIGENCE</span>
//             </div>

//             <div>
//               <strong>SHA</strong>
//               <span>FINGERPRINT</span>
//             </div>

//           </div>

//         </div>

//         <div className="about-terminal">

//           <div className="terminal-header">
//             <span>METALENS // SYSTEM</span>
//             <i>●</i>
//           </div>

//           <div className="terminal-body">

//             <p>
//               <span>&gt;</span> initialize forensic_engine
//             </p>

//             <p>
//               <span>&gt;</span> loading image_intelligence...
//             </p>

//             <p className="success">
//               <span>&gt;</span> engine_status: ONLINE
//             </p>

//             <p>
//               <span>&gt;</span> evidence_pipeline: READY
//             </p>

//             <p className="cursor-line">
//               <span>&gt;</span> _
//             </p>

//           </div>

//         </div>

//       </section>

//       {/* =====================================================
//           FINAL CTA
//       ===================================================== */}

//       <section className="final-section">

//         <div className="final-grid"></div>

//         <div className="final-content">

//           <div className="section-number">06 / READY</div>

//           <h2>
//             Investigate
//             <br />
//             <span>What Others Can't See.</span>
//           </h2>

//           <p>
//             Upload an image. Start the investigation.
//           </p>

//           <button
//             className="final-button"
//             onClick={goToAnalyze}
//           >
//             OPEN METALENS
//             <span>↗</span>
//           </button>

//         </div>

//       </section>

//       {/* FOOTER */}

//       <footer className="footer">

//         <div>
//           META<span>LENS</span>
//         </div>

//         <p>
//           DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE
//         </p>

//         <small>© 2026 METALENS</small>

//       </footer>

//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import TechniqueDetail from "../components/TechniqueDetail";
import { useAuth } from "../context/AuthContext";




const HomePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const { user ,logout } = useAuth();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // const goToAnalyze = () => {
  //   navigate("/analyze");
  // };

  const goToAnalyze = () => {
    if (user) {
      navigate("/analyze");
    } else {
      navigate("/signup");
    }
  };
  // ============================================================
  //  TECHNIQUE ARROW CLICK - Open Modal
  // ============================================================
  const handleTechniqueClick = (technique) => {
    setSelectedTechnique(technique);
  };

  const closeTechniqueModal = () => {
    setSelectedTechnique(null);
  };

  return (
    <div className="metalens-page">
      {/* ================= BACKGROUND ================= */}

      <div className="background-grid"></div>

      <div className="background-glow glow-blue"></div>
      <div className="background-glow glow-cyan"></div>
      <div className="background-glow glow-purple"></div>

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <button
          className="brand"
          onClick={() => scrollToSection("home")}
          aria-label="Go to home"
        >
          <div className="brand-logo">
            <div className="logo-ring"></div>
            <div className="logo-eye">
              <span></span>
            </div>
            <div className="logo-scan"></div>
          </div>

          <div className="brand-text">
            <strong>
              META<span>LENS</span>
            </strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </button>

        <nav className="nav-links">
          {[
            ["home", "Home"],
            ["analysis", "Analysis"],
            ["techniques", "Techniques"],
            ["reports", "Reports"],
            ["about", "About"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`nav-link ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          {user ? (
            <>
              {/* <span className="nav-user-email">👤 {user.email}</span> */}
              <span className="nav-user-email">👤 {user.name || user.email}</span>
              <button
                className="nav-signin"
                onClick={() => navigate("/analyze")}
              >
                START ANALYSIS
              </button>
              <button
                className="nav-signin nav-logout"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button className="nav-signin" onClick={() => navigate("/login")}>
                LOGIN
              </button>
              <button className="nav-cta" onClick={() => navigate("/signup")}>
                <span>CREATE ACCOUNT</span>
                <b>↗</b>
              </button>
            </>
          )}
        </div>
      </header>

      {/* =====================================================
          HOME / HERO
      ===================================================== */}

      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="system-status">
            <span className="status-light"></span>
            <span>AI FORENSIC ENGINE</span>
            <b>ONLINE</b>
          </div>

          <div className="eyebrow">
            <span>01</span>
            DIGITAL IMAGE INTELLIGENCE
          </div>

          <h1 className="hero-title">
            See Beyond
            <br />
            <span>the Image.</span>
          </h1>

          <p className="hero-description">
            MetaLens transforms ordinary digital images into forensic
            intelligence. Extract hidden metadata, recover location information,
            verify image integrity and uncover visual evidence with AI-powered
            analysis.
          </p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={goToAnalyze}>
              <span className="button-icon">⌁</span>
              <span>START ANALYSIS</span>
              <strong>→</strong>
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollToSection("techniques")}
            >
              EXPLORE TECHNIQUES
              <span>↓</span>
            </button>
          </div>

          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">⌬</div>
              <div>
                <strong>18+</strong>
                <span>Forensic Techniques</span>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">◈</div>
              <div>
                <strong>AI</strong>
                <span>Visual Intelligence</span>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">▤</div>
              <div>
                <strong>PDF</strong>
                <span>Evidence Reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div className="hero-visual">
          <div className="visual-area">
            <div className="orbit orbit-large"></div>
            <div className="orbit orbit-small"></div>

            <div className="forensic-frame">
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>

              <img
                src="/images/metalens-hero.png"
                alt="MetaLens forensic analysis"
                className="hero-image"
              />

              <div className="image-dark-overlay"></div>

              <div className="image-grid-overlay"></div>

              <div className="scan-line"></div>

              <div className="hud-top">
                <span>IMAGE FORENSIC / LIVE FEED</span>

                <span className="live-status">
                  <i></i>
                  LIVE
                </span>
              </div>

              <div className="crosshair">
                <div className="cross-horizontal"></div>
                <div className="cross-vertical"></div>
              </div>

              <div className="analysis-corners">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hud-bottom">
                <span>ANALYSIS_READY</span>

                <strong>98.7%</strong>
              </div>
            </div>

            <div className="intelligence-tag">
              <span></span>
              VISUAL INTELLIGENCE
            </div>

            <div className="metadata-card">
              <div className="metadata-header">
                <div>
                  <small>FORENSIC SCAN</small>
                  <h3>Image Intelligence</h3>
                </div>

                <div className="verified-icon">✓</div>
              </div>

              <div className="metadata-divider"></div>

              <div className="metadata-item">
                <span>Metadata</span>
                <strong className="cyan">EXIF FOUND</strong>
              </div>

              <div className="metadata-item">
                <span>Integrity</span>
                <strong className="green">VERIFIED</strong>
              </div>

              <div className="metadata-item">
                <span>AI Detection</span>
                <strong className="cyan">98.7%</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-line">
          <div>
            <span>SYS://METALENS</span>
            <i></i>
            SECURE FORENSIC ENVIRONMENT
          </div>

          <button onClick={() => scrollToSection("analysis")}>
            SCROLL TO EXPLORE
            <span>↓</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          ANALYSIS SECTION
      ===================================================== */}

      <section className="content-section analysis-section" id="analysis">
        <div className="section-heading">
          <div className="section-number">02 / ANALYSIS</div>

          <h2>
            Turn Images Into
            <span> Evidence.</span>
          </h2>

          <p>
            A forensic analysis pipeline designed to inspect digital images
            layer by layer and expose information that ordinary viewers miss.
          </p>
        </div>

        <div className="analysis-grid">
          <div className="analysis-card large-card">
            <span className="card-number">01</span>
            <div className="card-symbol">◉</div>
            <h3>EXIF Extraction</h3>
            <p>
              Extract camera, timestamp, software and embedded metadata hidden
              inside an image file.
            </p>
            <div className="card-status">METADATA_SCAN // READY</div>
          </div>

          <div className="analysis-card">
            <span className="card-number">02</span>
            <div className="card-symbol">⌖</div>
            <h3>GPS Recovery</h3>
            <p>
              Identify available geographic coordinates and location information
              embedded within image metadata.
            </p>
            <div className="card-status">LOCATION // DETECT</div>
          </div>

          <div className="analysis-card">
            <span className="card-number">03</span>
            <div className="card-symbol">◈</div>
            <h3>AI Visual Analysis</h3>
            <p>
              Use AI-assisted visual intelligence to identify suspicious
              patterns and potential manipulation.
            </p>
            <div className="card-status">AI_ENGINE // ONLINE</div>
          </div>

          <div className="analysis-card">
            <span className="card-number">04</span>
            <div className="card-symbol">#</div>
            <h3>SHA-256 Hash</h3>
            <p>
              Generate a cryptographic fingerprint to help establish the digital
              identity of the analyzed evidence.
            </p>
            <div className="card-status">HASH // VERIFIED</div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNIQUES SECTION
      ===================================================== */}

      <section className="content-section techniques-section" id="techniques">
        <div className="section-heading centered">
          <div className="section-number">03 / TECHNIQUES</div>

          <h2>
            Forensic
            <span> Techniques.</span>
          </h2>

          <p>
            Multiple inspection layers working together to provide a structured
            digital evidence profile.
          </p>
        </div>

        <div className="technique-list">
          {[
            {
              number: "01",
              title: "EXIF METADATA",
              description: "Camera, device & software information",
              path: "exif",
            },
            {
              number: "02",
              title: "GPS RECOVERY",
              description: "Embedded geographical coordinates",
              path: "gps",
            },
            {
              number: "03",
              title: "PLATFORM DETECTION",
              description: "Identify image source platforms",
              path: "platform",
            },
            {
              number: "04",
              title: "IMAGE INTEGRITY",
              description: "Inspect file consistency & structure",
              path: "integrity",
            },
            {
              number: "05",
              title: "AI VISUAL ANALYSIS",
              description: "AI-assisted image intelligence",
              path: "ai",
            },
            {
              number: "06",
              title: "HASH FINGERPRINT",
              description: "SHA-256 evidence identification",
              path: "hash",
            },
          ].map((technique) => (
            <div className="technique-row" key={technique.number}>
              <span className="technique-number">{technique.number}</span>
              <div className="technique-name">
                <h3>{technique.title}</h3>
                <p>{technique.description}</p>
              </div>
              <button
                className="technique-arrow"
                onClick={() => handleTechniqueClick(technique.path)}
                aria-label={`Learn about ${technique.title}`}
              >
                ↗
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          REPORTS SECTION
      ===================================================== */}

      <section className="content-section reports-section" id="reports">
        <div className="report-visual">
          <div className="report-window">
            <div className="report-topbar">
              <span>METALENS_FORENSIC_REPORT.pdf</span>
              <span>SECURE</span>
            </div>

            <div className="report-body">
              <div className="report-logo">
                META<span>LENS</span>
              </div>

              <div className="report-line"></div>

              <small>FORENSIC ANALYSIS REPORT</small>

              <h3>Digital Evidence Summary</h3>

              <div className="report-data">
                <div>
                  <span>FILE STATUS</span>
                  <strong>VERIFIED</strong>
                </div>

                <div>
                  <span>EXIF</span>
                  <strong>FOUND</strong>
                </div>

                <div>
                  <span>AI SCORE</span>
                  <strong>98.7%</strong>
                </div>

                <div>
                  <span>HASH</span>
                  <strong>SHA-256</strong>
                </div>
              </div>

              <div className="fake-report-lines">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div className="report-stamp">VERIFIED</div>
            </div>
          </div>
        </div>

        <div className="report-content">
          <div className="section-number">04 / REPORTS</div>

          <h2>
            Evidence
            <span> Ready.</span>
          </h2>

          <p>
            Convert your analysis into a structured forensic report that can be
            reviewed, stored and shared as digital evidence.
          </p>

          <div className="report-features">
            <div>
              <b>✓</b>
              Evidence summary
            </div>

            <div>
              <b>✓</b>
              Metadata findings
            </div>

            <div>
              <b>✓</b>
              AI analysis results
            </div>

            <div>
              <b>✓</b>
              SHA-256 fingerprint
            </div>
          </div>

          <button
            className="report-button"
            onClick={() => scrollToSection("about")}
          >
            EXPLORE REPORTING
            <span>→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}

      <section className="content-section about-section" id="about">
        <div className="about-number">05</div>

        <div className="about-content">
          <div className="section-number">ABOUT METALENS</div>

          <h2>
            Look Deeper.
            <br />
            <span>Find More.</span>
          </h2>

          <p>
            MetaLens is an AI-powered digital image forensic platform built to
            help investigators, analysts and security professionals inspect
            digital images beyond what is visible to the human eye.
          </p>

          <div className="about-stats">
            <div>
              <strong>18+</strong>
              <span>TECHNIQUES</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>INTELLIGENCE</span>
            </div>

            <div>
              <strong>SHA</strong>
              <span>FINGERPRINT</span>
            </div>
          </div>
        </div>

        <div className="about-terminal">
          <div className="terminal-header">
            <span>METALENS // SYSTEM</span>
            <i>●</i>
          </div>

          <div className="terminal-body">
            <p>
              <span>&gt;</span> initialize forensic_engine
            </p>

            <p>
              <span>&gt;</span> loading image_intelligence...
            </p>

            <p className="success">
              <span>&gt;</span> engine_status: ONLINE
            </p>

            <p>
              <span>&gt;</span> evidence_pipeline: READY
            </p>

            <p className="cursor-line">
              <span>&gt;</span> _
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-section">
        <div className="final-grid"></div>

        <div className="final-content">
          <div className="section-number">06 / READY</div>

          <h2>
            Investigate
            <br />
            <span>What Others Can't See.</span>
          </h2>

          <p>Upload an image. Start the investigation.</p>

          <button className="final-button" onClick={goToAnalyze}>
            OPEN METALENS
            <span>↗</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div>
          META<span>LENS</span>
        </div>

        <p>DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE</p>

        <small>© 2026 METALENS</small>
      </footer>

      {/* =====================================================
          TECHNIQUE DETAIL MODAL
      ===================================================== */}

      {selectedTechnique && (
        <TechniqueDetail
          technique={selectedTechnique}
          onClose={closeTechniqueModal}
        />
      )}
    </div>
  );
};

export default HomePage;
