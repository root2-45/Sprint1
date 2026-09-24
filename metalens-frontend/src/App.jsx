// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// import React, { useState } from 'react';
// import axios from 'axios';
// import UploadZone from './components/UploadZone';
// import Results from './components/Results';
// import './App.css';

// function App() {
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
//     <div className="app">
//       <header className="app-header">
//         <h1>🔍 MetaLens</h1>
//         <p className="subtitle">Forensic Image Intelligence</p>
//         <p className="tagline">See Through the Metadata</p>
//       </header>

//       <main className="app-main">
//         {!results && !loading && (
//           <UploadZone
//             onFileUpload={handleFileUpload}
//             preview={preview}
//             error={error}
//           />
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

//       <footer className="app-footer">
//         <p>MetaLens v2.0 • Built with React + Flask + ExifTool + Ollama</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AnalyzePage from "./pages/AnalyzePage";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/analyze" element={<AnalyzePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AnalyzePage from "./pages/AnalyzePage";
// import PDFReportPage from "./pages/PDFReportPage";
// import "./App.css";
// import HistoryPage from './pages/HistoryPage';
// import HistoryDetailPage from './pages/HistoryDetailPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/analyze" element={<AnalyzePage />} />
//         <Route path="/pdf-report" element={<PDFReportPage />} />
//         <Route path="/history" element={<HistoryPage />} />
//         <Route path="/history/:id" element={<HistoryDetailPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AnalyzePage from './pages/AnalyzePage';
import PDFReportPage from './pages/PDFReportPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes — require login */}
      <Route
        path="/analyze"
        element={<ProtectedRoute><AnalyzePage /></ProtectedRoute>}
      />
      <Route
        path="/pdf-report"
        element={<ProtectedRoute><PDFReportPage /></ProtectedRoute>}
      />
      <Route
        path="/history"
        element={<ProtectedRoute><HistoryPage /></ProtectedRoute>}
      />
      <Route
        path="/history/:id"
        element={<ProtectedRoute><HistoryDetailPage /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;