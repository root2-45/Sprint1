// import React from 'react';
// import axios from 'axios';
// import VerdictCard from './VerdictCard';
// import ExifCard from './ExifCard';
// import ReconstructedCard from './ReconstructedCard';
// import GpsCard from './GpsCard';
// import TimestampCard from './TimestampCard';
// import PlatformCard from './PlatformCard';
// import CustodyCard from './CustodyCard';
// import PixelCard from './PixelCard';
// import AiCard from './AiCard';
// import RecommendationsCard from './RecommendationsCard';
// import ActionsCard from './ActionsCard';

// const Results = ({ results, file, onReset }) => {
//   const downloadStripped = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         window.open(response.data.download_url, '_blank');
//       } else {
//         alert('Error: ' + response.data.error);
//       }
//     } catch (err) {
//       alert('Error: ' + (err.response?.data?.error || 'Failed to strip metadata'));
//     }
//   };

//   return (
//     <div className="results-container">
//       <button className="reset-btn" onClick={onReset}>← Upload New Image</button>
//       <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
//       <div className="grid-2">
//         <ExifCard exif={results.exif} />
//         <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
//       </div>
//       <GpsCard gps={results.gps} />
//       <TimestampCard timestamp={results.timestamp} />
//       <PlatformCard platformDetails={results.platform_details} />
//       <CustodyCard custody={results.custody} />
//       <PixelCard pixel={results.pixel} />
//       <AiCard ai={results.ai} />
//       <RecommendationsCard verdict={results.verdict} />
//       <ActionsCard file={file} onStrip={downloadStripped} />
//       <style>{`
//         .results-container { margin-top: 20px; }
//         .reset-btn { background: #2a3a5c; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; margin-bottom: 20px; transition: background 0.3s ease; }
//         .reset-btn:hover { background: #3a4a6c; }
//         .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//         @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
//       `}</style>
//     </div>
//   );
// };

// export default Results;




// import React from 'react';
// import axios from 'axios';
// import VerdictCard from './VerdictCard';
// import ExifCard from './ExifCard';
// import ReconstructedCard from './ReconstructedCard';
// import GpsCard from './GpsCard';
// import TimestampCard from './TimestampCard';
// import PlatformCard from './PlatformCard';
// import CustodyCard from './CustodyCard';
// import PixelCard from './PixelCard';
// import AiCard from './AiCard';
// import RecommendationsCard from './RecommendationsCard';
// import ActionsCard from './ActionsCard';

// const Results = ({ results, file, onReset }) => {
//   const downloadStripped = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         window.open(response.data.download_url, '_blank');
//       } else {
//         alert('Error: ' + response.data.error);
//       }
//     } catch (err) {
//       alert('Error: ' + (err.response?.data?.error || 'Failed to strip metadata'));
//     }
//   };

//   return (
//     <div className="results-forensic">
//       {/* Header */}
//       <div className="results-header">
//         <div className="results-header-left">
//           <div className="results-section-number">03 / EVIDENCE</div>
//           <h2 className="results-title">
//             Forensic <span>Report</span>
//           </h2>
//         </div>
//         <button className="results-reset-btn" onClick={onReset}>
//           <span>↻</span> NEW ANALYSIS
//         </button>
//       </div>

//       {/* Cards */}
//       <div className="results-cards">
//         <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
        
//         <div className="results-grid-2">
//           <ExifCard exif={results.exif} />
//           <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
//         </div>

//         <GpsCard gps={results.gps} />
//         <TimestampCard timestamp={results.timestamp} />
//         <PlatformCard platformDetails={results.platform_details} />
//         <CustodyCard custody={results.custody} />
//         <PixelCard pixel={results.pixel} />
//         <AiCard ai={results.ai} />
//         <RecommendationsCard verdict={results.verdict} />
//         <ActionsCard file={file} onStrip={downloadStripped} />
//       </div>

//       <style jsx>{`
//         .results-forensic {
//           margin-top: 10px;
//         }

//         .results-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 1px solid rgba(70, 190, 220, 0.08);
//         }

//         .results-header-left {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .results-section-number {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 9px;
//           letter-spacing: 2.5px;
//         }

