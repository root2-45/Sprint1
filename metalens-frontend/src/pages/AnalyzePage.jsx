// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UploadZone from '../components/UploadZone';
// import Results from '../components/Results';
// import './AnalyzePage.css';

// const AnalyzePage = () => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileUpload = async (file) => {
//     setFile(file);
//     setPreview(URL.createObjectURL(file));
//     setLoading(true);
//     setError(null);
//     setResults(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/analyze', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 120000,
//       });

//       if (response.data.error) {
//         setError(response.data.error);
//       } else {
//         setResults(response.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Analysis failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFile(null);
//     setPreview(null);
//     setResults(null);
//     setError(null);
//   };

//   return (
//     <div className="analyze-container">
//       <nav className="analyze-nav">
//         <div className="logo" onClick={() => navigate('/')}>◉ MetaLens</div>
//         <button className="btn-back" onClick={() => navigate('/')}>
//           ← Back to Home
//         </button>
//       </nav>

//       <main className="analyze-main">
//         {!results && !loading && (
//           <>
//             <h1>🔍 Analyze Image</h1>
//             <p className="analyze-subtitle">
//               Upload an image to start forensic analysis
//             </p>
//             <UploadZone
//               onFileUpload={handleFileUpload}
//               preview={preview}
//               error={error}
//             />
//           </>
//         )}

//         {loading && (
//           <div className="loading-container">
//             <div className="spinner"></div>
//             <p>Analyzing image with all forensic techniques...</p>
//           </div>
//         )}

//         {results && (
//           <Results
//             results={results}
//             file={file}
//             onReset={handleReset}
//           />
//         )}
//       </main>

//       <footer className="analyze-footer">
//         <p>MetaLens v2.0 • Built with React + Flask + ExifTool + Ollama</p>
//       </footer>
//     </div>
//   );
// };

// export default AnalyzePage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UploadZone from '../components/UploadZone';
// import Results from '../components/Results';
// import './AnalyzePage.css';

// const AnalyzePage = () => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileUpload = async (file) => {
//     setFile(file);
//     setPreview(URL.createObjectURL(file));
//     setLoading(true);
//     setError(null);
//     setResults(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/analyze', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 120000,
//       });

//       if (response.data.error) {
//         setError(response.data.error);
//       } else {
//         setResults(response.data);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Analysis failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFile(null);
//     setPreview(null);
//     setResults(null);
//     setError(null);
//   };

//   // ============================================================
//   //  GENERATE EVIDENCE HASH (SHA-256)
//   // ============================================================
//   const generateHash = async (file) => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     try {
//       const buffer = await file.arrayBuffer();
//       const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//       return hashHex;
//     } catch (err) {
//       throw new Error('Failed to generate hash: ' + err.message);
//     }
//   };

//   // ============================================================
//   //  SHARE REPORT - Export as JSON
//   // ============================================================
//   const shareReport = (results) => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     const jsonStr = JSON.stringify(results, null, 2);
//     const blob = new Blob([jsonStr], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `forensic_report_${Date.now()}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   // ============================================================
//   //  EXPORT PDF REPORT
//   // ============================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   return (
//     <div className="analyze-page">

//       {/* Background Glows */}
//       <div className="analyze-background-grid"></div>
//       <div className="analyze-glow glow-blue"></div>
//       <div className="analyze-glow glow-cyan"></div>
//       <div className="analyze-glow glow-purple"></div>

//       {/* NAVBAR */}
//       <nav className="analyze-navbar">
//         <button className="analyze-brand" onClick={() => navigate('/')}>
//           <div className="analyze-brand-logo">
//             <div className="analyze-logo-ring"></div>
//             <div className="analyze-logo-eye"><span></span></div>
//             <div className="analyze-logo-scan"></div>
//           </div>
//           <div className="analyze-brand-text">
//             <strong>META<span>LENS</span></strong>
//             <small>DIGITAL FORENSICS</small>
//           </div>
//         </button>

//         <button className="analyze-back-btn" onClick={() => navigate('/')}>
//           <span>←</span> BACK TO HOME
//         </button>
//       </nav>

//       {/* MAIN CONTENT */}
//       <main className="analyze-main-content">

//         {!results && !loading && (
//           <>
//             {/* Header */}
//             <div className="analyze-header">
//               <div className="analyze-section-number">02 / ANALYSIS</div>
//               <h1 className="analyze-title">
//                 Forensic Image <span>Analysis</span>
//               </h1>
//               <p className="analyze-description">
//                 Upload an image to begin the forensic investigation.
//                 MetaLens will analyze metadata, detect tampering,
//                 and generate a comprehensive evidence report.
//               </p>
//             </div>

