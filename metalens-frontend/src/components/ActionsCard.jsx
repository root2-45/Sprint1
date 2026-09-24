// import React, { useState } from 'react';

// const ActionsCard = ({ file, onStrip }) => {
//   const [stripping, setStripping] = useState(false);
//   const handleStrip = async () => {
//     if (!file) return;
//     setStripping(true);
//     try { await onStrip(file); } finally { setStripping(false); }
//   };
//   return (
//     <div className="card">
//       <h3>🛠️ Actions</h3>
//       <div className="value">
//         <div className="btn-row">
//           <button className="btn-strip" onClick={handleStrip} disabled={stripping}>
//             {stripping ? '⏳ Stripping...' : '🛡️ Strip Metadata'}
//           </button>
//         </div>
//       </div>
//       <style>{`
//         .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #2a3a5c; }
//         .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
//         .value { font-size: 14px; line-height: 1.8; }
//         .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
//         .btn-strip { background: #7b2ffc; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.3s ease; }
//         .btn-strip:hover:not(:disabled) { background: #6b1fc4; transform: scale(1.02); }
//         .btn-strip:disabled { opacity: 0.6; cursor: not-allowed; }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ActionsCard = ({ file, results, onStrip, onExportPDF, onGenerateHash, onShareReport }) => {
//   const navigate = useNavigate();
//   const [showStripModal, setShowStripModal] = useState(false);
//   const [stripping, setStripping] = useState(false);
//   const [stripStatus, setStripStatus] = useState(null);
//   const [hashValue, setHashValue] = useState(null);
//   const [hashGenerating, setHashGenerating] = useState(false);

//   // ================================================================
//   //  1. STRIP METADATA
//   // ================================================================
//   const handleStrip = async () => {
//     setStripping(true);
//     setStripStatus('processing');
//     try {
//       await onStrip(file);
//       setStripStatus('success');
//       setTimeout(() => setShowStripModal(false), 1500);
//     } catch (err) {
//       setStripStatus('error');
//     } finally {
//       setStripping(false);
//     }
//   };

//   // ================================================================
//   //  2. EXPORT PDF REPORT - Navigate to PDF page
//   // ================================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     // Navigate to PDF page with results data
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ================================================================
//   //  3. GENERATE EVIDENCE HASH
//   // ================================================================
//   const handleGenerateHash = async () => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     setHashGenerating(true);
//     try {
//       const hash = await onGenerateHash(file);
//       setHashValue(hash);
//     } catch (err) {
//       alert('Failed to generate hash: ' + err.message);
//     } finally {
//       setHashGenerating(false);
//     }
//   };

//   // ================================================================
//   //  4. SHARE REPORT - Export as JSON
//   // ================================================================
//   const handleShareReport = () => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     onShareReport(results);
//   };

//   return (
//     <div className="actions-card-forensic">
//       <h3 className="actions-title">🛠️ Forensic Actions</h3>
      
//       <div className="actions-grid">
        
//         {/* 1. Strip Metadata */}
//         <div className="action-item">
//           <div className="action-icon">🛡️</div>
//           <div className="action-content">
//             <div className="action-label">Strip Metadata</div>
//             <div className="action-desc">Remove all EXIF/GPS data for privacy</div>
//             <button 
//               className="action-btn primary"
//               onClick={() => setShowStripModal(true)}
//               disabled={!file}
//             >
//               ▶ Start Process
//             </button>
//           </div>
//         </div>

//         {/* 2. Export PDF Report */}
//         <div className="action-item">
//           <div className="action-icon">📄</div>
//           <div className="action-content">
//             <div className="action-label">Export PDF Report</div>
//             <div className="action-desc">Convert forensic report to PDF</div>
//             <button 
//               className="action-btn secondary"
//               onClick={handleExportPDF}
//               disabled={!results}
//             >
//               ▶ Generate PDF
//             </button>
//           </div>
//         </div>

//         {/* 3. Evidence Hash */}
//         <div className="action-item">
//           <div className="action-icon">🔐</div>
//           <div className="action-content">
//             <div className="action-label">Evidence Hash</div>
//             <div className="action-desc">Generate SHA-256 fingerprint</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleGenerateHash}
//               disabled={!file || hashGenerating}
//             >
//               {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
//             </button>
//             {hashValue && (
//               <div className="hash-display">
//                 <span>SHA-256:</span>
//                 <code>{hashValue.substring(0, 16)}...{hashValue.substring(hashValue.length - 8)}</code>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 4. Share Report */}
//         <div className="action-item">
//           <div className="action-icon">📤</div>
//           <div className="action-content">
//             <div className="action-label">Share Report</div>
//             <div className="action-desc">Export as JSON for sharing</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleShareReport}
//               disabled={!results}
//             >
//               ▶ Export JSON
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* =========================================================
//           STRIP METADATA MODAL
//       ========================================================= */}
//       {showStripModal && (
//         <div className="strip-modal-overlay" onClick={() => !stripping && setShowStripModal(false)}>
//           <div className="strip-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="strip-modal-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <div className="strip-modal-content">
//               <div className="strip-modal-icon">⚠️</div>
//               <h3>Remove All Metadata?</h3>
//               <p>
//                 This will permanently remove all EXIF, GPS, camera, 
//                 and timestamp data from the image. This action cannot be undone.
//               </p>
//               <div className="strip-modal-info">
//                 <div className="strip-modal-info-item">
//                   <span>Original Size</span>
//                   <strong>4.6 MB</strong>
//                 </div>
//                 <div className="strip-modal-info-item">
//                   <span>Data to Remove</span>
//                   <strong style={{ color: '#f59e0b' }}>~0.1 MB</strong>
//                 </div>
//               </div>
//               {stripStatus === 'processing' && (
//                 <div className="strip-processing">
//                   <div className="strip-spinner"></div>
//                   <span>Processing...</span>
//                 </div>
//               )}
//               {stripStatus === 'success' && (
//                 <div className="strip-success">✅ Metadata stripped successfully! Downloading...</div>
//               )}
//               {stripStatus === 'error' && (
//                 <div className="strip-error">❌ Failed to strip metadata. Please try again.</div>
//               )}
//               <div className="strip-modal-actions">
//                 <button 
//                   className="strip-modal-btn secondary"
//                   onClick={() => {
//                     setShowStripModal(false);
//                     setStripStatus(null);
//                   }}
//                   disabled={stripping}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="strip-modal-btn primary"
//                   onClick={handleStrip}
//                   disabled={stripping || stripStatus === 'success'}
//                 >
//                   {stripping ? 'Processing...' : 'Yes, Strip Metadata'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .actions-card-forensic {
//           background: #141b2b;
//           border-radius: 12px;
//           padding: 24px;
//           border-left: 3px solid #60a5fa;
//         }