//         .results-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 28px;
//           font-weight: 600;
//           letter-spacing: -1px;
//           color: #edfaff;
//           margin: 0;
//         }

//         .results-title span {
//           color: #00dfff;
//         }

//         .results-reset-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 20px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           background: rgba(0, 210, 255, 0.04);
//           color: #a0cbd6;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .results-reset-btn span {
//           font-size: 16px;
//           color: #00dfff;
//         }

//         .results-reset-btn:hover {
//           border-color: #00dfff;
//           background: rgba(0, 210, 255, 0.08);
//           transform: translateY(-2px);
//         }

//         .results-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .results-grid-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         @media (max-width: 768px) {
//           .results-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 15px;
//           }

//           .results-title {
//             font-size: 22px;
//           }

//           .results-grid-2 {
//             grid-template-columns: 1fr;
//           }

//           .results-reset-btn {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .results-title {
//             font-size: 18px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Results;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import VerdictCard from './VerdictCard';
// import ExifCard from './ExifCard';
// import ReconstructedCard from './ReconstructedCard';
// import GpsCard from './GpsCard';
// import TimestampCard from './TimestampCard';
// import PlatformCard from './PlatformCard';
// import CustodyCard from './CustodyCard';
// import PixelCard from './PixelCard';
// import AiCard from './AiCard';
// import RecommendationsCard from './RecommendationsCard';
// import ActionsCard from './ActionsCard';

// const Results = ({ results, file, onReset }) => {
//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [file]);

//   // ============================================================
//   //  1. STRIP METADATA
//   // ============================================================
//   const downloadStripped = async (file) => {
//     if (!file) {
//       alert('No file to strip metadata from!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       if (response.data.success) {
//         window.open(response.data.download_url, '_blank');
//       } else {
//         alert('Error: ' + (response.data.error || 'Failed to strip metadata'));
//       }
//     } catch (err) {
//       alert('Error: ' + (err.response?.data?.error || 'Failed to strip metadata'));
//     }
//   };

//   // ============================================================
//   //  2. EXPORT PDF REPORT
//   // ============================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ============================================================
//   //  3. GENERATE EVIDENCE HASH (SHA-256)
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
//   //  4. SHARE REPORT - Export as JSON
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

//   return (
//     <div className="results-forensic">
//       {/* Header */}
//       <div className="results-header">
//         <div className="results-header-left">
//           <div className="results-section-number">03 / EVIDENCE</div>
//           <h2 className="results-title">
//             Forensic <span>Report</span>
//           </h2>
//         </div>
//         <button className="results-reset-btn" onClick={onReset}>
//           <span>↻</span> NEW ANALYSIS
//         </button>
//       </div>

//       {/* Image Preview + Verdict Side by Side */}
//       <div className="results-evidence-header">
//         {preview && (
//           <div className="results-image-frame">
//             <div className="results-image-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <img src={preview} alt="Evidence" className="results-evidence-image" />
//             <div className="results-image-overlay">
//               <span>EVIDENCE_IMAGE</span>
//               <span>● VERIFIED</span>
//             </div>
//           </div>
//         )}

//         <div className="results-verdict-wrapper">
//           <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="results-cards">
//         <div className="results-grid-2">
//           <ExifCard exif={results.exif} />
//           <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
//         </div>

//         <GpsCard gps={results.gps} />
//         <TimestampCard timestamp={results.timestamp} />
//         <PlatformCard platformDetails={results.platform_details} />
//         <CustodyCard custody={results.custody} />
//         <PixelCard pixel={results.pixel} />
//         <AiCard ai={results.ai} />
//         <RecommendationsCard verdict={results.verdict} />
        
//         {/* UPDATED: ActionsCard with ALL 4 features */}
//         <ActionsCard 
//           file={file} 
//           results={results}
//           onStrip={downloadStripped}
//           onExportPDF={handleExportPDF}
//           onGenerateHash={generateHash}
//           onShareReport={shareReport}
//         />
//       </div>

//       <style jsx>{`
//         .results-forensic {
//           margin-top: 10px;
//         }