//             <UploadZone
//               onFileUpload={handleFileUpload}
//               preview={preview}
//               error={error}
//             />
//           </>
//         )}

//         {loading && (
//           <div className="analyze-loading">
//             <div className="analyze-loading-frame">
//               <div className="analyze-loading-corners">
//                 <span></span><span></span><span></span><span></span>
//               </div>
//               <div className="analyze-loading-scan"></div>
//               <div className="analyze-loading-content">
//                 <div className="analyze-loading-spinner"></div>
//                 <h3>FORENSIC SCAN IN PROGRESS</h3>
//                 <p>Analyzing image with 18+ forensic techniques...</p>
//                 <div className="analyze-loading-status">
//                   <span>●</span> METADATA EXTRACTION
//                   <span>●</span> GPS RECOVERY
//                   <span>●</span> AI ANALYSIS
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {results && (
//           <Results
//             results={results}
//             file={file}
//             onReset={handleReset}
//             onExportPDF={handleExportPDF}
//             onGenerateHash={generateHash}
//             onShareReport={shareReport}
//           />
//         )}
//       </main>

//       {/* FOOTER */}
//       <footer className="analyze-footer">
//         <div>META<span>LENS</span></div>
//         <p>DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE</p>
//         <small>© 2026 METALENS</small>
//       </footer>
//     </div>
//   );
// };

// export default AnalyzePage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadZone from "../components/UploadZone";
import Results from "../components/Results";
import { useAuth } from "../context/AuthContext";
import "./AnalyzePage.css";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // ============================================================
  //  Logout
  // ============================================================
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ============================================================
  //  Upload + analyze
  // ============================================================
  const handleFileUpload = async (file) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResults(response.data.report);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Analysis failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="analyze-page">
      {/* Background Glows */}
      <div className="analyze-background-grid"></div>
      <div className="analyze-glow glow-blue"></div>
      <div className="analyze-glow glow-cyan"></div>
      <div className="analyze-glow glow-purple"></div>

      {/* NAVBAR */}
      <nav className="analyze-navbar">
        {/* Left: brand */}
        <button className="analyze-brand" onClick={() => navigate("/")}>
          <div className="analyze-brand-logo">
            <div className="analyze-logo-ring"></div>
            <div className="analyze-logo-eye">
              <span></span>
            </div>
            <div className="analyze-logo-scan"></div>
          </div>
          <div className="analyze-brand-text">
            <strong>
              META<span>LENS</span>
            </strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </button>

        {/* Right: actions */}
        <div className="analyze-navbar-right">
          <button className="analyze-back-btn" onClick={() => navigate("/")}>
            🏠 HOME
          </button>
          <button
            className="analyze-back-btn"
            onClick={() => navigate("/history")}
          >
            📜 HISTORY
          </button>
          {/* <span className="analyze-user-email">👤 {user?.email}</span> */}
          <span className="analyze-user-email">👤 {user?.name || user?.email}</span>
          <button
            className="analyze-back-btn logout-btn"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="analyze-main-content">
        {!results && !loading && (
          <>
            {/* Header */}
            <div className="analyze-header">
              <div className="analyze-section-number">02 / ANALYSIS</div>
              <h1 className="analyze-title">
                Forensic Image <span>Analysis</span>
              </h1>
              <p className="analyze-description">
                Upload an image to begin the forensic investigation. MetaLens
                will analyze metadata, detect tampering, and generate a
                comprehensive evidence report.
              </p>
            </div>

            <UploadZone
              onFileUpload={handleFileUpload}
              preview={preview}
              error={error}
            />
          </>
        )}

        {loading && (
          <div className="analyze-loading">
            <div className="analyze-loading-frame">
              <div className="analyze-loading-corners">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="analyze-loading-scan"></div>
              <div className="analyze-loading-content">
                <div className="analyze-loading-spinner"></div>
                <h3>FORENSIC SCAN IN PROGRESS</h3>
                <p>Analyzing image with 18+ forensic techniques...</p>
                <div className="analyze-loading-status">
                  <span>●</span> METADATA EXTRACTION
                  <span>●</span> GPS RECOVERY
                  <span>●</span> AI ANALYSIS
                </div>
              </div>
            </div>
          </div>
        )}

        {results && (
          <Results results={results} file={file} onReset={handleReset} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="analyze-footer">
        <div>
          META<span>LENS</span>
        </div>
        <p>DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE</p>
        <small>© 2026 METALENS</small>
      </footer>
    </div>
  );
};

export default AnalyzePage;