//         .actions-title {
//           color: #8899bb;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 20px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .action-item {
//           display: flex;
//           gap: 14px;
//           padding: 16px;
//           background: #0f172a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           transition: all 0.3s ease;
//         }

//         .action-item:hover {
//           border-color: #2a3a5c;
//         }

//         .action-icon {
//           font-size: 28px;
//           line-height: 1;
//         }

//         .action-content {
//           flex: 1;
//         }

//         .action-label {
//           color: #e0e8f0;
//           font-weight: 600;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .action-desc {
//           color: #667799;
//           font-size: 12px;
//           margin-bottom: 8px;
//         }

//         .action-btn {
//           padding: 6px 16px;
//           border: none;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .action-btn:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }

//         .action-btn.primary {
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//         }

//         .action-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
//         }

//         .action-btn.secondary {
//           background: #2a3a5c;
//           color: white;
//         }

//         .action-btn.secondary:hover:not(:disabled) {
//           background: #3a4a6c;
//         }

//         .action-btn.tertiary {
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//         }

//         .action-btn.tertiary:hover:not(:disabled) {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         .hash-display {
//           margin-top: 6px;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .hash-display span {
//           color: #667799;
//           font-size: 10px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .hash-display code {
//           color: #00d4ff;
//           font-size: 11px;
//           font-family: "Courier New", monospace;
//           background: #0a0e1a;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }

//         /* Strip Modal */
//         .strip-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(10px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .strip-modal {
//           position: relative;
//           max-width: 480px;
//           width: 90%;
//           padding: 32px;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           background: #0f172a;
//         }

//         .strip-modal-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//         }

//         .strip-modal-corners span {
//           position: absolute;
//           width: 16px;
//           height: 16px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.4;
//         }

//         .strip-modal-corners span:nth-child(1) {
//           top: 10px;
//           left: 10px;
//           border-width: 2px 0 0 2px;
//         }

//         .strip-modal-corners span:nth-child(2) {
//           top: 10px;
//           right: 10px;
//           border-width: 2px 2px 0 0;
//         }

//         .strip-modal-corners span:nth-child(3) {
//           bottom: 10px;
//           left: 10px;
//           border-width: 0 0 2px 2px;
//         }

//         .strip-modal-corners span:nth-child(4) {
//           bottom: 10px;
//           right: 10px;
//           border-width: 0 2px 2px 0;
//         }

//         .strip-modal-content {
//           position: relative;
//           z-index: 1;
//           text-align: center;
//         }

//         .strip-modal-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//         }

//         .strip-modal h3 {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           margin-bottom: 12px;
//         }

//         .strip-modal p {
//           color: #829aa6;
//           font-size: 14px;
//           line-height: 1.6;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info-item {
//           padding: 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//         }

//         .strip-modal-info-item span {
//           display: block;
//           color: #667799;
//           font-size: 11px;
//           margin-bottom: 4px;
//         }

//         .strip-modal-info-item strong {
//           color: #e0e8f0;
//           font-size: 16px;
//         }

//         .strip-processing {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #1a2340;
//           border-radius: 8px;
//         }

//         .strip-spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid #1a2340;
//           border-top: 2px solid #00d4ff;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .strip-success {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #064e3b;
//           border: 1px solid #34d399;
//           border-radius: 8px;
//           color: #34d399;
//         }

//         .strip-error {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #7f1d1d;
//           border: 1px solid #f87171;
//           border-radius: 8px;
//           color: #f87171;
//         }

//         .strip-modal-actions {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//         }

//         .strip-modal-btn {
//           padding: 10px 24px;
//           border: none;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .strip-modal-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .strip-modal-btn.primary {
//           background: linear-gradient(135deg, #ef4444, #dc2626);
//           color: white;
//         }

//         .strip-modal-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
//         }

//         .strip-modal-btn.secondary {
//           background: #1a2340;
//           color: #8899bb;
//         }

//         .strip-modal-btn.secondary:hover:not(:disabled) {
//           background: #2a3a5c;
//         }

