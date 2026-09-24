// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const PDFReportPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (location.state && location.state.results) {
//       setReportData(location.state);
//       setLoading(false);
//     } else {
//       // If no data, redirect back
//       navigate('/analyze');
//     }
//   }, [location]);

//   const handleDownloadPDF = () => {
//     // Use window.print() to save as PDF
//     window.print();
//   };

//   const handleBack = () => {
//     navigate('/analyze');
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center', 
//         height: '100vh',
//         background: '#02070d',
//         color: '#eefaff',
//         fontFamily: 'Orbitron, sans-serif'
//       }}>
//         <div className="loading-spinner"></div>
//         <p style={{ marginLeft: '20px' }}>Generating Report...</p>
//       </div>
//     );
//   }

//   const { results, file } = reportData;
//   const exif = results.exif || {};
//   const verdict = results.verdict || {};
//   const gps = results.gps || null;
//   const timestamp = results.timestamp || {};
//   const pixel = results.pixel || {};
//   const ai = results.ai || {};
//   const custody = results.custody || [];
//   const platformDetails = results.platform_details || {};

//   return (
//     <div className="pdf-report-page">
//       <div className="pdf-report-container">
//         {/* Header */}
//         <div className="pdf-report-header">
//           <div className="pdf-report-logo">META<span>LENS</span></div>
//           <div className="pdf-report-title">FORENSIC ANALYSIS REPORT</div>
//           <div className="pdf-report-meta">
//             <span>Report ID: META-{Date.now().toString(36).toUpperCase()}</span>
//             <span>Date: {new Date().toLocaleDateString()}</span>
//           </div>
//         </div>

//         {/* Verdict */}
//         <div className="pdf-section">
//           <h3 className="pdf-section-title">⚖️ FORENSIC VERDICT</h3>
//           <div className="pdf-verdict">
//             <div className={`pdf-verdict-badge ${verdict.authenticity?.toLowerCase() || 'unknown'}`}>
//               {verdict.authenticity || 'UNKNOWN'} ({verdict.score || 0}%)
//             </div>
//             <p className="pdf-verdict-text">{verdict.recommendations?.[0] || 'No recommendation'}</p>
//           </div>
//         </div>

//         {/* Evidence */}
//         <div className="pdf-section">
//           <h3 className="pdf-section-title">📋 EVIDENCE SUMMARY</h3>
//           <div className="pdf-grid-2">
//             <div className="pdf-card">
//               <span className="pdf-card-label">Device</span>
//               <strong>{exif['IFD0:Make'] || 'Unknown'} {exif['IFD0:Model'] || ''}</strong>
//             </div>
//             <div className="pdf-card">
//               <span className="pdf-card-label">Platform</span>
//               <strong>{platformDetails.name || 'Unknown'}</strong>
//             </div>
//             <div className="pdf-card">
//               <span className="pdf-card-label">Metadata</span>
//               <strong style={{ color: exif && Object.keys(exif).length > 0 ? '#34d399' : '#f59e0b' }}>
//                 {exif && Object.keys(exif).length > 0 ? 'PRESENT' : 'STRIPPED'}
//               </strong>
//             </div>
//             <div className="pdf-card">
//               <span className="pdf-card-label">Dimensions</span>
//               <strong>{pixel.width || '?'} × {pixel.height || '?'}</strong>
//             </div>
//           </div>
//         </div>

