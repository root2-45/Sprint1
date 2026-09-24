// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const FilePickerModal = ({ onClose }) => {
//   const inputRef = useRef(null);
//   const [pickedFile, setPickedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [errorMsg, setErrorMsg] = useState('');

//   const openFilePicker = () => {
//     inputRef.current?.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setErrorMsg('Please select an image file (JPG, PNG, WEBP, etc.)');
//       setStatus('error');
//       return;
//     }

//     setPickedFile(file);
//     setPreview(URL.createObjectURL(file));
//     setStatus(null);
//     setErrorMsg('');
//   };

//   const handleStrip = async () => {
//     if (!pickedFile) {
//       setErrorMsg('Please pick a file first.');
//       setStatus('error');
//       return;
//     }

//     setProcessing(true);
//     setStatus('processing');
//     setErrorMsg('');

//     const formData = new FormData();
//     formData.append('file', pickedFile);

//     try {
//       const response = await axios.post('/api/strip', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 60000,
//       });

//       if (response.data?.success) {
//         setStatus('success');

//         const url = response.data.download_url;
//         if (url) {
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = response.data.stripped_filename || 'stripped.jpg';
//           document.body.appendChild(a);
//           a.click();
//           document.body.removeChild(a);
//         }

//         setTimeout(() => onClose?.(), 2000);
//       } else {
//         setStatus('error');
//         setErrorMsg(response.data?.error || 'Strip failed.');
//       }
//     } catch (err) {
//       console.error('Strip error:', err);
//       setStatus('error');
//       setErrorMsg(err.response?.data?.error || err.message || 'Strip failed.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const resetPick = () => {
//     setPickedFile(null);
//     setPreview(null);
//     setStatus(null);
//     setErrorMsg('');
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   return (
//     <div className="fpm-overlay" onClick={() => !processing && onClose?.()}>
//       <div className="fpm-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="fpm-corners">
//           <span></span><span></span><span></span><span></span>
//         </div>

//         <h3 className="fpm-title">📂 Pick a Photo From Your Folder</h3>
//         <p className="fpm-sub">
//           Select any image from your computer. MetaLens will strip all EXIF,
//           GPS, camera and timestamp data, then give you a clean copy to download.
//         </p>

//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />

//         {!pickedFile ? (
//           <button className="fpm-pick-btn" onClick={openFilePicker}>
//             <span className="fpm-pick-icon">📁</span>
//             <span>Browse Files…</span>
//             <small>JPG · PNG · WEBP · TIFF · HEIC</small>
//           </button>
//         ) : (
//           <div className="fpm-preview-wrap">
//             <div className="fpm-preview-frame">
//               <img src={preview} alt="preview" className="fpm-preview-img" />
//             </div>
//             <div className="fpm-file-info">
//               <div className="fpm-file-name" title={pickedFile.name}>
//                 {pickedFile.name}
//               </div>
//               <div className="fpm-file-meta">
//                 {(pickedFile.size / 1024).toFixed(1)} KB
//               </div>
//             </div>
//             <button
//               className="fpm-change-btn"
//               onClick={openFilePicker}
//               disabled={processing}
//             >
//               Change File
//             </button>
//           </div>
//         )}

//         {status === 'processing' && (
//           <div className="fpm-status fpm-status-processing">
//             <div className="fpm-spinner" />
//             <span>Stripping metadata…</span>
//           </div>
//         )}
//         {status === 'success' && (
//           <div className="fpm-status fpm-status-success">
//             ✅ Done! Your download should start automatically.
//           </div>
//         )}
//         {status === 'error' && (
//           <div className="fpm-status fpm-status-error">
//             ❌ {errorMsg || 'Something went wrong.'}
//           </div>
//         )}

//         <div className="fpm-actions">
//           <button
//             className="fpm-btn secondary"
//             onClick={onClose}
//             disabled={processing}
//           >
//             Cancel
//           </button>
//           <button
//             className="fpm-btn primary"
//             onClick={handleStrip}
//             disabled={!pickedFile || processing}
//           >
//             {processing ? 'Processing…' : '🛡️ Strip & Download'}
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .fpm-overlay {
//           position: fixed; inset: 0; z-index: 2000;
//           background: rgba(0,0,0,0.85);
//           backdrop-filter: blur(10px);
//           display: flex; align-items: center; justify-content: center;
//           padding: 20px;
//         }
//         .fpm-modal {
//           position: relative;
//           max-width: 520px; width: 100%;
//           background: #0f172a;
//           border: 1px solid rgba(0,218,255,0.25);
//           padding: 28px;
//           color: #e0e8f0;
//           font-family: "Rajdhani", sans-serif;
//         }
//         .fpm-corners { position: absolute; inset: 0; pointer-events: none; }
//         .fpm-corners span {
//           position: absolute; width: 16px; height: 16px;
//           border-color: #00e1ff; border-style: solid; opacity: 0.4;
//         }
//         .fpm-corners span:nth-child(1){top:10px;left:10px;border-width:2px 0 0 2px;}
//         .fpm-corners span:nth-child(2){top:10px;right:10px;border-width:2px 2px 0 0;}
//         .fpm-corners span:nth-child(3){bottom:10px;left:10px;border-width:0 0 2px 2px;}
//         .fpm-corners span:nth-child(4){bottom:10px;right:10px;border-width:0 2px 2px 0;}

//         .fpm-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 16px; color: #edfaff;
//           margin: 0 0 8px 0;
//         }
//         .fpm-sub {
//           color: #829aa6; font-size: 13px; line-height: 1.6;
//           margin: 0 0 20px 0;
//         }

//         .fpm-pick-btn {
//           width: 100%;
//           padding: 28px 20px;
//           background: #0a0e1a;
//           border: 1px dashed rgba(0,218,255,0.35);
//           color: #a0cbd6;
//           display: flex; flex-direction: column;
//           align-items: center; gap: 6px;
//           cursor: pointer;
//           transition: all 0.25s ease;
//         }
//         .fpm-pick-btn:hover {
//           border-color: #00dfff;
//           background: rgba(0,210,255,0.05);
//           color: #edfaff;
//         }
//         .fpm-pick-icon { font-size: 34px; }
//         .fpm-pick-btn small { color: #667799; font-size: 11px; letter-spacing: 1px; }

//         .fpm-preview-wrap { display: flex; flex-direction: column; gap: 12px; }
//         .fpm-preview-frame {
//           border: 1px solid rgba(0,218,255,0.25);
//           padding: 6px; background: #0a0e1a;
//           max-height: 220px; overflow: hidden;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .fpm-preview-img {
//           max-width: 100%; max-height: 200px;
//           object-fit: contain; display: block;
//         }
//         .fpm-file-info {
//           display: flex; justify-content: space-between; align-items: center;
//           gap: 10px; font-size: 13px;
//         }
//         .fpm-file-name {
//           color: #edfaff; font-weight: 600;
//           overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
//           max-width: 260px;
//         }
//         .fpm-file-meta { color: #667799; font-size: 11px; }
//         .fpm-change-btn {
//           align-self: flex-start;
//           background: transparent; color: #00dfff;
//           border: 1px solid rgba(0,218,255,0.4);
//           padding: 6px 14px; font-size: 12px;
//           cursor: pointer; transition: all 0.2s ease;
//         }
//         .fpm-change-btn:hover:not(:disabled) {
//           background: rgba(0,218,255,0.08);
//         }

//         .fpm-status {
//           margin-top: 16px;
//           padding: 12px;
//           border-radius: 6px;
//           font-size: 13px;
//           display: flex; align-items: center; gap: 10px;
//         }
//         .fpm-status-processing { background: #1a2340; color: #a0cbd6; }
//         .fpm-status-success { background: #064e3b; border: 1px solid #34d399; color: #34d399; }
//         .fpm-status-error { background: #7f1d1d; border: 1px solid #f87171; color: #f87171; }

//         .fpm-spinner {
//           width: 16px; height: 16px;
//           border: 2px solid #1a2340;
//           border-top-color: #00d4ff;
//           border-radius: 50%;
//           animation: fpm-spin 0.8s linear infinite;
//         }
//         @keyframes fpm-spin { to { transform: rotate(360deg); } }

//         .fpm-actions {
//           display: flex; gap: 12px; justify-content: flex-end;
//           margin-top: 20px;
//         }
//         .fpm-btn {
//           padding: 10px 20px;
//           border: none; border-radius: 6px;
//           font-size: 13px; font-weight: 600;
//           cursor: pointer; transition: all 0.25s ease;
//           font-family: "Rajdhani", sans-serif;
//         }
//         .fpm-btn:disabled { opacity: 0.45; cursor: not-allowed; }
//         .fpm-btn.primary {
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: #fff;
//         }
//         .fpm-btn.primary:hover:not(:disabled) {
//           transform: scale(1.02);
//           box-shadow: 0 0 20px rgba(0,212,255,0.25);
//         }
//         .fpm-btn.secondary {
//           background: #1a2340; color: #8899bb;
//         }
//         .fpm-btn.secondary:hover:not(:disabled) { background: #2a3a5c; }

//         @media (max-width: 520px) {
//           .fpm-modal { padding: 22px 18px; }
//           .fpm-actions { flex-direction: column; }
//           .fpm-btn { width: 100%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FilePickerModal;











import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilePickerModal from './FilePickerModal';

const ActionsCard = ({ file, results, onStrip, onExportPDF, onGenerateHash, onShareReport }) => {
  const navigate = useNavigate();
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [hashValue, setHashValue] = useState(null);
  const [hashGenerating, setHashGenerating] = useState(false);

  const handleExportPDF = () => {
    if (!results) {
      alert('No results to export! Please analyze an image first.');
      return;
    }
    navigate('/pdf-report', { state: { results, file } });
  };

  const handleGenerateHash = async () => {
    if (!file) {
      alert('No file uploaded!');
      return;
    }
    setHashGenerating(true);
    try {
      const hash = await onGenerateHash(file);
      setHashValue(hash);
    } catch (err) {
      alert('Failed to generate hash: ' + err.message);
    } finally {
      setHashGenerating(false);
    }
  };

  const handleShareReport = () => {
    if (!results) {
      alert('No results to share! Please analyze an image first.');
      return;
    }
    onShareReport(results);
  };

  return (
    <div className="actions-card-forensic">
      <h3 className="actions-title">🛠️ Forensic Actions</h3>
      
      <div className="actions-grid">

        {/* 1. Pick File From Folder (working strip flow) */}
        <div className="action-item">
          <div className="action-icon">📂</div>
          <div className="action-content">
            <div className="action-label">Strip Metadata</div>
            <div className="action-desc">Browse your device, strip metadata & download</div>
            <button
              className="action-btn primary"
              onClick={() => setShowPickerModal(true)}
            >
              ▶ Browse & Strip
            </button>
          </div>
        </div>

        {/* 2. Export PDF Report */}
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

        {/* 3. Evidence Hash */}
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
                <code>{hashValue.substring(0, 16)}...{hashValue.substring(hashValue.length - 8)}</code>
              </div>
            )}
          </div>
        </div>

        {/* 4. Share Report */}
        <div className="action-item">
          <div className="action-icon">📤</div>
          <div className="action-content">
            <div className="action-label">Share Report</div>
            <div className="action-desc">Export as JSON for sharing</div>
            <button 
              className="action-btn tertiary"
              onClick={handleShareReport}
              disabled={!results}
            >
              ▶ Export JSON
            </button>
          </div>
        </div>

      </div>

      {showPickerModal && (
        <FilePickerModal onClose={() => setShowPickerModal(false)} />
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

        .action-btn.primary {
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
        }

        .action-btn.primary:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
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
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
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
          padding: 2px 6px;
          border-radius: 4px;
        }

        @media (max-width: 600px) {
          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ActionsCard;