//         .results-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           margin-bottom: 25px;
//           padding-bottom: 20px;
//           border-bottom: 1px solid rgba(70, 190, 220, 0.08);
//         }

//         .results-header-left {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .results-section-number {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 9px;
//           letter-spacing: 2.5px;
//         }

//         .results-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 28px;
//           font-weight: 600;
//           letter-spacing: -1px;
//           color: #edfaff;
//           margin: 0;
//         }

//         .results-title span {
//           color: #00dfff;
//         }

//         .results-reset-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 20px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           background: rgba(0, 210, 255, 0.04);
//           color: #a0cbd6;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .results-reset-btn span {
//           font-size: 16px;
//           color: #00dfff;
//         }

//         .results-reset-btn:hover {
//           border-color: #00dfff;
//           background: rgba(0, 210, 255, 0.08);
//           transform: translateY(-2px);
//         }

//         /* Evidence Header */
//         .results-evidence-header {
//           display: grid;
//           grid-template-columns: 280px 1fr;
//           gap: 20px;
//           margin-bottom: 25px;
//         }

//         .results-image-frame {
//           position: relative;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           padding: 6px;
//           background: rgba(3, 15, 23, 0.6);
//           max-height: 300px;
//           overflow: hidden;
//         }

//         .results-image-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 2;
//         }

//         .results-image-corners span {
//           position: absolute;
//           width: 14px;
//           height: 14px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.5;
//         }

//         .results-image-corners span:nth-child(1) {
//           top: 8px;
//           left: 8px;
//           border-width: 2px 0 0 2px;
//         }

//         .results-image-corners span:nth-child(2) {
//           top: 8px;
//           right: 8px;
//           border-width: 2px 2px 0 0;
//         }

//         .results-image-corners span:nth-child(3) {
//           bottom: 8px;
//           left: 8px;
//           border-width: 0 0 2px 2px;
//         }

//         .results-image-corners span:nth-child(4) {
//           bottom: 8px;
//           right: 8px;
//           border-width: 0 2px 2px 0;
//         }

//         .results-evidence-image {
//           width: 100%;
//           height: 100%;
//           max-height: 280px;
//           object-fit: cover;
//           display: block;
//           filter: brightness(0.85) contrast(1.05);
//         }

//         .results-image-overlay {
//           position: absolute;
//           bottom: 12px;
//           left: 14px;
//           right: 14px;
//           display: flex;
//           justify-content: space-between;
//           color: #7ca6b2;
//           font-family: "Orbitron", sans-serif;
//           font-size: 7px;
//           letter-spacing: 1.5px;
//           z-index: 2;
//         }

//         .results-image-overlay span:last-child {
//           color: #00ffb3;
//         }

//         .results-verdict-wrapper {
//           display: flex;
//           align-items: stretch;
//         }

//         .results-verdict-wrapper :global(.card) {
//           width: 100%;
//           margin-bottom: 0;
//         }

//         .results-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .results-grid-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         @media (max-width: 768px) {
//           .results-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 15px;
//           }

//           .results-title {
//             font-size: 22px;
//           }

//           .results-evidence-header {
//             grid-template-columns: 1fr;
//           }

//           .results-image-frame {
//             max-height: 250px;
//           }

//           .results-evidence-image {
//             max-height: 230px;
//           }

//           .results-grid-2 {
//             grid-template-columns: 1fr;
//           }

//           .results-reset-btn {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .results-title {
//             font-size: 18px;
//           }

//           .results-image-frame {
//             max-height: 200px;
//           }

//           .results-evidence-image {
//             max-height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Results;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import VerdictCard from './VerdictCard';
// import ExifCard from './ExifCard';
// import ReconstructedCard from './ReconstructedCard';
// import GpsCard from './GpsCard';
// import TimestampCard from './TimestampCard';
// import PlatformCard from './PlatformCard';
// import CustodyCard from './CustodyCard';
// import PixelCard from './PixelCard';
// import AiCard from './AiCard';
// import RecommendationsCard from './RecommendationsCard';
// import ActionsCard from './ActionsCard';

// const Results = ({ results, file, onReset }) => {
//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [file]);