//         @media (max-width: 600px) {
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal {
//             padding: 24px 20px;
//           }

//           .strip-modal-info {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal-actions {
//             flex-direction: column;
//           }

//           .strip-modal-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ActionsCard = ({ file, results, onStrip, onExportPDF, onGenerateHash, onShareReport }) => {
//   const navigate = useNavigate();
//   const [showStripModal, setShowStripModal] = useState(false);
//   const [stripping, setStripping] = useState(false);
//   const [stripStatus, setStripStatus] = useState(null);
//   const [hashValue, setHashValue] = useState(null);
//   const [hashGenerating, setHashGenerating] = useState(false);

//   // ================================================================
//   //  1. STRIP METADATA - FIXED DOWNLOAD
//   // ================================================================
//   const handleStrip = async () => {
//     if (!file) {
//       alert('No file to strip metadata from!');
//       return;
//     }

//     setStripping(true);
//     setStripStatus('processing');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await onStrip(file); // This should return the response with download_url
      
//       if (response && response.success) {
//         setStripStatus('success');
//         // Open the download URL in a new tab
//         if (response.download_url) {
//           window.open(response.download_url, '_blank');
//         }
//         setTimeout(() => {
//           setShowStripModal(false);
//           setStripStatus(null);
//         }, 2000);
//       } else {
//         setStripStatus('error');
//       }
//     } catch (err) {
//       console.error('Strip error:', err);
//       setStripStatus('error');
//     } finally {
//       setStripping(false);
//     }
//   };

//   // ================================================================
//   //  2. EXPORT PDF REPORT - Navigate to PDF page
//   // ================================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ================================================================
//   //  3. GENERATE EVIDENCE HASH
//   // ================================================================
//   const handleGenerateHash = async () => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     setHashGenerating(true);
//     try {
//       const hash = await onGenerateHash(file);
//       setHashValue(hash);
//     } catch (err) {
//       alert('Failed to generate hash: ' + err.message);
//     } finally {
//       setHashGenerating(false);
//     }
//   };

//   // ================================================================
//   //  4. SHARE REPORT - Export as JSON
//   // ================================================================
//   const handleShareReport = () => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     onShareReport(results);
//   };

//   return (
//     <div className="actions-card-forensic">
//       <h3 className="actions-title">🛠️ Forensic Actions</h3>
      
//       <div className="actions-grid">
        
//         {/* 1. Strip Metadata */}
//         <div className="action-item">
//           <div className="action-icon">🛡️</div>
//           <div className="action-content">
//             <div className="action-label">Strip Metadata</div>
//             <div className="action-desc">Remove all EXIF/GPS data for privacy</div>
//             <button 
//               className="action-btn primary"
//               onClick={() => setShowStripModal(true)}
//               disabled={!file}
//             >
//               ▶ Start Process
//             </button>
//           </div>
//         </div>

//         {/* 2. Export PDF Report */}
//         <div className="action-item">
//           <div className="action-icon">📄</div>
//           <div className="action-content">
//             <div className="action-label">Export PDF Report</div>
//             <div className="action-desc">Convert forensic report to PDF</div>
//             <button 
//               className="action-btn secondary"
//               onClick={handleExportPDF}
//               disabled={!results}
//             >
//               ▶ Generate PDF
//             </button>
//           </div>
//         </div>

//         {/* 3. Evidence Hash */}
//         <div className="action-item">
//           <div className="action-icon">🔐</div>
//           <div className="action-content">
//             <div className="action-label">Evidence Hash</div>
//             <div className="action-desc">Generate SHA-256 fingerprint</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleGenerateHash}
//               disabled={!file || hashGenerating}
//             >
//               {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
//             </button>
//             {hashValue && (
//               <div className="hash-display">
//                 <span>SHA-256:</span>
//                 <code>{hashValue.substring(0, 16)}...{hashValue.substring(hashValue.length - 8)}</code>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 4. Share Report */}
//         <div className="action-item">
//           <div className="action-icon">📤</div>
//           <div className="action-content">
//             <div className="action-label">Share Report</div>
//             <div className="action-desc">Export as JSON for sharing</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleShareReport}
//               disabled={!results}
//             >
//               ▶ Export JSON
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* =========================================================
//           STRIP METADATA MODAL
//       ========================================================= */}
//       {showStripModal && (
//         <div className="strip-modal-overlay" onClick={() => !stripping && setShowStripModal(false)}>
//           <div className="strip-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="strip-modal-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <div className="strip-modal-content">
//               <div className="strip-modal-icon">⚠️</div>
//               <h3>Remove All Metadata?</h3>
//               <p>
//                 This will permanently remove all EXIF, GPS, camera, 
//                 and timestamp data from the image. This action cannot be undone.
//               </p>
//               <div className="strip-modal-info">
//                 <div className="strip-modal-info-item">
//                   <span>Original Size</span>
//                   <strong>4.6 MB</strong>
//                 </div>
//                 <div className="strip-modal-info-item">
//                   <span>Data to Remove</span>
//                   <strong style={{ color: '#f59e0b' }}>~0.1 MB</strong>
//                 </div>
//               </div>
//               {stripStatus === 'processing' && (
//                 <div className="strip-processing">
//                   <div className="strip-spinner"></div>
//                   <span>Processing...</span>
//                 </div>
//               )}
//               {stripStatus === 'success' && (
//                 <div className="strip-success">✅ Metadata stripped successfully! Downloading...</div>
//               )}
//               {stripStatus === 'error' && (
//                 <div className="strip-error">❌ Failed to strip metadata. Please try again.</div>
//               )}
//               <div className="strip-modal-actions">
//                 <button 
//                   className="strip-modal-btn secondary"
//                   onClick={() => {
//                     setShowStripModal(false);
//                     setStripStatus(null);
//                   }}
//                   disabled={stripping}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="strip-modal-btn primary"
//                   onClick={handleStrip}
//                   disabled={stripping || stripStatus === 'success'}
//                 >
//                   {stripping ? 'Processing...' : 'Yes, Strip Metadata'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .actions-card-forensic {
//           background: #141b2b;
//           border-radius: 12px;
//           padding: 24px;
//           border-left: 3px solid #60a5fa;
//         }

//         .actions-title {
//           color: #8899bb;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 20px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .action-item {
//           display: flex;
//           gap: 14px;
//           padding: 16px;
//           background: #0f172a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           transition: all 0.3s ease;
//         }

//         .action-item:hover {
//           border-color: #2a3a5c;
//         }

//         .action-icon {
//           font-size: 28px;
//           line-height: 1;
//         }

//         .action-content {
//           flex: 1;
//         }

//         .action-label {
//           color: #e0e8f0;
//           font-weight: 600;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .action-desc {
//           color: #667799;
//           font-size: 12px;
//           margin-bottom: 8px;
//         }

//         .action-btn {
//           padding: 6px 16px;
//           border: none;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .action-btn:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }

//         .action-btn.primary {
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//         }

//         .action-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
//         }

//         .action-btn.secondary {
//           background: #2a3a5c;
//           color: white;
//         }

//         .action-btn.secondary:hover:not(:disabled) {
//           background: #3a4a6c;
//         }

//         .action-btn.tertiary {
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//         }

//         .action-btn.tertiary:hover:not(:disabled) {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         .hash-display {
//           margin-top: 6px;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .hash-display span {
//           color: #667799;
//           font-size: 10px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .hash-display code {
//           color: #00d4ff;
//           font-size: 11px;
//           font-family: "Courier New", monospace;
//           background: #0a0e1a;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }

//         /* Strip Modal */
//         .strip-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(10px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .strip-modal {
//           position: relative;
//           max-width: 480px;
//           width: 90%;
//           padding: 32px;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           background: #0f172a;
//         }

//         .strip-modal-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//         }

//         .strip-modal-corners span {
//           position: absolute;
//           width: 16px;
//           height: 16px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.4;
//         }

//         .strip-modal-corners span:nth-child(1) {
//           top: 10px;
//           left: 10px;
//           border-width: 2px 0 0 2px;
//         }

//         .strip-modal-corners span:nth-child(2) {
//           top: 10px;
//           right: 10px;
//           border-width: 2px 2px 0 0;
//         }

//         .strip-modal-corners span:nth-child(3) {
//           bottom: 10px;
//           left: 10px;
//           border-width: 0 0 2px 2px;
//         }

//         .strip-modal-corners span:nth-child(4) {
//           bottom: 10px;
//           right: 10px;
//           border-width: 0 2px 2px 0;
//         }

//         .strip-modal-content {
//           position: relative;
//           z-index: 1;
//           text-align: center;
//         }

//         .strip-modal-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//         }

//         .strip-modal h3 {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           margin-bottom: 12px;
//         }

//         .strip-modal p {
//           color: #829aa6;
//           font-size: 14px;
//           line-height: 1.6;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info-item {
//           padding: 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//         }

//         .strip-modal-info-item span {
//           display: block;
//           color: #667799;
//           font-size: 11px;
//           margin-bottom: 4px;
//         }

//         .strip-modal-info-item strong {
//           color: #e0e8f0;
//           font-size: 16px;
//         }

//         .strip-processing {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #1a2340;
//           border-radius: 8px;
//         }

//         .strip-spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid #1a2340;
//           border-top: 2px solid #00d4ff;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .strip-success {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #064e3b;
//           border: 1px solid #34d399;
//           border-radius: 8px;
//           color: #34d399;
//         }

//         .strip-error {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #7f1d1d;
//           border: 1px solid #f87171;
//           border-radius: 8px;
//           color: #f87171;
//         }

//         .strip-modal-actions {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//         }

//         .strip-modal-btn {
//           padding: 10px 24px;
//           border: none;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .strip-modal-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .strip-modal-btn.primary {
//           background: linear-gradient(135deg, #ef4444, #dc2626);
//           color: white;
//         }

//         .strip-modal-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
//         }

//         .strip-modal-btn.secondary {
//           background: #1a2340;
//           color: #8899bb;
//         }

//         .strip-modal-btn.secondary:hover:not(:disabled) {
//           background: #2a3a5c;
//         }

//         @media (max-width: 600px) {
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal {
//             padding: 24px 20px;
//           }

//           .strip-modal-info {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal-actions {
//             flex-direction: column;
//           }

//           .strip-modal-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ActionsCard = ({ file, results, onStrip, onExportPDF, onGenerateHash, onShareReport }) => {
//   const navigate = useNavigate();
//   const [showStripModal, setShowStripModal] = useState(false);
//   const [stripping, setStripping] = useState(false);
//   const [stripStatus, setStripStatus] = useState(null);
//   const [hashValue, setHashValue] = useState(null);
//   const [hashGenerating, setHashGenerating] = useState(false);

//   // ================================================================
//   //  1. STRIP METADATA - FIXED: single download trigger
//   // ================================================================
//   const handleStrip = async () => {
//     if (!file) {
//       alert('No file to strip metadata from!');
//       return;
//     }

//     setStripping(true);
//     setStripStatus('processing');

//     try {
//       const response = await onStrip(file);

//       if (response && response.success) {
//         setStripStatus('success');

//         // ✅ Trigger the download here (once)
//         if (response.download_url) {
//           const a = document.createElement('a');
//           a.href = response.download_url;
//           a.download = response.stripped_filename || 'stripped.jpg';
//           document.body.appendChild(a);
//           a.click();
//           document.body.removeChild(a);
//         }

//         setTimeout(() => {
//           setShowStripModal(false);
//           setStripStatus(null);
//         }, 2000);
//       } else {
//         setStripStatus('error');
//       }
//     } catch (err) {
//       console.error('Strip error:', err);
//       setStripStatus('error');
//     } finally {
//       setStripping(false);
//     }
//   };

//   // ================================================================
//   //  2. EXPORT PDF REPORT - Navigate to PDF page
//   // ================================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ================================================================
//   //  3. GENERATE EVIDENCE HASH
//   // ================================================================
//   const handleGenerateHash = async () => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     setHashGenerating(true);
//     try {
//       const hash = await onGenerateHash(file);
//       setHashValue(hash);
//     } catch (err) {
//       alert('Failed to generate hash: ' + err.message);
//     } finally {
//       setHashGenerating(false);
//     }
//   };

//   // ================================================================
//   //  4. SHARE REPORT - Export as JSON
//   // ================================================================
//   const handleShareReport = () => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     onShareReport(results);
//   };

//   return (
//     <div className="actions-card-forensic">
//       <h3 className="actions-title">🛠️ Forensic Actions</h3>
      
//       <div className="actions-grid">
        
//         {/* 1. Strip Metadata */}
//         <div className="action-item">
//           <div className="action-icon">🛡️</div>
//           <div className="action-content">
//             <div className="action-label">Strip Metadata</div>
//             <div className="action-desc">Remove all EXIF/GPS data for privacy</div>
//             <button 
//               className="action-btn primary"
//               onClick={() => setShowStripModal(true)}
//               disabled={!file}
//             >
//               ▶ Start Process
//             </button>
//           </div>
//         </div>

//         {/* 2. Export PDF Report */}
//         <div className="action-item">
//           <div className="action-icon">📄</div>
//           <div className="action-content">
//             <div className="action-label">Export PDF Report</div>
//             <div className="action-desc">Convert forensic report to PDF</div>
//             <button 
//               className="action-btn secondary"
//               onClick={handleExportPDF}
//               disabled={!results}
//             >
//               ▶ Generate PDF
//             </button>
//           </div>
//         </div>

//         {/* 3. Evidence Hash */}
//         <div className="action-item">
//           <div className="action-icon">🔐</div>
//           <div className="action-content">
//             <div className="action-label">Evidence Hash</div>
//             <div className="action-desc">Generate SHA-256 fingerprint</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleGenerateHash}
//               disabled={!file || hashGenerating}
//             >
//               {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
//             </button>
//             {hashValue && (
//               <div className="hash-display">
//                 <span>SHA-256:</span>
//                 <code>{hashValue.substring(0, 16)}...{hashValue.substring(hashValue.length - 8)}</code>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 4. Share Report */}
//         <div className="action-item">
//           <div className="action-icon">📤</div>
//           <div className="action-content">
//             <div className="action-label">Share Report</div>
//             <div className="action-desc">Export as JSON for sharing</div>
//             <button 
//               className="action-btn tertiary"
//               onClick={handleShareReport}
//               disabled={!results}
//             >
//               ▶ Export JSON
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* =========================================================
//           STRIP METADATA MODAL
//       ========================================================= */}
//       {showStripModal && (
//         <div className="strip-modal-overlay" onClick={() => !stripping && setShowStripModal(false)}>
//           <div className="strip-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="strip-modal-corners">
//               <span></span><span></span><span></span><span></span>
//             </div>
//             <div className="strip-modal-content">
//               <div className="strip-modal-icon">⚠️</div>
//               <h3>Remove All Metadata?</h3>
//               <p>
//                 This will permanently remove all EXIF, GPS, camera, 
//                 and timestamp data from the image. This action cannot be undone.
//               </p>
//               <div className="strip-modal-info">
//                 <div className="strip-modal-info-item">
//                   <span>Original Size</span>
//                   <strong>4.6 MB</strong>
//                 </div>
//                 <div className="strip-modal-info-item">
//                   <span>Data to Remove</span>
//                   <strong style={{ color: '#f59e0b' }}>~0.1 MB</strong>
//                 </div>
//               </div>
//               {stripStatus === 'processing' && (
//                 <div className="strip-processing">
//                   <div className="strip-spinner"></div>
//                   <span>Processing...</span>
//                 </div>
//               )}
//               {stripStatus === 'success' && (
//                 <div className="strip-success">✅ Metadata stripped successfully! Downloading...</div>
//               )}
//               {stripStatus === 'error' && (
//                 <div className="strip-error">❌ Failed to strip metadata. Please try again.</div>
//               )}
//               <div className="strip-modal-actions">
//                 <button 
//                   className="strip-modal-btn secondary"
//                   onClick={() => {
//                     setShowStripModal(false);
//                     setStripStatus(null);
//                   }}
//                   disabled={stripping}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="strip-modal-btn primary"
//                   onClick={handleStrip}
//                   disabled={stripping || stripStatus === 'success'}
//                 >
//                   {stripping ? 'Processing...' : 'Yes, Strip Metadata'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .actions-card-forensic {
//           background: #141b2b;
//           border-radius: 12px;
//           padding: 24px;
//           border-left: 3px solid #60a5fa;
//         }

//         .actions-title {
//           color: #8899bb;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 20px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .action-item {
//           display: flex;
//           gap: 14px;
//           padding: 16px;
//           background: #0f172a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           transition: all 0.3s ease;
//         }

//         .action-item:hover {
//           border-color: #2a3a5c;
//         }

//         .action-icon {
//           font-size: 28px;
//           line-height: 1;
//         }

//         .action-content {
//           flex: 1;
//         }

//         .action-label {
//           color: #e0e8f0;
//           font-weight: 600;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .action-desc {
//           color: #667799;
//           font-size: 12px;
//           margin-bottom: 8px;
//         }

//         .action-btn {
//           padding: 6px 16px;
//           border: none;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .action-btn:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }

//         .action-btn.primary {
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//         }

//         .action-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
//         }

//         .action-btn.secondary {
//           background: #2a3a5c;
//           color: white;
//         }

//         .action-btn.secondary:hover:not(:disabled) {
//           background: #3a4a6c;
//         }

//         .action-btn.tertiary {
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//         }

//         .action-btn.tertiary:hover:not(:disabled) {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         .hash-display {
//           margin-top: 6px;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .hash-display span {
//           color: #667799;
//           font-size: 10px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .hash-display code {
//           color: #00d4ff;
//           font-size: 11px;
//           font-family: "Courier New", monospace;
//           background: #0a0e1a;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }

//         /* Strip Modal */
//         .strip-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(10px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .strip-modal {
//           position: relative;
//           max-width: 480px;
//           width: 90%;
//           padding: 32px;
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           background: #0f172a;
//         }

//         .strip-modal-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//         }

//         .strip-modal-corners span {
//           position: absolute;
//           width: 16px;
//           height: 16px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.4;
//         }

//         .strip-modal-corners span:nth-child(1) {
//           top: 10px;
//           left: 10px;
//           border-width: 2px 0 0 2px;
//         }

//         .strip-modal-corners span:nth-child(2) {
//           top: 10px;
//           right: 10px;
//           border-width: 2px 2px 0 0;
//         }

//         .strip-modal-corners span:nth-child(3) {
//           bottom: 10px;
//           left: 10px;
//           border-width: 0 0 2px 2px;
//         }

//         .strip-modal-corners span:nth-child(4) {
//           bottom: 10px;
//           right: 10px;
//           border-width: 0 2px 2px 0;
//         }

//         .strip-modal-content {
//           position: relative;
//           z-index: 1;
//           text-align: center;
//         }

//         .strip-modal-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//         }

//         .strip-modal h3 {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           margin-bottom: 12px;
//         }

//         .strip-modal p {
//           color: #829aa6;
//           font-size: 14px;
//           line-height: 1.6;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .strip-modal-info-item {
//           padding: 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//         }

//         .strip-modal-info-item span {
//           display: block;
//           color: #667799;
//           font-size: 11px;
//           margin-bottom: 4px;
//         }

//         .strip-modal-info-item strong {
//           color: #e0e8f0;
//           font-size: 16px;
//         }

//         .strip-processing {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #1a2340;
//           border-radius: 8px;
//         }

//         .strip-spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid #1a2340;
//           border-top: 2px solid #00d4ff;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .strip-success {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #064e3b;
//           border: 1px solid #34d399;
//           border-radius: 8px;
//           color: #34d399;
//         }

//         .strip-error {
//           padding: 12px;
//           margin-bottom: 16px;
//           background: #7f1d1d;
//           border: 1px solid #f87171;
//           border-radius: 8px;
//           color: #f87171;
//         }

//         .strip-modal-actions {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//         }

//         .strip-modal-btn {
//           padding: 10px 24px;
//           border: none;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .strip-modal-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .strip-modal-btn.primary {
//           background: linear-gradient(135deg, #ef4444, #dc2626);
//           color: white;
//         }

//         .strip-modal-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
//         }

//         .strip-modal-btn.secondary {
//           background: #1a2340;
//           color: #8899bb;
//         }

//         .strip-modal-btn.secondary:hover:not(:disabled) {
//           background: #2a3a5c;
//         }

//         @media (max-width: 600px) {
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal {
//             padding: 24px 20px;
//           }

//           .strip-modal-info {
//             grid-template-columns: 1fr;
//           }

//           .strip-modal-actions {
//             flex-direction: column;
//           }

//           .strip-modal-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;












// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ActionsCard = ({ file, results, onExportPDF, onGenerateHash, onShareReport }) => {
//   const navigate = useNavigate();
//   const [hashValue, setHashValue] = useState(null);
//   const [hashGenerating, setHashGenerating] = useState(false);

//   // ================================================================
//   //  EXPORT PDF REPORT
//   // ================================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ================================================================
//   //  GENERATE EVIDENCE HASH
//   // ================================================================
//   const handleGenerateHash = async () => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     setHashGenerating(true);
//     try {
//       const hash = await onGenerateHash(file);
//       setHashValue(hash);
//     } catch (err) {
//       alert('Failed to generate hash: ' + err.message);
//     } finally {
//       setHashGenerating(false);
//     }
//   };

//   // ================================================================
//   //  SHARE REPORT
//   // ================================================================
//   const handleShareReport = () => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     onShareReport(results);
//   };

//   return (
//     <div className="actions-card-forensic">
//       <h3 className="actions-title">🛠️ Forensic Actions</h3>

//       <div className="actions-grid">

//         {/* 1. Export PDF Report */}
//         <div className="action-item">
//           <div className="action-icon">📄</div>
//           <div className="action-content">
//             <div className="action-label">Export PDF Report</div>
//             <div className="action-desc">Convert forensic report to PDF</div>
//             <button
//               className="action-btn secondary"
//               onClick={handleExportPDF}
//               disabled={!results}
//             >
//               ▶ Generate PDF
//             </button>
//           </div>
//         </div>

//         {/* 2. Evidence Hash */}
//         <div className="action-item">
//           <div className="action-icon">🔐</div>
//           <div className="action-content">
//             <div className="action-label">Evidence Hash</div>
//             <div className="action-desc">Generate SHA-256 fingerprint</div>
//             <button
//               className="action-btn tertiary"
//               onClick={handleGenerateHash}
//               disabled={!file || hashGenerating}
//             >
//               {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
//             </button>
//             {hashValue && (
//               <div className="hash-display">
//                 <span>SHA-256:</span>
//                 <code>{hashValue.substring(0, 16)}...{hashValue.substring(hashValue.length - 8)}</code>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 3. Share Report */}
//         <div className="action-item">
//           <div className="action-icon">📤</div>
//           <div className="action-content">
//             <div className="action-label">Share Report</div>
//             <div className="action-desc">Export as JSON for sharing</div>
//             <button
//               className="action-btn tertiary"
//               onClick={handleShareReport}
//               disabled={!results}
//             >
//               ▶ Export JSON
//             </button>
//           </div>
//         </div>

//       </div>

//       <style jsx>{`
//         .actions-card-forensic {
//           background: #141b2b;
//           border-radius: 12px;
//           padding: 24px;
//           border-left: 3px solid #60a5fa;
//         }

//         .actions-title {
//           color: #8899bb;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 20px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .action-item {
//           display: flex;
//           gap: 14px;
//           padding: 16px;
//           background: #0f172a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           transition: all 0.3s ease;
//         }

//         .action-item:hover {
//           border-color: #2a3a5c;
//         }

//         .action-icon {
//           font-size: 28px;
//           line-height: 1;
//         }

//         .action-content {
//           flex: 1;
//         }

//         .action-label {
//           color: #e0e8f0;
//           font-weight: 600;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .action-desc {
//           color: #667799;
//           font-size: 12px;
//           margin-bottom: 8px;
//         }

//         .action-btn {
//           padding: 6px 16px;
//           border: none;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .action-btn:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }

//         .action-btn.secondary {
//           background: #2a3a5c;
//           color: white;
//         }

//         .action-btn.secondary:hover:not(:disabled) {
//           background: #3a4a6c;
//         }

//         .action-btn.tertiary {
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//         }

//         .action-btn.tertiary:hover:not(:disabled) {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         .hash-display {
//           margin-top: 6px;
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }

//         .hash-display span {
//           color: #667799;
//           font-size: 10px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .hash-display code {
//           color: #00d4ff;
//           font-size: 11px;
//           font-family: "Courier New", monospace;
//           background: #0a0e1a;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }

//         @media (max-width: 600px) {
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ActionsCard = ({ file, results, onExportPDF, onGenerateHash, onShareReport }) => {
//   const navigate = useNavigate();
//   const [hashValue, setHashValue] = useState(results?.sha256 || null);
//   const [hashGenerating, setHashGenerating] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // Auto-load hash from results if it was set elsewhere
//   useEffect(() => {
//     if (results?.sha256 && !hashValue) {
//       setHashValue(results.sha256);
//     }
//   }, [results?.sha256, hashValue]);

//   // ================================================================
//   //  EXPORT PDF REPORT
//   // ================================================================
//   const handleExportPDF = () => {
//     if (!results) {
//       alert('No results to export! Please analyze an image first.');
//       return;
//     }
//     navigate('/pdf-report', { state: { results, file } });
//   };

//   // ================================================================
//   //  GENERATE EVIDENCE HASH
//   // ================================================================
//   const handleGenerateHash = async () => {
//     if (!file) {
//       alert('No file uploaded!');
//       return;
//     }
//     setHashGenerating(true);
//     try {
//       const hash = await onGenerateHash(file);
//       setHashValue(hash);
//       if (results) results.sha256 = hash;
//     } catch (err) {
//       alert('Failed to generate hash: ' + err.message);
//     } finally {
//       setHashGenerating(false);
//     }
//   };

//   // ================================================================
//   //  COPY HASH TO CLIPBOARD
//   // ================================================================
//   const handleCopyHash = () => {
//     if (!hashValue) return;
//     navigator.clipboard.writeText(hashValue).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     });
//   };

//   // ================================================================
//   //  SHARE REPORT
//   // ================================================================
//   const handleShareReport = () => {
//     if (!results) {
//       alert('No results to share! Please analyze an image first.');
//       return;
//     }
//     onShareReport(results);
//   };

//   return (
//     <div className="actions-card-forensic">
//       <h3 className="actions-title">🛠️ Forensic Actions</h3>

//       <div className="actions-grid">

//         {/* 1. Export PDF Report */}
//         <div className="action-item">
//           <div className="action-icon">📄</div>
//           <div className="action-content">
//             <div className="action-label">Export PDF Report</div>
//             <div className="action-desc">Convert forensic report to PDF</div>
//             <button
//               className="action-btn secondary"
//               onClick={handleExportPDF}
//               disabled={!results}
//             >
//               ▶ Generate PDF
//             </button>
//           </div>
//         </div>

//         {/* 2. Evidence Hash */}
//         <div className="action-item">
//           <div className="action-icon">🔐</div>
//           <div className="action-content">
//             <div className="action-label">Evidence Hash</div>
//             <div className="action-desc">Generate SHA-256 fingerprint</div>
//             <button
//               className="action-btn tertiary"
//               onClick={handleGenerateHash}
//               disabled={!file || hashGenerating}
//             >
//               {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
//             </button>
//             {hashValue && (
//               <div className="hash-display">
//                 <span>SHA-256:</span>
//                 <code style={{
//                   wordBreak: 'break-all',
//                   whiteSpace: 'normal',
//                   display: 'block',
//                   padding: '6px',
//                   lineHeight: 1.4
//                 }}>
//                   {hashValue}
//                 </code>
//                 <button
//                   className="hash-copy-btn"
//                   onClick={handleCopyHash}
//                 >
//                   {copied ? '✅ Copied!' : '📋 Copy Hash'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 3. Share Report */}
//         <div className="action-item">
//           <div className="action-icon">📤</div>
//           <div className="action-content">
//             <div className="action-label">Share Report</div>
//             <div className="action-desc">Export as JSON for sharing</div>
//             <button
//               className="action-btn tertiary"
//               onClick={handleShareReport}
//               disabled={!results}
//             >
//               ▶ Export JSON
//             </button>
//           </div>
//         </div>

//       </div>

//       <style jsx>{`
//         .actions-card-forensic {
//           background: #141b2b;
//           border-radius: 12px;
//           padding: 24px;
//           border-left: 3px solid #60a5fa;
//         }

//         .actions-title {
//           color: #8899bb;
//           font-size: 13px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 20px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .actions-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .action-item {
//           display: flex;
//           gap: 14px;
//           padding: 16px;
//           background: #0f172a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           transition: all 0.3s ease;
//         }

//         .action-item:hover {
//           border-color: #2a3a5c;
//         }

//         .action-icon {
//           font-size: 28px;
//           line-height: 1;
//         }

//         .action-content {
//           flex: 1;
//           min-width: 0;
//         }

//         .action-label {
//           color: #e0e8f0;
//           font-weight: 600;
//           font-size: 14px;
//           margin-bottom: 4px;
//         }

//         .action-desc {
//           color: #667799;
//           font-size: 12px;
//           margin-bottom: 8px;
//         }

//         .action-btn {
//           padding: 6px 16px;
//           border: none;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .action-btn:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//         }

//         .action-btn.secondary {
//           background: #2a3a5c;
//           color: white;
//         }

//         .action-btn.secondary:hover:not(:disabled) {
//           background: #3a4a6c;
//         }

//         .action-btn.tertiary {
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//         }

//         .action-btn.tertiary:hover:not(:disabled) {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         .hash-display {
//           margin-top: 8px;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .hash-display span {
//           color: #667799;
//           font-size: 10px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .hash-display code {
//           color: #00d4ff;
//           font-size: 11px;
//           font-family: "Courier New", monospace;
//           background: #0a0e1a;
//           padding: 6px;
//           border-radius: 4px;
//           border: 1px solid #1a2340;
//         }

//         .hash-copy-btn {
//           align-self: flex-start;
//           padding: 4px 10px;
//           font-size: 11px;
//           font-weight: 600;
//           background: transparent;
//           color: #667799;
//           border: 1px solid #1a2340;
//           border-radius: 4px;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           font-family: "Rajdhani", sans-serif;
//         }

//         .hash-copy-btn:hover {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         @media (max-width: 600px) {
//           .actions-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ActionsCard;












import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionsCard = ({ file, results, onExportPDF, onGenerateHash, onShareReport }) => {
  const navigate = useNavigate();
  const [hashValue, setHashValue] = useState(results?.sha256 || null);
  const [hashGenerating, setHashGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (results?.sha256 && !hashValue) {
      setHashValue(results.sha256);
    }
  }, [results?.sha256, hashValue]);

  // ================================================================
  //  EXPORT PDF REPORT
  // ================================================================
  const handleExportPDF = () => {
    if (!results) {
      alert('No results to export! Please analyze an image first.');
      return;
    }
    navigate('/pdf-report', { state: { results, file } });
  };

  // ================================================================
  //  GENERATE EVIDENCE HASH
  // ================================================================
  const handleGenerateHash = async () => {
    if (!file) {
      alert('No file uploaded!');
      return;
    }
    setHashGenerating(true);
    try {
      const hash = await onGenerateHash(file);
      setHashValue(hash);
      if (results) results.sha256 = hash;
    } catch (err) {
      alert('Failed to generate hash: ' + err.message);
    } finally {
      setHashGenerating(false);
    }
  };

  const handleCopyHash = () => {
    if (!hashValue) return;
    navigator.clipboard.writeText(hashValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // ================================================================
  //  BUILD SHARE SUMMARY TEXT
  // ================================================================
  const buildShareText = () => {
    if (!results) return '';
    const verdict = results.verdict || {};
    const gps = results.gps || {};
    const exif = results.exif || {};
    const platform = results.platform_details || {};
    const file_name = results.file_name || 'image';
    const sha = results.sha256 || hashValue || 'N/A';

    return `🔍 MetaLens Forensic Report

📁 File: ${file_name}
⚖️ Verdict: ${verdict.authenticity || 'UNKNOWN'} (${verdict.score || 0}%)
📱 Device: ${exif['IFD0:Make'] || 'Unknown'} ${exif['IFD0:Model'] || ''}
🌐 Platform: ${platform.name || 'Unknown'}
📍 Location: ${gps.address || (gps.lat ? `${gps.lat}, ${gps.lon}` : 'N/A')}
🕐 Captured: ${results.timestamp?.original || 'N/A'}
🔐 SHA-256: ${sha}

Generated by MetaLens v2.0`;
  };

  // ================================================================
  //  SHARE HANDLERS
  // ================================================================
  const handleNativeShare = async () => {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MetaLens Report — ${results?.file_name || 'Image'}`,
          text: text,
        });
      } catch (err) {
        // user cancelled — do nothing
      }
    } else {
      alert('Native share not supported on this browser. Use Email / WhatsApp / Copy instead.');
    }
  };

  const handleShareEmail = () => {
    const text = buildShareText();
    const subject = `MetaLens Forensic Report — ${results?.file_name || 'Image'}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };

  const handleShareWhatsApp = () => {
    const text = buildShareText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = buildShareText();
    navigator.clipboard.writeText(text).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    });
  };

  const handleDownloadJSON = () => {
    if (!results) {
      alert('No results to share! Please analyze an image first.');
      return;
    }
    onShareReport(results);
  };

  // ================================================================
  //  OPEN SHARE MODAL
  // ================================================================
  const handleShareReport = () => {
    if (!results) {
      alert('No results to share! Please analyze an image first.');
      return;
    }
    setShowShareModal(true);
  };

  return (
    <div className="actions-card-forensic">
      <h3 className="actions-title">🛠️ Forensic Actions</h3>

      <div className="actions-grid">

        {/* 1. Export PDF Report */}
        <div className="action-item">
          <div className="action-icon">📄</div>
          <div className="action-content">
            <div className="action-label">Export PDF Report</div>
            <div className="action-desc">Convert forensic report to PDF</div>
            <button
              className="action-btn secondary"
              onClick={handleExportPDF}
              disabled={!results}
            >
              ▶ Generate PDF
            </button>
          </div>
        </div>

        {/* 2. Evidence Hash */}
        <div className="action-item">
          <div className="action-icon">🔐</div>
          <div className="action-content">
            <div className="action-label">Evidence Hash</div>
            <div className="action-desc">Generate SHA-256 fingerprint</div>
            <button
              className="action-btn tertiary"
              onClick={handleGenerateHash}
              disabled={!file || hashGenerating}
            >
              {hashGenerating ? '⏳ Generating...' : '▶ Generate Hash'}
            </button>
            {hashValue && (
              <div className="hash-display">
                <span>SHA-256:</span>
                <code style={{
                  wordBreak: 'break-all',
                  whiteSpace: 'normal',
                  display: 'block',
                  padding: '6px',
                  lineHeight: 1.4
                }}>
                  {hashValue}
                </code>
                <button
                  className="hash-copy-btn"
                  onClick={handleCopyHash}
                >
                  {copied ? '✅ Copied!' : '📋 Copy Hash'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Share Report */}
        <div className="action-item">
          <div className="action-icon">📤</div>
          <div className="action-content">
            <div className="action-label">Share Report</div>
            <div className="action-desc">Email, WhatsApp, copy & more</div>
            <button
              className="action-btn tertiary"
              onClick={handleShareReport}
              disabled={!results}
            >
              ▶ Share Report
            </button>
          </div>
        </div>

      </div>

      {/* =========================================================
          SHARE MODAL
      ========================================================= */}
      {showShareModal && (
        <div
          className="share-modal-overlay"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="share-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-modal-corners">
              <span></span><span></span><span></span><span></span>
            </div>

            <h3 className="share-modal-title">📤 Share Forensic Report</h3>
            <p className="share-modal-desc">
              Choose how you want to share this report.
            </p>

            <div className="share-grid">

              {/* Native Share */}
              <button className="share-item" onClick={handleNativeShare}>
                <span className="share-icon">📲</span>
                <span className="share-name">Native Share</span>
                <span className="share-sub">WhatsApp, Insta, Gmail & more</span>
              </button>

              {/* Email */}
              <button className="share-item" onClick={handleShareEmail}>
                <span className="share-icon">📧</span>
                <span className="share-name">Email</span>
                <span className="share-sub">Open default mail app</span>
              </button>

              {/* WhatsApp */}
              <button className="share-item" onClick={handleShareWhatsApp}>
                <span className="share-icon">💬</span>
                <span className="share-name">WhatsApp</span>
                <span className="share-sub">Send via WhatsApp Web</span>
              </button>

              {/* Copy Summary */}
              <button className="share-item" onClick={handleCopySummary}>
                <span className="share-icon">{shareCopied ? '✅' : '📋'}</span>
                <span className="share-name">
                  {shareCopied ? 'Copied!' : 'Copy Summary'}
                </span>
                <span className="share-sub">Copy text to clipboard</span>
              </button>

              {/* Download PDF */}
              <button className="share-item" onClick={() => {
                setShowShareModal(false);
                handleExportPDF();
              }}>
                <span className="share-icon">📄</span>
                <span className="share-name">Download PDF</span>
                <span className="share-sub">Export as printable PDF</span>
              </button>

              {/* Download JSON */}
              <button className="share-item" onClick={() => {
                setShowShareModal(false);
                handleDownloadJSON();
              }}>
                <span className="share-icon">💾</span>
                <span className="share-name">Download JSON</span>
                <span className="share-sub">Raw report data</span>
              </button>

            </div>

            <button
              className="share-close-btn"
              onClick={() => setShowShareModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .actions-card-forensic {
          background: #141b2b;
          border-radius: 12px;
          padding: 24px;
          border-left: 3px solid #60a5fa;
        }

        .actions-title {
          color: #8899bb;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          font-family: "Orbitron", sans-serif;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .action-item {
          display: flex;
          gap: 14px;
          padding: 16px;
          background: #0f172a;
          border: 1px solid #1a2340;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .action-item:hover {
          border-color: #2a3a5c;
        }

        .action-icon {
          font-size: 28px;
          line-height: 1;
        }

        .action-content {
          flex: 1;
          min-width: 0;
        }

        .action-label {
          color: #e0e8f0;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .action-desc {
          color: #667799;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .action-btn {
          padding: 6px 16px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Rajdhani", sans-serif;
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .action-btn.secondary {
          background: #2a3a5c;
          color: white;
        }

        .action-btn.secondary:hover:not(:disabled) {
          background: #3a4a6c;
        }

        .action-btn.tertiary {
          background: transparent;
          color: #667799;
          border: 1px solid #1a2340;
        }

        .action-btn.tertiary:hover:not(:disabled) {
          border-color: #00d4ff;
          color: #00d4ff;
        }

        .hash-display {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hash-display span {
          color: #667799;
          font-size: 10px;
          font-family: "Orbitron", sans-serif;
        }

        .hash-display code {
          color: #00d4ff;
          font-size: 11px;
          font-family: "Courier New", monospace;
          background: #0a0e1a;
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #1a2340;
        }

        .hash-copy-btn {
          align-self: flex-start;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          background: transparent;
          color: #667799;
          border: 1px solid #1a2340;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: "Rajdhani", sans-serif;
        }

        .hash-copy-btn:hover {
          border-color: #00d4ff;
          color: #00d4ff;
        }

        /* Share Modal */
        .share-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .share-modal {
          position: relative;
          max-width: 560px;
          width: 100%;
          padding: 28px;
          background: #0f172a;
          border: 1px solid rgba(0, 218, 255, 0.25);
        }

        .share-modal-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .share-modal-corners span {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: #00e1ff;
          border-style: solid;
          opacity: 0.4;
        }

        .share-modal-corners span:nth-child(1) { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .share-modal-corners span:nth-child(2) { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .share-modal-corners span:nth-child(3) { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
        .share-modal-corners span:nth-child(4) { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        .share-modal-title {
          font-family: "Orbitron", sans-serif;
          font-size: 16px;
          color: #edfaff;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .share-modal-desc {
          color: #829aa6;
          font-size: 13px;
          text-align: center;
          margin: 0 0 20px 0;
        }

        .share-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .share-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 14px 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          font-family: "Rajdhani", sans-serif;
        }

        .share-item:hover {
          border-color: #00d4ff;
          background: rgba(0, 218, 255, 0.05);
          transform: translateY(-2px);
        }

        .share-icon {
          font-size: 24px;
          line-height: 1;
        }

        .share-name {
          color: #e0e8f0;
          font-weight: 600;
          font-size: 14px;
        }

        .share-sub {
          color: #667799;
          font-size: 11px;
        }

        .share-close-btn {
          display: block;
          margin: 0 auto;
          padding: 10px 32px;
          background: #1a2340;
          color: #8899bb;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: "Rajdhani", sans-serif;
        }

        .share-close-btn:hover {
          background: #2a3a5c;
        }

        @media (max-width: 600px) {
          .actions-grid {
            grid-template-columns: 1fr;
          }
          .share-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ActionsCard;