//         {/* EXIF Data */}
//         {exif && Object.keys(exif).length > 0 && (
//           <div className="pdf-section">
//             <h3 className="pdf-section-title">📷 EXIF METADATA</h3>
//             <div className="pdf-grid-2">
//               {exif['IFD0:Make'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Make</span>
//                   <strong>{exif['IFD0:Make']}</strong>
//                 </div>
//               )}
//               {exif['IFD0:Model'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Model</span>
//                   <strong>{exif['IFD0:Model']}</strong>
//                 </div>
//               )}
//               {exif['ExifIFD:DateTimeOriginal'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Date/Time Original</span>
//                   <strong>{exif['ExifIFD:DateTimeOriginal']}</strong>
//                 </div>
//               )}
//               {exif['ExifIFD:ExposureTime'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Exposure Time</span>
//                   <strong>{exif['ExifIFD:ExposureTime']}</strong>
//                 </div>
//               )}
//               {exif['ExifIFD:FNumber'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Aperture</span>
//                   <strong>F/{exif['ExifIFD:FNumber']}</strong>
//                 </div>
//               )}
//               {exif['ExifIFD:ISO'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">ISO</span>
//                   <strong>{exif['ExifIFD:ISO']}</strong>
//                 </div>
//               )}
//               {exif['ExifIFD:FocalLength'] && (
//                 <div className="pdf-card">
//                   <span className="pdf-card-label">Focal Length</span>
//                   <strong>{exif['ExifIFD:FocalLength']}</strong>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* GPS */}
//         {gps && gps.lat && gps.lon && (
//           <div className="pdf-section">
//             <h3 className="pdf-section-title">📍 GPS LOCATION</h3>
//             <div className="pdf-grid-2">
//               <div className="pdf-card">
//                 <span className="pdf-card-label">Latitude</span>
//                 <strong>{gps.lat}</strong>
//               </div>
//               <div className="pdf-card">
//                 <span className="pdf-card-label">Longitude</span>
//                 <strong>{gps.lon}</strong>
//               </div>
//               {gps.address && (
//                 <div className="pdf-card" style={{ gridColumn: '1 / -1' }}>
//                   <span className="pdf-card-label">Address</span>
//                   <strong style={{ color: '#60a5fa' }}>{gps.address}</strong>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Timestamp */}
//         <div className="pdf-section">
//           <h3 className="pdf-section-title">🕐 TIMESTAMP ANALYSIS</h3>
//           <div className="pdf-grid-2">
//             {timestamp.original && (
//               <div className="pdf-card">
//                 <span className="pdf-card-label">Original Click Time</span>
//                 <strong style={{ color: '#34d399' }}>{timestamp.original}</strong>
//               </div>
//             )}
//             {timestamp.filesystem && (
//               <div className="pdf-card">
//                 <span className="pdf-card-label">File System Date</span>
//                 <strong style={{ color: '#f59e0b' }}>{timestamp.filesystem}</strong>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Chain of Custody */}
//         <div className="pdf-section">
//           <h3 className="pdf-section-title">🔗 CHAIN OF CUSTODY</h3>
//           <div className="pdf-custody">
//             {custody.map((item, index) => (
//               <div key={index} className="pdf-custody-item">
//                 <span className="pdf-custody-step">Step {item.step}</span>
//                 <span className="pdf-custody-event">{item.event}</span>
//                 <span className="pdf-custody-details">{item.details}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pixel Analysis */}
//         <div className="pdf-section">
//           <h3 className="pdf-section-title">🔬 PIXEL ANALYSIS</h3>
//           <div className="pdf-grid-3">
//             <div className="pdf-card">
//               <span className="pdf-card-label">Dimensions</span>
//               <strong>{pixel.width} × {pixel.height}</strong>
//             </div>
//             <div className="pdf-card">
//               <span className="pdf-card-label">Megapixels</span>
//               <strong>{pixel.megapixels} MP</strong>
//             </div>
//             <div className="pdf-card">
//               <span className="pdf-card-label">Entropy</span>
//               <strong>{pixel.entropy}</strong>
//             </div>
//           </div>
//         </div>