//   // ============================================================
//   //  1. STRIP METADATA - FIXED: Returns response data
//   // ============================================================
//   const downloadStripped = async (file) => {
//     if (!file) {
//       alert('No file to strip metadata from!');
//       return null;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       if (response.data.success) {
//         // Open download in new tab
//         if (response.data.download_url) {
//           window.open(response.data.download_url, '_blank');
//         }
//         return response.data;
//       } else {
//         alert('Error: ' + (response.data.error || 'Failed to strip metadata'));
//         return null;
//       }
//     } catch (err) {
//       alert('Error: ' + (err.response?.data?.error || 'Failed to strip metadata'));
//       return null;
//     }
//   };

//   // ============================================================
//   //  2. EXPORT PDF REPORT
//   // ============================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ============================================================
//   //  3. GENERATE EVIDENCE HASH (SHA-256)
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
//   //  4. SHARE REPORT - Export as JSON
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

//   return (
//     <div className="results-forensic">
//       {/* Header */}
//       <div className="results-header">
//         <div className="results-header-left">
//           <div className="results-section-number">03 / EVIDENCE</div>
//           <h2 className="results-title">
//             Forensic <span>Report</span>
//           </h2>
//         </div>
//         <button className="results-reset-btn" onClick={onReset}>
//           <span>↻</span> NEW ANALYSIS
//         </button>
//       </div>

//       {/* Image Preview + Verdict Side by Side */}
//       <div className="results-evidence-header">
//         {preview && (
//           <div className="results-image-frame">
//             <div className="results-image-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <img src={preview} alt="Evidence" className="results-evidence-image" />
//             <div className="results-image-overlay">
//               <span>EVIDENCE_IMAGE</span>
//               <span>● VERIFIED</span>
//             </div>
//           </div>
//         )}

//         <div className="results-verdict-wrapper">
//           <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="results-cards">
//         <div className="results-grid-2">
//           <ExifCard exif={results.exif} />
//           <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
//         </div>

//         <GpsCard gps={results.gps} />
//         <TimestampCard timestamp={results.timestamp} />
//         <PlatformCard platformDetails={results.platform_details} />
//         <CustodyCard custody={results.custody} />
//         <PixelCard pixel={results.pixel} />
//         <AiCard ai={results.ai} />
//         <RecommendationsCard verdict={results.verdict} />
        
//         {/* UPDATED: ActionsCard with ALL 4 features */}
//         <ActionsCard 
//           file={file} 
//           results={results}
//           onStrip={downloadStripped}
//           onExportPDF={handleExportPDF}
//           onGenerateHash={generateHash}
//           onShareReport={shareReport}
//         />
//       </div>

//       <style jsx>{`
//         .results-forensic {
//           margin-top: 10px;
//         }

//         .results-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           margin-bottom: 25px;
//           padding-bottom: 20px;
//           border-bottom: 1px solid rgba(70, 190, 220, 0.08);
//         }

//         .results-header-left {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .results-section-number {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 9px;
//           letter-spacing: 2.5px;
//         }

//         .results-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 28px;
//           font-weight: 600;
//           letter-spacing: -1px;
//           color: #edfaff;
//           margin: 0;
//         }

//         .results-title span {
//           color: #00dfff;
//         }

//         .results-reset-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 20px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           background: rgba(0, 210, 255, 0.04);
//           color: #a0cbd6;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .results-reset-btn span {
//           font-size: 16px;
//           color: #00dfff;
//         }

//         .results-reset-btn:hover {
//           border-color: #00dfff;
//           background: rgba(0, 210, 255, 0.08);
//           transform: translateY(-2px);
//         }

//         /* Evidence Header */
//         .results-evidence-header {
//           display: grid;
//           grid-template-columns: 280px 1fr;
//           gap: 20px;
//           margin-bottom: 25px;
//         }

//         .results-image-frame {
//           position: relative;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           padding: 6px;
//           background: rgba(3, 15, 23, 0.6);
//           max-height: 300px;
//           overflow: hidden;
//         }

//         .results-image-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 2;
//         }

//         .results-image-corners span {
//           position: absolute;
//           width: 14px;
//           height: 14px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.5;
//         }

//         .results-image-corners span:nth-child(1) {
//           top: 8px;
//           left: 8px;
//           border-width: 2px 0 0 2px;
//         }

//         .results-image-corners span:nth-child(2) {
//           top: 8px;
//           right: 8px;
//           border-width: 2px 2px 0 0;
//         }

//         .results-image-corners span:nth-child(3) {
//           bottom: 8px;
//           left: 8px;
//           border-width: 0 0 2px 2px;
//         }

//         .results-image-corners span:nth-child(4) {
//           bottom: 8px;
//           right: 8px;
//           border-width: 0 2px 2px 0;
//         }

//         .results-evidence-image {
//           width: 100%;
//           height: 100%;
//           max-height: 280px;
//           object-fit: cover;
//           display: block;
//           filter: brightness(0.85) contrast(1.05);
//         }

//         .results-image-overlay {
//           position: absolute;
//           bottom: 12px;
//           left: 14px;
//           right: 14px;
//           display: flex;
//           justify-content: space-between;
//           color: #7ca6b2;
//           font-family: "Orbitron", sans-serif;
//           font-size: 7px;
//           letter-spacing: 1.5px;
//           z-index: 2;
//         }

//         .results-image-overlay span:last-child {
//           color: #00ffb3;
//         }

//         .results-verdict-wrapper {
//           display: flex;
//           align-items: stretch;
//         }

//         .results-verdict-wrapper :global(.card) {
//           width: 100%;
//           margin-bottom: 0;
//         }

//         .results-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .results-grid-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         @media (max-width: 768px) {
//           .results-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 15px;
//           }

//           .results-title {
//             font-size: 22px;
//           }

//           .results-evidence-header {
//             grid-template-columns: 1fr;
//           }

//           .results-image-frame {
//             max-height: 250px;
//           }

//           .results-evidence-image {
//             max-height: 230px;
//           }

//           .results-grid-2 {
//             grid-template-columns: 1fr;
//           }

//           .results-reset-btn {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .results-title {
//             font-size: 18px;
//           }

//           .results-image-frame {
//             max-height: 200px;
//           }

//           .results-evidence-image {
//             max-height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Results;




















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import VerdictCard from './VerdictCard';
// import ExifCard from './ExifCard';
// import ReconstructedCard from './ReconstructedCard';
// import GpsCard from './GpsCard';
// import TimestampCard from './TimestampCard';
// import PlatformCard from './PlatformCard';
// import CustodyCard from './CustodyCard';
// import PixelCard from './PixelCard';
// import AiCard from './AiCard';
// import RecommendationsCard from './RecommendationsCard';
// import ActionsCard from './ActionsCard';

// const Results = ({ results, file, onReset }) => {
//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [file]);

//   // ============================================================
//   //  1. STRIP METADATA — returns response data OR error object
//   //     (no window.open here — ActionsCard handles the download)
//   // ============================================================
//   const downloadStripped = async (file) => {
//     if (!file) {
//       alert('No file to strip metadata from!');
//       return null;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       return response.data;  // success payload from Flask
//     } catch (err) {
//       console.error('Strip error:', err.response?.data);
//       // ✅ Return an error object instead of null so ActionsCard
//       //    can show the real message from Flask
//       return {
//         success: false,
//         error: err.response?.data?.error || err.message || 'Failed to strip metadata'
//       };
//     }
//   };

//   // ============================================================
//   //  2. EXPORT PDF REPORT
//   // ============================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ============================================================
//   //  3. GENERATE EVIDENCE HASH (SHA-256)
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
//   //  4. SHARE REPORT - Export as JSON
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

//   return (
//     <div className="results-forensic">
//       {/* Header */}
//       <div className="results-header">
//         <div className="results-header-left">
//           <div className="results-section-number">03 / EVIDENCE</div>
//           <h2 className="results-title">
//             Forensic <span>Report</span>
//           </h2>
//         </div>
//         <button className="results-reset-btn" onClick={onReset}>
//           <span>↻</span> NEW ANALYSIS
//         </button>
//       </div>