//         {/* AI Analysis */}
//         {ai && ai.success && (
//           <div className="pdf-section">
//             <h3 className="pdf-section-title">🤖 AI VISUAL ANALYSIS</h3>
//             <div className="pdf-card" style={{ gridColumn: '1 / -1' }}>
//               <pre className="pdf-ai-text">{ai.analysis}</pre>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="pdf-report-footer">
//           <div>
//             <span>Report Generated by MetaLens v2.0</span>
//             <span>SHA-256: {results.sha256 || 'N/A'}</span>
//           </div>
//           <div>
//             <span>© 2026 MetaLens - Forensic Intelligence</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="pdf-actions">
//           <button className="pdf-btn primary" onClick={handleDownloadPDF}>
//             ⬇️ Download PDF
//           </button>
//           <button className="pdf-btn secondary" onClick={handleBack}>
//             ← Back to Analysis
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .pdf-report-page {
//           min-height: 100vh;
//           background: #02070d;
//           padding: 40px 20px;
//           font-family: 'Rajdhani', sans-serif;
//         }

//         .pdf-report-container {
//           max-width: 1000px;
//           margin: 0 auto;
//           background: #0f172a;
//           border: 1px solid rgba(0, 218, 255, 0.15);
//           padding: 40px;
//           position: relative;
//         }

//         .pdf-report-header {
//           text-align: center;
//           padding-bottom: 30px;
//           border-bottom: 1px solid rgba(0, 218, 255, 0.1);
//           margin-bottom: 30px;
//         }

//         .pdf-report-logo {
//           font-family: 'Orbitron', sans-serif;
//           font-size: 28px;
//           color: #edfaff;
//           letter-spacing: 2px;
//         }

//         .pdf-report-logo span {
//           color: #00dfff;
//         }

//         .pdf-report-title {
//           font-family: 'Orbitron', sans-serif;
//           font-size: 14px;
//           color: #00cde9;
//           letter-spacing: 3px;
//           margin-top: 8px;
//         }

//         .pdf-report-meta {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 15px;
//           color: #667799;
//           font-size: 12px;
//           font-family: 'Orbitron', sans-serif;
//         }

//         .pdf-section {
//           margin-bottom: 30px;
//         }

//         .pdf-section-title {
//           font-family: 'Orbitron', sans-serif;
//           font-size: 12px;
//           color: #00cde9;
//           letter-spacing: 2px;
//           margin-bottom: 15px;
//           border-bottom: 1px solid rgba(0, 218, 255, 0.08);
//           padding-bottom: 8px;
//         }

//         .pdf-verdict {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//           padding: 16px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//         }

//         .pdf-verdict-badge {
//           padding: 8px 20px;
//           border-radius: 6px;
//           font-family: 'Orbitron', sans-serif;
//           font-size: 14px;
//           font-weight: 700;
//         }

//         .pdf-verdict-badge.authentic {
//           background: #064e3b;
//           color: #34d399;
//         }

//         .pdf-verdict-badge.partial {
//           background: #78350f;
//           color: #fbbf24;
//         }

//         .pdf-verdict-badge.tampered {
//           background: #7f1d1d;
//           color: #f87171;
//         }

//         .pdf-verdict-text {
//           color: #829aa6;
//           font-size: 14px;
//         }

//         .pdf-grid-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//         }

//         .pdf-grid-3 {
//           display: grid;
//           grid-template-columns: 1fr 1fr 1fr;
//           gap: 12px;
//         }

//         .pdf-card {
//           padding: 12px 16px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 6px;
//         }

//         .pdf-card-label {
//           display: block;
//           color: #667799;
//           font-size: 11px;
//           font-family: 'Orbitron', sans-serif;
//           margin-bottom: 4px;
//         }

//         .pdf-card strong {
//           color: #e0e8f0;
//           font-size: 14px;
//         }

//         .pdf-custody {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .pdf-custody-item {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           padding: 10px 16px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 6px;
//           border-left: 3px solid #00d4ff;
//         }

//         .pdf-custody-step {
//           font-family: 'Orbitron', sans-serif;
//           font-size: 10px;
//           color: #00cde9;
//           min-width: 60px;
//         }

//         .pdf-custody-event {
//           font-weight: 600;
//           color: #e0e8f0;
//           font-size: 14px;
//         }

//         .pdf-custody-details {
//           color: #667799;
//           font-size: 13px;
//           margin-left: auto;
//         }

//         .pdf-ai-text {
//           color: #829aa6;
//           font-size: 14px;
//           line-height: 1.6;
//           white-space: pre-wrap;
//           font-family: 'Rajdhani', sans-serif;
//         }

//         .pdf-report-footer {
//           margin-top: 40px;
//           padding-top: 20px;
//           border-top: 1px solid rgba(0, 218, 255, 0.08);
//           display: flex;
//           justify-content: space-between;
//           color: #445566;
//           font-size: 11px;
//           font-family: 'Orbitron', sans-serif;
//         }

//         .pdf-report-footer div {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .pdf-actions {
//           display: flex;
//           gap: 16px;
//           justify-content: center;
//           margin-top: 30px;
//           padding-top: 20px;
//           border-top: 1px solid rgba(0, 218, 255, 0.08);
//         }

//         .pdf-btn {
//           padding: 12px 32px;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-family: 'Rajdhani', sans-serif;
//         }

//         .pdf-btn.primary {
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//         }

//         .pdf-btn.primary:hover {
//           transform: scale(1.03);
//           box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
//         }

//         .pdf-btn.secondary {
//           background: transparent;
//           color: #8899bb;
//           border: 1px solid #2a3a5c;
//         }

//         .pdf-btn.secondary:hover {
//           border-color: #00d4ff;
//           color: #00d4ff;
//         }

//         /* Print Styles */
//         @media print {
//           .pdf-actions {
//             display: none !important;
//           }
//           .pdf-report-page {
//             background: white !important;
//             padding: 20px !important;
//           }
//           .pdf-report-container {
//             border: none !important;
//             background: white !important;
//           }
//           .pdf-report-logo {
//             color: #0a0e1a !important;
//           }
//           .pdf-report-title {
//             color: #0a0e1a !important;
//           }
//           .pdf-card {
//             background: #f5f5f5 !important;
//             border-color: #ddd !important;
//           }
//           .pdf-card strong {
//             color: #0a0e1a !important;
//           }
//           .pdf-card-label {
//             color: #666 !important;
//           }
//           .pdf-report-footer {
//             color: #666 !important;
//           }
//           .pdf-custody-item {
//             background: #f5f5f5 !important;
//           }
//           .pdf-verdict {
//             background: #f5f5f5 !important;
//           }
//           .pdf-ai-text {
//             color: #333 !important;
//           }
//           .pdf-section-title {
//             color: #0a0e1a !important;
//           }
//           .pdf-custody-step {
//             color: #0a0e1a !important;
//           }
//         }

//         @media (max-width: 768px) {
//           .pdf-grid-2, .pdf-grid-3 {
//             grid-template-columns: 1fr;
//           }
//           .pdf-report-container {
//             padding: 20px;
//           }
//           .pdf-verdict {
//             flex-direction: column;
//             text-align: center;
//           }
//           .pdf-custody-item {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 4px;
//           }
//           .pdf-custody-details {
//             margin-left: 0;
//           }
//           .pdf-report-meta {
//             flex-direction: column;
//             gap: 4px;
//             text-align: center;
//           }
//           .pdf-report-footer {
//             flex-direction: column;
//             gap: 8px;
//             text-align: center;
//           }
//           .pdf-actions {
//             flex-direction: column;
//           }
//           .pdf-btn {
//             width: 100%;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PDFReportPage;





















import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PDFReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.results) {
      setReportData(location.state);
      setLoading(false);
    } else {
      navigate('/analyze');
    }
  }, [location]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleBack = () => {
    navigate('/analyze');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#02070d',
        color: '#eefaff',
        fontFamily: 'Orbitron, sans-serif'
      }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: '20px' }}>Generating Report...</p>
      </div>
    );
  }

  const { results, file } = reportData;
  const exif = results.exif || {};
  const verdict = results.verdict || {};
  const gps = results.gps || null;
  const timestamp = results.timestamp || {};
  const pixel = results.pixel || {};
  const ai = results.ai || {};
  const custody = results.custody || [];
  const platformDetails = results.platform_details || {};

  return (
    <div className="pdf-report-page">
      <div className="pdf-report-container">
        {/* Header */}
        <div className="pdf-report-header">
          <div className="pdf-report-logo">META<span>LENS</span></div>
          <div className="pdf-report-title">FORENSIC ANALYSIS REPORT</div>
          <div className="pdf-report-meta">
            <span>Report ID: META-{Date.now().toString(36).toUpperCase()}</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Verdict */}
        <div className="pdf-section">
          <h3 className="pdf-section-title">⚖️ FORENSIC VERDICT</h3>
          <div className="pdf-verdict">
            <div className={`pdf-verdict-badge ${verdict.authenticity?.toLowerCase() || 'unknown'}`}>
              {verdict.authenticity || 'UNKNOWN'} ({verdict.score || 0}%)
            </div>
            <p className="pdf-verdict-text">{verdict.recommendations?.[0] || 'No recommendation'}</p>
          </div>
        </div>

        {/* Evidence */}
        <div className="pdf-section">
          <h3 className="pdf-section-title">📋 EVIDENCE SUMMARY</h3>
          <div className="pdf-grid-2">
            <div className="pdf-card">
              <span className="pdf-card-label">Device</span>
              <strong>{exif['IFD0:Make'] || 'Unknown'} {exif['IFD0:Model'] || ''}</strong>
            </div>
            <div className="pdf-card">
              <span className="pdf-card-label">Platform</span>
              <strong>{platformDetails.name || 'Unknown'}</strong>
            </div>
            <div className="pdf-card">
              <span className="pdf-card-label">Metadata</span>
              <strong style={{ color: exif && Object.keys(exif).length > 0 ? '#34d399' : '#f59e0b' }}>
                {exif && Object.keys(exif).length > 0 ? 'PRESENT' : 'STRIPPED'}
              </strong>
            </div>
            <div className="pdf-card">
              <span className="pdf-card-label">Dimensions</span>
              <strong>{pixel.width || '?'} × {pixel.height || '?'}</strong>
            </div>
          </div>
        </div>

        {/* EXIF Data */}
        {exif && Object.keys(exif).length > 0 && (
          <div className="pdf-section">
            <h3 className="pdf-section-title">📷 EXIF METADATA</h3>
            <div className="pdf-grid-2">
              {exif['IFD0:Make'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Make</span>
                  <strong>{exif['IFD0:Make']}</strong>
                </div>
              )}
              {exif['IFD0:Model'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Model</span>
                  <strong>{exif['IFD0:Model']}</strong>
                </div>
              )}
              {exif['ExifIFD:DateTimeOriginal'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Date/Time Original</span>
                  <strong>{exif['ExifIFD:DateTimeOriginal']}</strong>
                </div>
              )}
              {exif['ExifIFD:ExposureTime'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Exposure Time</span>
                  <strong>{exif['ExifIFD:ExposureTime']}</strong>
                </div>
              )}
              {exif['ExifIFD:FNumber'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Aperture</span>
                  <strong>F/{exif['ExifIFD:FNumber']}</strong>
                </div>
              )}
              {exif['ExifIFD:ISO'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">ISO</span>
                  <strong>{exif['ExifIFD:ISO']}</strong>
                </div>
              )}
              {exif['ExifIFD:FocalLength'] && (
                <div className="pdf-card">
                  <span className="pdf-card-label">Focal Length</span>
                  <strong>{exif['ExifIFD:FocalLength']}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GPS */}
        {gps && gps.lat && gps.lon && (
          <div className="pdf-section">
            <h3 className="pdf-section-title">📍 GPS LOCATION</h3>
            <div className="pdf-grid-2">
              <div className="pdf-card">
                <span className="pdf-card-label">Latitude</span>
                <strong>{gps.lat}</strong>
              </div>
              <div className="pdf-card">
                <span className="pdf-card-label">Longitude</span>
                <strong>{gps.lon}</strong>
              </div>
              {gps.address && (
                <div className="pdf-card" style={{ gridColumn: '1 / -1' }}>
                  <span className="pdf-card-label">Address</span>
                  <strong style={{ color: '#60a5fa' }}>{gps.address}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="pdf-section">
          <h3 className="pdf-section-title">🕐 TIMESTAMP ANALYSIS</h3>
          <div className="pdf-grid-2">
            {timestamp.original && (
              <div className="pdf-card">
                <span className="pdf-card-label">Original Click Time</span>
                <strong style={{ color: '#34d399' }}>{timestamp.original}</strong>
              </div>
            )}
            {timestamp.filesystem && (
              <div className="pdf-card">
                <span className="pdf-card-label">File System Date</span>
                <strong style={{ color: '#f59e0b' }}>{timestamp.filesystem}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Chain of Custody */}
        <div className="pdf-section">
          <h3 className="pdf-section-title">🔗 CHAIN OF CUSTODY</h3>
          <div className="pdf-custody">
            {custody.map((item, index) => (
              <div key={index} className="pdf-custody-item">
                <span className="pdf-custody-step">Step {item.step}</span>
                <span className="pdf-custody-event">{item.event}</span>
                <span className="pdf-custody-details">{item.details}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pixel Analysis */}
        <div className="pdf-section">
          <h3 className="pdf-section-title">🔬 PIXEL ANALYSIS</h3>
          <div className="pdf-grid-3">
            <div className="pdf-card">
              <span className="pdf-card-label">Dimensions</span>
              <strong>{pixel.width} × {pixel.height}</strong>
            </div>
            <div className="pdf-card">
              <span className="pdf-card-label">Megapixels</span>
              <strong>{pixel.megapixels} MP</strong>
            </div>
            <div className="pdf-card">
              <span className="pdf-card-label">Entropy</span>
              <strong>{pixel.entropy}</strong>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        {ai && ai.success && (
          <div className="pdf-section">
            <h3 className="pdf-section-title">🤖 AI VISUAL ANALYSIS</h3>
            <div className="pdf-card" style={{ gridColumn: '1 / -1' }}>
              <div className="pdf-ai-note">
                ⚠️ AI visual analysis describes visible content only. It is NOT reliable for
                location, identity, or factual verification. Use EXIF GPS data for location.
              </div>
              <pre className="pdf-ai-text">{ai.analysis}</pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pdf-report-footer">
          <div>
            <span>Report Generated by MetaLens v2.0</span>
            <span className="pdf-hash-line">
              SHA-256: <strong className="pdf-hash-value">{results.sha256 || 'N/A'}</strong>
            </span>
          </div>
          <div>
            <span>© 2026 MetaLens - Forensic Intelligence</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pdf-actions">
          <button className="pdf-btn primary" onClick={handleDownloadPDF}>
            ⬇️ Download PDF
          </button>
          <button className="pdf-btn secondary" onClick={handleBack}>
            ← Back to Analysis
          </button>
        </div>
      </div>

      <style jsx>{`
        .pdf-report-page {
          min-height: 100vh;
          background: #02070d;
          padding: 40px 20px;
          font-family: 'Rajdhani', sans-serif;
        }

        .pdf-report-container {
          max-width: 1000px;
          margin: 0 auto;
          background: #0f172a;
          border: 1px solid rgba(0, 218, 255, 0.15);
          padding: 40px;
          position: relative;
        }

        .pdf-report-header {
          text-align: center;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(0, 218, 255, 0.1);
          margin-bottom: 30px;
        }

        .pdf-report-logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 28px;
          color: #edfaff;
          letter-spacing: 2px;
        }

        .pdf-report-logo span {
          color: #00dfff;
        }

        .pdf-report-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          color: #00cde9;
          letter-spacing: 3px;
          margin-top: 8px;
        }

        .pdf-report-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          color: #667799;
          font-size: 12px;
          font-family: 'Orbitron', sans-serif;
        }

        .pdf-section {
          margin-bottom: 30px;
        }

        .pdf-section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          color: #00cde9;
          letter-spacing: 2px;
          margin-bottom: 15px;
          border-bottom: 1px solid rgba(0, 218, 255, 0.08);
          padding-bottom: 8px;
        }

        .pdf-verdict {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 8px;
        }

        .pdf-verdict-badge {
          padding: 8px 20px;
          border-radius: 6px;
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          font-weight: 700;
        }

        .pdf-verdict-badge.authentic {
          background: #064e3b;
          color: #34d399;
        }

        .pdf-verdict-badge.partial {
          background: #78350f;
          color: #fbbf24;
        }

        .pdf-verdict-badge.tampered {
          background: #7f1d1d;
          color: #f87171;
        }

        .pdf-verdict-text {
          color: #829aa6;
          font-size: 14px;
        }

        .pdf-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .pdf-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .pdf-card {
          padding: 12px 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 6px;
        }

        .pdf-card-label {
          display: block;
          color: #667799;
          font-size: 11px;
          font-family: 'Orbitron', sans-serif;
          margin-bottom: 4px;
        }

        .pdf-card strong {
          color: #e0e8f0;
          font-size: 14px;
        }

        .pdf-custody {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pdf-custody-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 6px;
          border-left: 3px solid #00d4ff;
        }

        .pdf-custody-step {
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          color: #00cde9;
          min-width: 60px;
        }

        .pdf-custody-event {
          font-weight: 600;
          color: #e0e8f0;
          font-size: 14px;
        }

        .pdf-custody-details {
          color: #667799;
          font-size: 13px;
          margin-left: auto;
        }

        .pdf-ai-text {
          color: #829aa6;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: 'Rajdhani', sans-serif;
        }

        .pdf-ai-note {
          color: #f59e0b;
          font-size: 11px;
          padding: 8px 12px;
          margin-bottom: 10px;
          background: rgba(245, 158, 11, 0.08);
          border-left: 3px solid #f59e0b;
          border-radius: 4px;
          font-family: 'Orbitron', sans-serif;
          line-height: 1.5;
        }

        .pdf-report-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 218, 255, 0.08);
          display: flex;
          justify-content: space-between;
          color: #445566;
          font-size: 11px;
          font-family: 'Orbitron', sans-serif;
        }

        .pdf-report-footer div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* === Hash highlighting === */
        .pdf-hash-line {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }

        .pdf-hash-value {
          color: #00dfff;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          word-break: break-all;
          background: rgba(0, 218, 255, 0.08);
          padding: 4px 8px;
          border-radius: 4px;
          border-left: 2px solid #00dfff;
          margin-top: 2px;
        }

        .pdf-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 218, 255, 0.08);
        }

        .pdf-btn {
          padding: 12px 32px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Rajdhani', sans-serif;
        }

        .pdf-btn.primary {
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
        }

        .pdf-btn.primary:hover {
          transform: scale(1.03);
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
        }

        .pdf-btn.secondary {
          background: transparent;
          color: #8899bb;
          border: 1px solid #2a3a5c;
        }

        .pdf-btn.secondary:hover {
          border-color: #00d4ff;
          color: #00d4ff;
        }

        /* Print Styles */
        @media print {
          .pdf-actions {
            display: none !important;
          }
          .pdf-report-page {
            background: white !important;
            padding: 20px !important;
          }
          .pdf-report-container {
            border: none !important;
            background: white !important;
          }
          .pdf-report-logo {
            color: #0a0e1a !important;
          }
          .pdf-report-title {
            color: #0a0e1a !important;
          }
          .pdf-card {
            background: #f5f5f5 !important;
            border-color: #ddd !important;
          }
          .pdf-card strong {
            color: #0a0e1a !important;
          }
          .pdf-card-label {
            color: #666 !important;
          }
          .pdf-report-footer {
            color: #666 !important;
          }
          .pdf-custody-item {
            background: #f5f5f5 !important;
          }
          .pdf-verdict {
            background: #f5f5f5 !important;
          }
          .pdf-ai-text {
            color: #333 !important;
          }
          .pdf-section-title {
            color: #0a0e1a !important;
          }
          .pdf-custody-step {
            color: #0a0e1a !important;
          }
          .pdf-hash-value {
            color: #0a0e1a !important;
            background: #f0f0f0 !important;
            border-left: 2px solid #0a0e1a !important;
          }
          .pdf-ai-note {
            color: #666 !important;
            background: #f5f5f5 !important;
            border-left: 3px solid #666 !important;
          }
        }

        @media (max-width: 768px) {
          .pdf-grid-2, .pdf-grid-3 {
            grid-template-columns: 1fr;
          }
          .pdf-report-container {
            padding: 20px;
          }
          .pdf-verdict {
            flex-direction: column;
            text-align: center;
          }
          .pdf-custody-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .pdf-custody-details {
            margin-left: 0;
          }
          .pdf-report-meta {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }
          .pdf-report-footer {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          .pdf-actions {
            flex-direction: column;
          }
          .pdf-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default PDFReportPage;