//       {/* Image Preview + Verdict Side by Side */}
//       <div className="results-evidence-header">
//         {preview && (
//           <div className="results-image-frame">
//             <div className="results-image-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <img src={preview} alt="Evidence" className="results-evidence-image" />
//             <div className="results-image-overlay">
//               <span>EVIDENCE_IMAGE</span>
//               <span>● VERIFIED</span>
//             </div>
//           </div>
//         )}

//         <div className="results-verdict-wrapper">
//           <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="results-cards">
//         <div className="results-grid-2">
//           <ExifCard exif={results.exif} />
//           <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
//         </div>

//         <GpsCard gps={results.gps} />
//         <TimestampCard timestamp={results.timestamp} />
//         <PlatformCard platformDetails={results.platform_details} />
//         <CustodyCard custody={results.custody} />
//         <PixelCard pixel={results.pixel} />
//         <AiCard ai={results.ai} />
//         <RecommendationsCard verdict={results.verdict} />
        
//         {/* ActionsCard with ALL features */}
//         <ActionsCard 
//           file={file} 
//           results={results}
//           onStrip={downloadStripped}
//           onExportPDF={handleExportPDF}
//           onGenerateHash={generateHash}
//           onShareReport={shareReport}
//         />
//       </div>

//       <style jsx>{`
//         .results-forensic {
//           margin-top: 10px;
//         }

//         .results-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           margin-bottom: 25px;
//           padding-bottom: 20px;
//           border-bottom: 1px solid rgba(70, 190, 220, 0.08);
//         }

//         .results-header-left {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .results-section-number {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 9px;
//           letter-spacing: 2.5px;
//         }

//         .results-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 28px;
//           font-weight: 600;
//           letter-spacing: -1px;
//           color: #edfaff;
//           margin: 0;
//         }

//         .results-title span {
//           color: #00dfff;
//         }

//         .results-reset-btn {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 10px 20px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           background: rgba(0, 210, 255, 0.04);
//           color: #a0cbd6;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .results-reset-btn span {
//           font-size: 16px;
//           color: #00dfff;
//         }

//         .results-reset-btn:hover {
//           border-color: #00dfff;
//           background: rgba(0, 210, 255, 0.08);
//           transform: translateY(-2px);
//         }

//         /* Evidence Header */
//         .results-evidence-header {
//           display: grid;
//           grid-template-columns: 280px 1fr;
//           gap: 20px;
//           margin-bottom: 25px;
//         }

//         .results-image-frame {
//           position: relative;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           padding: 6px;
//           background: rgba(3, 15, 23, 0.6);
//           max-height: 300px;
//           overflow: hidden;
//         }

//         .results-image-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 2;
//         }

//         .results-image-corners span {
//           position: absolute;
//           width: 14px;
//           height: 14px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.5;
//         }

//         .results-image-corners span:nth-child(1) {
//           top: 8px;
//           left: 8px;
//           border-width: 2px 0 0 2px;
//         }

//         .results-image-corners span:nth-child(2) {
//           top: 8px;
//           right: 8px;
//           border-width: 2px 2px 0 0;
//         }

//         .results-image-corners span:nth-child(3) {
//           bottom: 8px;
//           left: 8px;
//           border-width: 0 0 2px 2px;
//         }

//         .results-image-corners span:nth-child(4) {
//           bottom: 8px;
//           right: 8px;
//           border-width: 0 2px 2px 0;
//         }

//         .results-evidence-image {
//           width: 100%;
//           height: 100%;
//           max-height: 280px;
//           object-fit: cover;
//           display: block;
//           filter: brightness(0.85) contrast(1.05);
//         }

//         .results-image-overlay {
//           position: absolute;
//           bottom: 12px;
//           left: 14px;
//           right: 14px;
//           display: flex;
//           justify-content: space-between;
//           color: #7ca6b2;
//           font-family: "Orbitron", sans-serif;
//           font-size: 7px;
//           letter-spacing: 1.5px;
//           z-index: 2;
//         }

//         .results-image-overlay span:last-child {
//           color: #00ffb3;
//         }

//         .results-verdict-wrapper {
//           display: flex;
//           align-items: stretch;
//         }

//         .results-verdict-wrapper :global(.card) {
//           width: 100%;
//           margin-bottom: 0;
//         }

//         .results-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .results-grid-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         @media (max-width: 768px) {
//           .results-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 15px;
//           }

//           .results-title {
//             font-size: 22px;
//           }

//           .results-evidence-header {
//             grid-template-columns: 1fr;
//           }

//           .results-image-frame {
//             max-height: 250px;
//           }

//           .results-evidence-image {
//             max-height: 230px;
//           }

//           .results-grid-2 {
//             grid-template-columns: 1fr;
//           }

//           .results-reset-btn {
//             width: 100%;
//             justify-content: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .results-title {
//             font-size: 18px;
//           }

//           .results-image-frame {
//             max-height: 200px;
//           }

//           .results-evidence-image {
//             max-height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Results;


















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerdictCard from './VerdictCard';
import ExifCard from './ExifCard';
import ReconstructedCard from './ReconstructedCard';
import GpsCard from './GpsCard';
import TimestampCard from './TimestampCard';
import PlatformCard from './PlatformCard';
import CustodyCard from './CustodyCard';
import PixelCard from './PixelCard';
import AiCard from './AiCard';
import RecommendationsCard from './RecommendationsCard';
import ActionsCard from './ActionsCard';

const Results = ({ results, file, onReset }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [file]);

  // ============================================================
  //  AUTO-GENERATE SHA-256 HASH
  //  Runs once when the image is analyzed. Stores it on `results`
  //  so both the Evidence Hash card AND the PDF report can show it.
  // ============================================================
  useEffect(() => {
    const computeHash = async () => {
      if (file && results && !results.sha256) {
        try {
          const buffer = await file.arrayBuffer();
          const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          results.sha256 = hashHex;
          console.log('✅ Auto-hash generated:', hashHex);
        } catch (err) {
          console.error('Auto-hash failed:', err);
        }
      }
    };
    computeHash();
  }, [file, results]);

  // ============================================================
  //  1. STRIP METADATA
  // ============================================================
  const downloadStripped = async (file) => {
    if (!file) {
      alert('No file to strip metadata from!');
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/strip', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err) {
      console.error('Strip error:', err.response?.data);
      return {
        success: false,
        error: err.response?.data?.error || err.message || 'Failed to strip metadata'
      };
    }
  };

  // ============================================================
  //  2. EXPORT PDF REPORT
  // ============================================================
  const handleExportPDF = () => {
    if (!results) {
      alert('No results to export! Please analyze an image first.');
      return;
    }
    navigate('/pdf-report', { state: { results, file } });
  };

  // ============================================================
  //  3. GENERATE EVIDENCE HASH (SHA-256)
  // ============================================================
  const generateHash = async (file) => {
    if (!file) {
      alert('No file uploaded!');
      return;
    }
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (err) {
      throw new Error('Failed to generate hash: ' + err.message);
    }
  };

  // ============================================================
  //  4. SHARE REPORT - Export as JSON
  // ============================================================
  const shareReport = (results) => {
    if (!results) {
      alert('No results to share! Please analyze an image first.');
      return;
    }
    const jsonStr = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forensic_report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-forensic">
      {/* Header */}
      <div className="results-header">
        <div className="results-header-left">
          <div className="results-section-number">03 / EVIDENCE</div>
          <h2 className="results-title">
            Forensic <span>Report</span>
          </h2>
        </div>
        <button className="results-reset-btn" onClick={onReset}>
          <span>↻</span> NEW ANALYSIS
        </button>
      </div>

      {/* Image Preview + Verdict Side by Side */}
      <div className="results-evidence-header">
        {preview && (
          <div className="results-image-frame">
            <div className="results-image-corners">
              <span></span><span></span><span></span><span></span>
            </div>
            <img src={preview} alt="Evidence" className="results-evidence-image" />
            <div className="results-image-overlay">
              <span>EVIDENCE_IMAGE</span>
              <span>● VERIFIED</span>
            </div>
          </div>
        )}

        <div className="results-verdict-wrapper">
          <VerdictCard verdict={results.verdict} reconstructed={results.reconstructed} />
        </div>
      </div>

      {/* Cards */}
      <div className="results-cards">
        <div className="results-grid-2">
          <ExifCard exif={results.exif} />
          <ReconstructedCard reconstructed={results.reconstructed} platformDetails={results.platform_details} />
        </div>

        <GpsCard gps={results.gps} />
        <TimestampCard timestamp={results.timestamp} />
        <PlatformCard platformDetails={results.platform_details} />
        <CustodyCard custody={results.custody} />
        <PixelCard pixel={results.pixel} />
        <AiCard ai={results.ai} />
        <RecommendationsCard verdict={results.verdict} />
        
        {/* ActionsCard with ALL features */}
        <ActionsCard 
          file={file} 
          results={results}
          onStrip={downloadStripped}
          onExportPDF={handleExportPDF}
          onGenerateHash={generateHash}
          onShareReport={shareReport}
        />
      </div>

      <style jsx>{`
        .results-forensic {
          margin-top: 10px;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(70, 190, 220, 0.08);
        }

        .results-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .results-section-number {
          color: #00cde9;
          font-family: "Orbitron", sans-serif;
          font-size: 9px;
          letter-spacing: 2.5px;
        }

        .results-title {
          font-family: "Orbitron", sans-serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -1px;
          color: #edfaff;
          margin: 0;
        }

        .results-title span {
          color: #00dfff;
        }

        .results-reset-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border: 1px solid rgba(0, 218, 255, 0.2);
          background: rgba(0, 210, 255, 0.04);
          color: #a0cbd6;
          font-family: "Rajdhani", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .results-reset-btn span {
          font-size: 16px;
          color: #00dfff;
        }

        .results-reset-btn:hover {
          border-color: #00dfff;
          background: rgba(0, 210, 255, 0.08);
          transform: translateY(-2px);
        }

        .results-evidence-header {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .results-image-frame {
          position: relative;
          border: 1px solid rgba(0, 218, 255, 0.25);
          padding: 6px;
          background: rgba(3, 15, 23, 0.6);
          max-height: 300px;
          overflow: hidden;
        }

        .results-image-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .results-image-corners span {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: #00e1ff;
          border-style: solid;
          opacity: 0.5;
        }

        .results-image-corners span:nth-child(1) {
          top: 8px;
          left: 8px;
          border-width: 2px 0 0 2px;
        }

        .results-image-corners span:nth-child(2) {
          top: 8px;
          right: 8px;
          border-width: 2px 2px 0 0;
        }

        .results-image-corners span:nth-child(3) {
          bottom: 8px;
          left: 8px;
          border-width: 0 0 2px 2px;
        }

        .results-image-corners span:nth-child(4) {
          bottom: 8px;
          right: 8px;
          border-width: 0 2px 2px 0;
        }

        .results-evidence-image {
          width: 100%;
          height: 100%;
          max-height: 280px;
          object-fit: cover;
          display: block;
          filter: brightness(0.85) contrast(1.05);
        }

        .results-image-overlay {
          position: absolute;
          bottom: 12px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          color: #7ca6b2;
          font-family: "Orbitron", sans-serif;
          font-size: 7px;
          letter-spacing: 1.5px;
          z-index: 2;
        }

        .results-image-overlay span:last-child {
          color: #00ffb3;
        }

        .results-verdict-wrapper {
          display: flex;
          align-items: stretch;
        }

        .results-verdict-wrapper :global(.card) {
          width: 100%;
          margin-bottom: 0;
        }

        .results-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .results-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .results-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .results-title {
            font-size: 22px;
          }

          .results-evidence-header {
            grid-template-columns: 1fr;
          }

          .results-image-frame {
            max-height: 250px;
          }

          .results-evidence-image {
            max-height: 230px;
          }

          .results-grid-2 {
            grid-template-columns: 1fr;
          }

          .results-reset-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .results-title {
            font-size: 18px;
          }

          .results-image-frame {
            max-height: 200px;
          }

          .results-evidence-image {
            max-height: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Results;