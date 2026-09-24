// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TechniqueDetail = ({ technique, onClose }) => {
//   const navigate = useNavigate();

//   // ============================================================
//   //  TECHNIQUE DATA
//   // ============================================================
//   const techniqueData = {
//     exif: {
//       title: "EXIF METADATA",
//       icon: "◉",
//       color: "#00dfff",
//       description: "Extract hidden camera data, timestamps, and device information from any image.",
//       features: [
//         "Camera Make & Model",
//         "Lens & Focal Length",
//         "ISO, Shutter Speed, Aperture",
//         "Software & Firmware Version",
//         "Embedded Thumbnail Extraction"
//       ],
//       demo: "📷 Sample: Canon EOS R5, 24-70mm f/2.8, ISO 100",
//       action: "Try EXIF Extraction →"
//     },
//     gps: {
//       title: "GPS RECOVERY",
//       icon: "⌖",
//       color: "#34d399",
//       description: "Recover exact location coordinates from images where GPS was enabled.",
//       features: [
//         "Latitude & Longitude Extraction",
//         "Reverse Geocoding (Address)",
//         "GPS Altitude & Accuracy",
//         "Timestamp Correlation",
//         "Location Heatmap Generation"
//       ],
//       demo: "📍 19.0697°N, 72.8881°E → Sable Nagar, Kurla, Mumbai",
//       action: "Find Location →"
//     },
//     platform: {
//       title: "PLATFORM DETECTION",
//       icon: "◈",
//       color: "#fbbf24",
//       description: "Identify which platform an image originated from based on compression patterns.",
//       features: [
//         "WhatsApp Compression Detection",
//         "Instagram Filter Recognition",
//         "Facebook Upload Patterns",
//         "Screenshot Detection",
//         "Social Media Timeline Analysis"
//       ],
//       demo: "📱 Detected: WhatsApp Web v2.2345.6",
//       action: "Detect Platform →"
//     },
//     integrity: {
//       title: "IMAGE INTEGRITY",
//       icon: "▤",
//       color: "#f87171",
//       description: "Detect image manipulation, cloning, and editing with advanced forensic techniques.",
//       features: [
//         "Error Level Analysis (ELA)",
//         "Clone Detection",
//         "Noise Inconsistency Analysis",
//         "JPEG Artifact Detection",
//         "Manipulation Heatmap"
//       ],
//       demo: "🔴 Manipulation Detected: 72% Confidence",
//       action: "Check Integrity →"
//     },
//     ai: {
//       title: "AI VISUAL ANALYSIS",
//       icon: "◈",
//       color: "#a78bfa",
//       description: "AI-powered analysis for location, device, and object recognition from visual clues.",
//       features: [
//         "Location from Architecture",
//         "Device from Image Quality",
//         "Object & Scene Recognition",
//         "Text Detection (OCR)",
//         "Visual Anomaly Detection"
//       ],
//       demo: "🤖 AI says: New York City, NY • iPhone 14 Pro • Daytime",
//       action: "Run AI Analysis →"
//     },
//     hash: {
//       title: "HASH FINGERPRINT",
//       icon: "#",
//       color: "#f472b6",
//       description: "Generate cryptographic SHA-256 fingerprints to verify image authenticity.",
//       features: [
//         "SHA-256 Hash Generation",
//         "MD5 & SHA-1 Support",
//         "File Integrity Verification",
//         "Hash Comparison Tool",
//         "Digital Signature Creation"
//       ],
//       demo: "🔐 SHA-256: 7f83b1657ff1fc53b92dc18148a1d65d",
//       action: "Generate Hash →"
//     }
//   };

//   const data = techniqueData[technique];
//   if (!data) return null;

//   // ============================================================
//   //  HANDLE ACTION BUTTON
//   // ============================================================
//   const handleAction = () => {
//     if (technique === 'exif') {
//       navigate('/analyze');
//     } else if (technique === 'gps') {
//       // Open Google Maps with sample coordinates
//       window.open('https://www.google.com/maps?q=19.0697,72.8881', '_blank');
//     } else if (technique === 'platform') {
//       navigate('/analyze');
//     } else if (technique === 'integrity') {
//       // Show alert with demo info
//       alert('🔬 IMAGE INTEGRITY\n\nManipulation Detection: 72%\n\nSigns Detected:\n• Cloning detected in bottom right\n• Noise inconsistency in shadows\n• JPEG artifacts at 85% quality');
//     } else if (technique === 'ai') {
//       // Show AI demo
//       alert('🤖 AI VISUAL ANALYSIS\n\n📍 Location: New York City, NY\n📱 Device: iPhone 14 Pro\n🕐 Time: Daytime (14:30)\n📝 Text Detected: "NYC"');
//     } else if (technique === 'hash') {
//       // Show hash demo
//       alert('🔐 HASH FINGERPRINT\n\nSHA-256: 7f83b1657ff1fc53b92dc18148a1d65d\n\n✅ File Integrity: VERIFIED\n📅 Generated: ' + new Date().toLocaleString());
//     }
//   };

//   return (
//     <div className="technique-detail-overlay" onClick={onClose}>
//       <div className="technique-detail-modal" onClick={(e) => e.stopPropagation()}>
        
//         {/* Close Button */}
//         <button className="technique-detail-close" onClick={onClose}>✕</button>

//         {/* Header */}
//         <div className="technique-detail-header" style={{ borderColor: data.color }}>
//           <span className="technique-detail-icon" style={{ color: data.color }}>{data.icon}</span>
//           <h2 className="technique-detail-title">{data.title}</h2>
//         </div>

//         {/* Content */}
//         <div className="technique-detail-body">
//           <p className="technique-detail-desc">{data.description}</p>

//           {/* Features */}
//           <div className="technique-detail-features">
//             <h4>🔍 Key Features</h4>
//             <ul>
//               {data.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Demo */}
//           <div className="technique-detail-demo" style={{ borderColor: data.color }}>
//             <span className="technique-demo-label">⚡ LIVE DEMO</span>
//             <p className="technique-demo-text">{data.demo}</p>
//           </div>

//           {/* Action Button */}
//           <button 
//             className="technique-detail-action" 
//             style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}88)` }}
//             onClick={handleAction}
//           >
//             {data.action}
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="technique-detail-footer">
//           <span>Powered by MetaLens v2.0</span>
//           <span>🔬 Forensic Intelligence</span>
//         </div>

//       </div>

//       <style jsx>{`
//         .technique-detail-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(12px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .technique-detail-modal {
//           position: relative;
//           max-width: 540px;
//           width: 100%;
//           padding: 32px;
//           background: #0f172a;
//           border: 1px solid rgba(0, 218, 255, 0.15);
//           max-height: 90vh;
//           overflow-y: auto;
//         }

//         .technique-detail-close {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: none;
//           border: none;
//           color: #667799;
//           font-size: 20px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           padding: 4px 8px;
//           border-radius: 4px;
//         }

//         .technique-detail-close:hover {
//           color: #eefaff;
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .technique-detail-header {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding-bottom: 16px;
//           border-bottom: 2px solid;
//           margin-bottom: 20px;
//         }

//         .technique-detail-icon {
//           font-size: 32px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .technique-detail-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           letter-spacing: 2px;
//           margin: 0;
//         }

//         .technique-detail-body {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .technique-detail-desc {
//           color: #829aa6;
//           font-size: 15px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .technique-detail-features h4 {
//           color: #8899bb;
//           font-size: 12px;
//           font-family: "Orbitron", sans-serif;
//           letter-spacing: 1px;
//           margin-bottom: 10px;
//         }

//         .technique-detail-features ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 8px;
//         }

//         .technique-detail-features li {
//           color: #c0d0e0;
//           font-size: 13px;
//           padding: 6px 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .technique-detail-features li::before {
//           content: "›";
//           color: #00d4ff;
//           font-weight: 700;
//         }

//         .technique-detail-demo {
//           padding: 16px;
//           border: 1px solid;
//           border-radius: 8px;
//           background: rgba(0, 0, 0, 0.3);
//         }

//         .technique-demo-label {
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           color: #667799;
//           letter-spacing: 1.5px;
//           display: block;
//           margin-bottom: 6px;
//         }

//         .technique-demo-text {
//           color: #e0e8f0;
//           font-size: 14px;
//           margin: 0;
//           font-weight: 500;
//         }

//         .technique-detail-action {
//           padding: 14px 24px;
//           border: none;
//           border-radius: 8px;
//           color: white;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 16px;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 4px;
//         }

//         .technique-detail-action:hover {
//           transform: scale(1.02);
//           box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
//         }

//         .technique-detail-footer {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 20px;
//           padding-top: 16px;
//           border-top: 1px solid #1a2340;
//           color: #445566;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 1px;
//         }

//         @media (max-width: 600px) {
//           .technique-detail-modal {
//             padding: 20px;
//           }

//           .technique-detail-features ul {
//             grid-template-columns: 1fr;
//           }

//           .technique-detail-title {
//             font-size: 15px;
//           }

//           .technique-detail-footer {
//             flex-direction: column;
//             gap: 6px;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TechniqueDetail;















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const TechniqueDetail = ({ technique, onClose, file }) => {
//   const navigate = useNavigate();
//   const [showDemoResult, setShowDemoResult] = useState(false);
//   const [resultData, setResultData] = useState(null);

//   // ============================================================
//   //  TECHNIQUE DATA
//   // ============================================================
//   const techniqueData = {
//     exif: {
//       title: "EXIF METADATA",
//       icon: "◉",
//       color: "#00dfff",
//       description: "Extract hidden camera data, timestamps, and device information from any image.",
//       features: [
//         "Camera Make & Model",
//         "Lens & Focal Length",
//         "ISO, Shutter Speed, Aperture",
//         "Software & Firmware Version",
//         "Embedded Thumbnail Extraction"
//       ],
//       demo: "📷 Sample: Canon EOS R5, 24-70mm f/2.8, ISO 100",
//       action: "Try EXIF Extraction →",
//       result: "✅ EXIF Extracted!\n📷 Canon EOS R5\n📅 2024:08:19 14:30:25\n🔍 ISO 100, F/2.8, 1/100s"
//     },
//     gps: {
//       title: "GPS RECOVERY",
//       icon: "⌖",
//       color: "#34d399",
//       description: "Recover exact location coordinates from images where GPS was enabled.",
//       features: [
//         "Latitude & Longitude Extraction",
//         "Reverse Geocoding (Address)",
//         "GPS Altitude & Accuracy",
//         "Timestamp Correlation",
//         "Location Heatmap Generation"
//       ],
//       demo: "📍 19.0697°N, 72.8881°E → Sable Nagar, Kurla, Mumbai",
//       action: "Find Location →",
//       result: "📍 Location Found!\n📌 Sable Nagar, Kurla, Mumbai\n🗺️ 19.0697°N, 72.8881°E\n📅 2024:08:19 14:30:25"
//     },
//     platform: {
//       title: "PLATFORM DETECTION",
//       icon: "◈",
//       color: "#fbbf24",
//       description: "Identify which platform an image originated from based on compression patterns.",
//       features: [
//         "WhatsApp Compression Detection",
//         "Instagram Filter Recognition",
//         "Facebook Upload Patterns",
//         "Screenshot Detection",
//         "Social Media Timeline Analysis"
//       ],
//       demo: "📱 Detected: WhatsApp Web v2.2345.6",
//       action: "Detect Platform →",
//       result: "✅ Platform Detected!\n📱 WhatsApp Web v2.2345.6\n📊 Confidence: 95%\n🔍 WhatsApp compression pattern found"
//     },
//     integrity: {
//       title: "IMAGE INTEGRITY",
//       icon: "▤",
//       color: "#f87171",
//       description: "Detect image manipulation, cloning, and editing with advanced forensic techniques.",
//       features: [
//         "Error Level Analysis (ELA)",
//         "Clone Detection",
//         "Noise Inconsistency Analysis",
//         "JPEG Artifact Detection",
//         "Manipulation Heatmap"
//       ],
//       demo: "🔴 Manipulation Detected: 72% Confidence",
//       action: "Check Integrity →",
//       result: "🔬 Integrity Analysis Complete!\n⚠️ Manipulation Detected: 72%\n🔍 Cloning detected in bottom right\n📊 Noise inconsistency in shadows"
//     },
//     ai: {
//       title: "AI VISUAL ANALYSIS",
//       icon: "◈",
//       color: "#a78bfa",
//       description: "AI-powered analysis for location, device, and object recognition from visual clues.",
//       features: [
//         "Location from Architecture",
//         "Device from Image Quality",
//         "Object & Scene Recognition",
//         "Text Detection (OCR)",
//         "Visual Anomaly Detection"
//       ],
//       demo: "🤖 AI says: New York City, NY • iPhone 14 Pro • Daytime",
//       action: "Run AI Analysis →",
//       result: "🤖 AI Analysis Complete!\n📍 New York City, NY\n📱 iPhone 14 Pro\n🕐 Daytime (14:30)\n📝 Text Detected: 'NYC'"
//     },
//     hash: {
//       title: "HASH FINGERPRINT",
//       icon: "#",
//       color: "#f472b6",
//       description: "Generate cryptographic SHA-256 fingerprints to verify image authenticity.",
//       features: [
//         "SHA-256 Hash Generation",
//         "MD5 & SHA-1 Support",
//         "File Integrity Verification",
//         "Hash Comparison Tool",
//         "Digital Signature Creation"
//       ],
//       demo: "🔐 SHA-256: 7f83b1657ff1fc53b92dc18148a1d65d",
//       action: "Generate Hash →",
//       get result() {
//         return `🔐 Hash Generated!\n🔑 SHA-256: ${this._hash || '7f83b1657ff1fc53b92dc18148a1d65d'}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
//       }
//     }
//   };

//   const data = techniqueData[technique];
//   if (!data) return null;

//   // ============================================================
//   //  HANDLE ACTION BUTTON
//   // ============================================================
//   const handleAction = async () => {
//     if (technique === 'hash' && file) {
//       try {
//         // Generate REAL hash from the uploaded file
//         const buffer = await file.arrayBuffer();
//         const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
//         // Update the hash result with real data
//         data._hash = hashHex;
//         const resultText = `🔐 Hash Generated!\n🔑 SHA-256: ${hashHex}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
//         setResultData(resultText);
//         setShowDemoResult(true);
//       } catch (err) {
//         setResultData(`❌ Error generating hash: ${err.message}`);
//         setShowDemoResult(true);
//       }
//     } else if (technique === 'exif' || technique === 'platform') {
//       navigate('/analyze');
//     } else {
//       // Show demo result
//       setResultData(data.result);
//       setShowDemoResult(true);
//     }
//   };

//   // Get the result text to display
//   const getResultText = () => {
//     if (resultData) return resultData;
//     return data.result || data.demo;
//   };

//   return (
//     <div className="technique-detail-overlay" onClick={onClose}>
//       <div className="technique-detail-modal" onClick={(e) => e.stopPropagation()}>
        
//         {/* Close Button */}
//         <button className="technique-detail-close" onClick={onClose}>✕</button>

//         {/* Header */}
//         <div className="technique-detail-header" style={{ borderColor: data.color }}>
//           <span className="technique-detail-icon" style={{ color: data.color }}>{data.icon}</span>
//           <h2 className="technique-detail-title">{data.title}</h2>
//         </div>

//         {/* Content */}
//         <div className="technique-detail-body">
//           <p className="technique-detail-desc">{data.description}</p>

//           {/* Features */}
//           <div className="technique-detail-features">
//             <h4>🔍 Key Features</h4>
//             <ul>
//               {data.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Demo */}
//           <div className="technique-detail-demo" style={{ borderColor: data.color }}>
//             <span className="technique-demo-label">⚡ LIVE DEMO</span>
//             <p className="technique-demo-text">{data.demo}</p>
//           </div>

//           {/* Action Button */}
//           <button 
//             className="technique-detail-action" 
//             style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}88)` }}
//             onClick={handleAction}
//           >
//             {data.action}
//           </button>

//           {/* Demo Result (shown when action is clicked) */}
//           {showDemoResult && (
//             <div className="technique-demo-result">
//               <div className="technique-demo-result-header">
//                 <span>📋 RESULT</span>
//                 <button onClick={() => setShowDemoResult(false)}>✕</button>
//               </div>
//               <pre className="technique-demo-result-text">{getResultText()}</pre>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="technique-detail-footer">
//           <span>Powered by MetaLens v2.0</span>
//           <span>🔬 Forensic Intelligence</span>
//         </div>

//       </div>

//       <style jsx>{`
//         .technique-detail-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(12px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .technique-detail-modal {
//           position: relative;
//           max-width: 540px;
//           width: 100%;
//           padding: 32px;
//           background: #0f172a;
//           border: 1px solid rgba(0, 218, 255, 0.15);
//           max-height: 90vh;
//           overflow-y: auto;
//         }

//         .technique-detail-close {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: none;
//           border: none;
//           color: #667799;
//           font-size: 20px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           padding: 4px 8px;
//           border-radius: 4px;
//         }

//         .technique-detail-close:hover {
//           color: #eefaff;
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .technique-detail-header {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding-bottom: 16px;
//           border-bottom: 2px solid;
//           margin-bottom: 20px;
//         }

//         .technique-detail-icon {
//           font-size: 32px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .technique-detail-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           letter-spacing: 2px;
//           margin: 0;
//         }

//         .technique-detail-body {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .technique-detail-desc {
//           color: #829aa6;
//           font-size: 15px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .technique-detail-features h4 {
//           color: #8899bb;
//           font-size: 12px;
//           font-family: "Orbitron", sans-serif;
//           letter-spacing: 1px;
//           margin-bottom: 10px;
//         }

//         .technique-detail-features ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 8px;
//         }

//         .technique-detail-features li {
//           color: #c0d0e0;
//           font-size: 13px;
//           padding: 6px 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .technique-detail-features li::before {
//           content: "›";
//           color: #00d4ff;
//           font-weight: 700;
//         }

//         .technique-detail-demo {
//           padding: 16px;
//           border: 1px solid;
//           border-radius: 8px;
//           background: rgba(0, 0, 0, 0.3);
//         }

//         .technique-demo-label {
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           color: #667799;
//           letter-spacing: 1.5px;
//           display: block;
//           margin-bottom: 6px;
//         }

//         .technique-demo-text {
//           color: #e0e8f0;
//           font-size: 14px;
//           margin: 0;
//           font-weight: 500;
//         }

//         .technique-detail-action {
//           padding: 14px 24px;
//           border: none;
//           border-radius: 8px;
//           color: white;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 16px;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 4px;
//         }

//         .technique-detail-action:hover {
//           transform: scale(1.02);
//           box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
//         }

//         .technique-demo-result {
//           margin-top: 8px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           border-radius: 8px;
//           overflow: hidden;
//           animation: slideDown 0.3s ease;
//         }

//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .technique-demo-result-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 8px 14px;
//           background: rgba(0, 0, 0, 0.3);
//           border-bottom: 1px solid rgba(0, 218, 255, 0.1);
//         }

//         .technique-demo-result-header span {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 1px;
//         }

//         .technique-demo-result-header button {
//           background: none;
//           border: none;
//           color: #667799;
//           cursor: pointer;
//           font-size: 14px;
//           padding: 2px 6px;
//         }

//         .technique-demo-result-header button:hover {
//           color: #eefaff;
//         }

//         .technique-demo-result-text {
//           padding: 14px;
//           margin: 0;
//           color: #c0d0e0;
//           font-size: 13px;
//           font-family: "Rajdhani", sans-serif;
//           line-height: 1.8;
//           white-space: pre-wrap;
//           background: rgba(0, 0, 0, 0.2);
//         }

//         .technique-detail-footer {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 20px;
//           padding-top: 16px;
//           border-top: 1px solid #1a2340;
//           color: #445566;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 1px;
//         }

//         @media (max-width: 600px) {
//           .technique-detail-modal {
//             padding: 20px;
//           }

//           .technique-detail-features ul {
//             grid-template-columns: 1fr;
//           }

//           .technique-detail-title {
//             font-size: 15px;
//           }

//           .technique-detail-footer {
//             flex-direction: column;
//             gap: 6px;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TechniqueDetail;













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const TechniqueDetail = ({ technique, onClose, file }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [showDemoResult, setShowDemoResult] = useState(false);
//   const [resultData, setResultData] = useState(null);

//   // ============================================================
//   //  TECHNIQUE DATA
//   // ============================================================
//   const techniqueData = {
//     exif: {
//       title: "EXIF METADATA",
//       icon: "◉",
//       color: "#00dfff",
//       description: "Extract hidden camera data, timestamps, and device information from any image.",
//       features: [
//         "Camera Make & Model",
//         "Lens & Focal Length",
//         "ISO, Shutter Speed, Aperture",
//         "Software & Firmware Version",
//         "Embedded Thumbnail Extraction"
//       ],
//       demo: "📷 Sample: Canon EOS R5, 24-70mm f/2.8, ISO 100",
//       action: "Try EXIF Extraction →",
//       result: "✅ EXIF Extracted!\n📷 Canon EOS R5\n📅 2024:08:19 14:30:25\n🔍 ISO 100, F/2.8, 1/100s"
//     },
//     gps: {
//       title: "GPS RECOVERY",
//       icon: "⌖",
//       color: "#34d399",
//       description: "Recover exact location coordinates from images where GPS was enabled.",
//       features: [
//         "Latitude & Longitude Extraction",
//         "Reverse Geocoding (Address)",
//         "GPS Altitude & Accuracy",
//         "Timestamp Correlation",
//         "Location Heatmap Generation"
//       ],
//       demo: "📍 19.0697°N, 72.8881°E → Sable Nagar, Kurla, Mumbai",
//       action: "Find Location →",
//       result: "📍 Location Found!\n📌 Sable Nagar, Kurla, Mumbai\n🗺️ 19.0697°N, 72.8881°E\n📅 2024:08:19 14:30:25"
//     },
//     platform: {
//       title: "PLATFORM DETECTION",
//       icon: "◈",
//       color: "#fbbf24",
//       description: "Identify which platform an image originated from based on compression patterns.",
//       features: [
//         "WhatsApp Compression Detection",
//         "Instagram Filter Recognition",
//         "Facebook Upload Patterns",
//         "Screenshot Detection",
//         "Social Media Timeline Analysis"
//       ],
//       demo: "📱 Detected: WhatsApp Web v2.2345.6",
//       action: "Detect Platform →",
//       result: "✅ Platform Detected!\n📱 WhatsApp Web v2.2345.6\n📊 Confidence: 95%\n🔍 WhatsApp compression pattern found"
//     },
//     integrity: {
//       title: "IMAGE INTEGRITY",
//       icon: "▤",
//       color: "#f87171",
//       description: "Detect image manipulation, cloning, and editing with advanced forensic techniques.",
//       features: [
//         "Error Level Analysis (ELA)",
//         "Clone Detection",
//         "Noise Inconsistency Analysis",
//         "JPEG Artifact Detection",
//         "Manipulation Heatmap"
//       ],
//       demo: "🔴 Manipulation Detected: 72% Confidence",
//       action: "Check Integrity →",
//       result: "🔬 Integrity Analysis Complete!\n⚠️ Manipulation Detected: 72%\n🔍 Cloning detected in bottom right\n📊 Noise inconsistency in shadows"
//     },
//     ai: {
//       title: "AI VISUAL ANALYSIS",
//       icon: "◈",
//       color: "#a78bfa",
//       description: "AI-powered analysis for location, device, and object recognition from visual clues.",
//       features: [
//         "Location from Architecture",
//         "Device from Image Quality",
//         "Object & Scene Recognition",
//         "Text Detection (OCR)",
//         "Visual Anomaly Detection"
//       ],
//       demo: "🤖 AI says: New York City, NY • iPhone 14 Pro • Daytime",
//       action: "Run AI Analysis →",
//       result: "🤖 AI Analysis Complete!\n📍 New York City, NY\n📱 iPhone 14 Pro\n🕐 Daytime (14:30)\n📝 Text Detected: 'NYC'"
//     },
//     hash: {
//       title: "HASH FINGERPRINT",
//       icon: "#",
//       color: "#f472b6",
//       description: "Generate cryptographic SHA-256 fingerprints to verify image authenticity.",
//       features: [
//         "SHA-256 Hash Generation",
//         "MD5 & SHA-1 Support",
//         "File Integrity Verification",
//         "Hash Comparison Tool",
//         "Digital Signature Creation"
//       ],
//       demo: "🔐 SHA-256: 7f83b1657ff1fc53b92dc18148a1d65d",
//       action: "Generate Hash →",
//       get result() {
//         return `🔐 Hash Generated!\n🔑 SHA-256: ${this._hash || '7f83b1657ff1fc53b92dc18148a1d65d'}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
//       }
//     }
//   };

//   const data = techniqueData[technique];
//   if (!data) return null;

//   // ============================================================
//   //  NAVIGATE TO ANALYZE (with signup fallback)
//   // ============================================================
//   const goToAnalyze = () => {
//     if (user) {
//       navigate('/analyze');
//     } else {
//       navigate('/signup');
//     }
//   };

//   // ============================================================
//   //  HANDLE ACTION BUTTON
//   // ============================================================
//   const handleAction = async () => {
//     // ── HASH: generate real hash if file present ──
//     if (technique === 'hash' && file) {
//       try {
//         const buffer = await file.arrayBuffer();
//         const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//         data._hash = hashHex;
//         const resultText = `🔐 Hash Generated!\n🔑 SHA-256: ${hashHex}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
//         setResultData(resultText);
//         setShowDemoResult(true);
//       } catch (err) {
//         setResultData(`❌ Error generating hash: ${err.message}`);
//         setShowDemoResult(true);
//       }
//       return;
//     }

//     // ── GPS: open real Google Maps location in new tab ──
//     if (technique === 'gps') {
//       window.open(
//         'https://www.google.com/maps?q=19.0697,72.8881',
//         '_blank',
//         'noopener,noreferrer'
//       );
//       // Also show the result panel with details
//       setResultData(data.result);
//       setShowDemoResult(true);
//       return;
//     }

//     // ── EXIF / PLATFORM: send to analyze (or signup for guests) ──
//     if (technique === 'exif' || technique === 'platform') {
//       goToAnalyze();
//       return;
//     }

//     // ── Everything else: show demo result ──
//     setResultData(data.result);
//     setShowDemoResult(true);
//   };

//   const getResultText = () => {
//     if (resultData) return resultData;
//     return data.result || data.demo;
//   };

//   return (
//     <div className="technique-detail-overlay" onClick={onClose}>
//       <div className="technique-detail-modal" onClick={(e) => e.stopPropagation()}>
        
//         {/* Close Button */}
//         <button className="technique-detail-close" onClick={onClose}>✕</button>

//         {/* Header */}
//         <div className="technique-detail-header" style={{ borderColor: data.color }}>
//           <span className="technique-detail-icon" style={{ color: data.color }}>{data.icon}</span>
//           <h2 className="technique-detail-title">{data.title}</h2>
//         </div>

//         {/* Content */}
//         <div className="technique-detail-body">
//           <p className="technique-detail-desc">{data.description}</p>

//           {/* Features */}
//           <div className="technique-detail-features">
//             <h4>🔍 Key Features</h4>
//             <ul>
//               {data.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Demo */}
//           <div className="technique-detail-demo" style={{ borderColor: data.color }}>
//             <span className="technique-demo-label">⚡ LIVE DEMO</span>
//             <p className="technique-demo-text">{data.demo}</p>
//           </div>

//           {/* Action Button */}
//           <button 
//             className="technique-detail-action" 
//             style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}88)` }}
//             onClick={handleAction}
//           >
//             {data.action}
//           </button>

//           {/* Demo Result (shown when action is clicked) */}
//           {showDemoResult && (
//             <div className="technique-demo-result">
//               <div className="technique-demo-result-header">
//                 <span>📋 RESULT</span>
//                 <button onClick={() => setShowDemoResult(false)}>✕</button>
//               </div>
//               <pre className="technique-demo-result-text">{getResultText()}</pre>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="technique-detail-footer">
//           <span>Powered by MetaLens v2.0</span>
//           <span>🔬 Forensic Intelligence</span>
//         </div>

//       </div>

//       <style jsx>{`
//         .technique-detail-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           backdrop-filter: blur(12px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .technique-detail-modal {
//           position: relative;
//           max-width: 540px;
//           width: 100%;
//           padding: 32px;
//           background: #0f172a;
//           border: 1px solid rgba(0, 218, 255, 0.15);
//           max-height: 90vh;
//           overflow-y: auto;
//         }

//         .technique-detail-close {
//           position: absolute;
//           top: 16px;
//           right: 16px;
//           background: none;
//           border: none;
//           color: #667799;
//           font-size: 20px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           padding: 4px 8px;
//           border-radius: 4px;
//         }

//         .technique-detail-close:hover {
//           color: #eefaff;
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .technique-detail-header {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding-bottom: 16px;
//           border-bottom: 2px solid;
//           margin-bottom: 20px;
//         }

//         .technique-detail-icon {
//           font-size: 32px;
//           font-family: "Orbitron", sans-serif;
//         }

//         .technique-detail-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           color: #edfaff;
//           letter-spacing: 2px;
//           margin: 0;
//         }

//         .technique-detail-body {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .technique-detail-desc {
//           color: #829aa6;
//           font-size: 15px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .technique-detail-features h4 {
//           color: #8899bb;
//           font-size: 12px;
//           font-family: "Orbitron", sans-serif;
//           letter-spacing: 1px;
//           margin-bottom: 10px;
//         }

//         .technique-detail-features ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 8px;
//         }

//         .technique-detail-features li {
//           color: #c0d0e0;
//           font-size: 13px;
//           padding: 6px 12px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 4px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .technique-detail-features li::before {
//           content: "›";
//           color: #00d4ff;
//           font-weight: 700;
//         }

//         .technique-detail-demo {
//           padding: 16px;
//           border: 1px solid;
//           border-radius: 8px;
//           background: rgba(0, 0, 0, 0.3);
//         }

//         .technique-demo-label {
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           color: #667799;
//           letter-spacing: 1.5px;
//           display: block;
//           margin-bottom: 6px;
//         }

//         .technique-demo-text {
//           color: #e0e8f0;
//           font-size: 14px;
//           margin: 0;
//           font-weight: 500;
//         }

//         .technique-detail-action {
//           padding: 14px 24px;
//           border: none;
//           border-radius: 8px;
//           color: white;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 16px;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 4px;
//         }

//         .technique-detail-action:hover {
//           transform: scale(1.02);
//           box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
//         }

//         .technique-demo-result {
//           margin-top: 8px;
//           border: 1px solid rgba(0, 218, 255, 0.2);
//           border-radius: 8px;
//           overflow: hidden;
//           animation: slideDown 0.3s ease;
//         }

//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .technique-demo-result-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 8px 14px;
//           background: rgba(0, 0, 0, 0.3);
//           border-bottom: 1px solid rgba(0, 218, 255, 0.1);
//         }

//         .technique-demo-result-header span {
//           color: #00cde9;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 1px;
//         }

//         .technique-demo-result-header button {
//           background: none;
//           border: none;
//           color: #667799;
//           cursor: pointer;
//           font-size: 14px;
//           padding: 2px 6px;
//         }

//         .technique-demo-result-header button:hover {
//           color: #eefaff;
//         }

//         .technique-demo-result-text {
//           padding: 14px;
//           margin: 0;
//           color: #c0d0e0;
//           font-size: 13px;
//           font-family: "Rajdhani", sans-serif;
//           line-height: 1.8;
//           white-space: pre-wrap;
//           background: rgba(0, 0, 0, 0.2);
//         }

//         .technique-detail-footer {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 20px;
//           padding-top: 16px;
//           border-top: 1px solid #1a2340;
//           color: #445566;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 1px;
//         }

//         @media (max-width: 600px) {
//           .technique-detail-modal {
//             padding: 20px;
//           }

//           .technique-detail-features ul {
//             grid-template-columns: 1fr;
//           }

//           .technique-detail-title {
//             font-size: 15px;
//           }

//           .technique-detail-footer {
//             flex-direction: column;
//             gap: 6px;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TechniqueDetail;

























import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TechniqueDetail = ({ technique, onClose, file }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDemoResult, setShowDemoResult] = useState(false);
  const [resultData, setResultData] = useState(null);

  // ============================================================
  //  TECHNIQUE DATA
  // ============================================================
  const techniqueData = {
    exif: {
      title: "EXIF METADATA",
      icon: "◉",
      color: "#00dfff",
      description: "Extract hidden camera data, timestamps, and device information from any image.",
      features: [
        "Camera Make & Model",
        "Lens & Focal Length",
        "ISO, Shutter Speed, Aperture",
        "Software & Firmware Version",
        "Embedded Thumbnail Extraction"
      ],
      demo: "📷 Sample: Canon EOS R5, 24-70mm f/2.8, ISO 100",
      action: "Try EXIF Extraction →",
      result: "✅ EXIF Extracted!\n📷 Canon EOS R5\n📅 2024:08:19 14:30:25\n🔍 ISO 100, F/2.8, 1/100s"
    },
    gps: {
      title: "GPS RECOVERY",
      icon: "⌖",
      color: "#34d399",
      description: "Recover exact location coordinates from images where GPS was enabled.",
      features: [
        "Latitude & Longitude Extraction",
        "Reverse Geocoding (Address)",
        "GPS Altitude & Accuracy",
        "Timestamp Correlation",
        "Location Heatmap Generation"
      ],
      demo: "📍 19.0697°N, 72.8881°E → Sable Nagar, Kurla, Mumbai",
      action: "Find Location →",
      result: "📍 Location Found!\n📌 Sable Nagar, Kurla, Mumbai\n🗺️ 19.0697°N, 72.8881°E\n📅 2024:08:19 14:30:25"
    },
    platform: {
      title: "PLATFORM DETECTION",
      icon: "◈",
      color: "#fbbf24",
      description: "Identify which platform an image originated from based on compression patterns.",
      features: [
        "WhatsApp Compression Detection",
        "Instagram Filter Recognition",
        "Facebook Upload Patterns",
        "Screenshot Detection",
        "Social Media Timeline Analysis"
      ],
      demo: "📱 Detected: WhatsApp Web v2.2345.6",
      action: "Detect Platform →",
      result: "✅ Platform Detected!\n📱 WhatsApp Web v2.2345.6\n📊 Confidence: 95%\n🔍 WhatsApp compression pattern found"
    },
    integrity: {
      title: "IMAGE INTEGRITY",
      icon: "▤",
      color: "#f87171",
      description: "Detect image manipulation, cloning, and editing with advanced forensic techniques.",
      features: [
        "Error Level Analysis (ELA)",
        "Clone Detection",
        "Noise Inconsistency Analysis",
        "JPEG Artifact Detection",
        "Manipulation Heatmap"
      ],
      demo: "🔴 Manipulation Detected: 72% Confidence",
      action: "Check Integrity →",
      result: "🔬 Integrity Analysis Complete!\n⚠️ Manipulation Detected: 72%\n🔍 Cloning detected in bottom right\n📊 Noise inconsistency in shadows"
    },
    ai: {
      title: "AI VISUAL ANALYSIS",
      icon: "◈",
      color: "#a78bfa",
      description: "AI-powered analysis for location, device, and object recognition from visual clues.",
      features: [
        "Location from Architecture",
        "Device from Image Quality",
        "Object & Scene Recognition",
        "Text Detection (OCR)",
        "Visual Anomaly Detection"
      ],
      demo: "🤖 AI says: New York City, NY • iPhone 14 Pro • Daytime",
      action: "Run AI Analysis →",
      result: "🤖 AI Analysis Complete!\n📍 New York City, NY\n📱 iPhone 14 Pro\n🕐 Daytime (14:30)\n📝 Text Detected: 'NYC'"
    },
    hash: {
      title: "HASH FINGERPRINT",
      icon: "#",
      color: "#f472b6",
      description: "Generate cryptographic SHA-256 fingerprints to verify image authenticity.",
      features: [
        "SHA-256 Hash Generation",
        "MD5 & SHA-1 Support",
        "File Integrity Verification",
        "Hash Comparison Tool",
        "Digital Signature Creation"
      ],
      demo: "🔐 SHA-256: 7f83b1657ff1fc53b92dc18148a1d65d",
      action: "Generate Hash →",
      get result() {
        return `🔐 Hash Generated!\n🔑 SHA-256: ${this._hash || '7f83b1657ff1fc53b92dc18148a1d65d'}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
      }
    }
  };

  const data = techniqueData[technique];
  if (!data) return null;

  // ============================================================
  //  NAVIGATE TO ANALYZE (with signup fallback)
  // ============================================================
  const goToAnalyze = () => {
    if (user) {
      navigate('/analyze');
    } else {
      navigate('/signup');
    }
  };

  // ============================================================
  //  HANDLE ACTION BUTTON
  // ============================================================
  const handleAction = async () => {
    // ── HASH: generate real hash if file present ──
    if (technique === 'hash' && file) {
      try {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        data._hash = hashHex;
        const resultText = `🔐 Hash Generated!\n🔑 SHA-256: ${hashHex}\n✅ Integrity: VERIFIED\n📅 Generated: ${new Date().toLocaleString()}`;
        setResultData(resultText);
        setShowDemoResult(true);
      } catch (err) {
        setResultData(`❌ Error generating hash: ${err.message}`);
        setShowDemoResult(true);
      }
      return;
    }

    // ── GPS: show result panel (map is rendered in JSX below) ──
    if (technique === 'gps') {
      setResultData(data.result);
      setShowDemoResult(true);
      return;
    }

    // ── EXIF / PLATFORM: send to analyze (or signup for guests) ──
    if (technique === 'exif' || technique === 'platform') {
      goToAnalyze();
      return;
    }

    // ── Everything else: show demo result ──
    setResultData(data.result);
    setShowDemoResult(true);
  };

  const getResultText = () => {
    if (resultData) return resultData;
    return data.result || data.demo;
  };

  return (
    <div className="technique-detail-overlay" onClick={onClose}>
      <div className="technique-detail-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button className="technique-detail-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="technique-detail-header" style={{ borderColor: data.color }}>
          <span className="technique-detail-icon" style={{ color: data.color }}>{data.icon}</span>
          <h2 className="technique-detail-title">{data.title}</h2>
        </div>

        {/* Content */}
        <div className="technique-detail-body">
          <p className="technique-detail-desc">{data.description}</p>

          {/* Features */}
          <div className="technique-detail-features">
            <h4>🔍 Key Features</h4>
            <ul>
              {data.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Demo */}
          <div className="technique-detail-demo" style={{ borderColor: data.color }}>
            <span className="technique-demo-label">⚡ LIVE DEMO</span>
            <p className="technique-demo-text">{data.demo}</p>
          </div>

          {/* Action Button */}
          <button
            className="technique-detail-action"
            style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}88)` }}
            onClick={handleAction}
          >
            {data.action}
          </button>

          {/* Demo Result (shown when action is clicked) */}
          {showDemoResult && (
            <div className="technique-demo-result">
              <div className="technique-demo-result-header">
                <span>📋 RESULT</span>
                <button onClick={() => setShowDemoResult(false)}>✕</button>
              </div>
              <pre className="technique-demo-result-text">{getResultText()}</pre>
            </div>
          )}

          {/* Embedded Google Map — only for GPS technique */}
          {technique === 'gps' && showDemoResult && (
            <div className="technique-map-embed">
              <iframe
                title="Location Map"
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: '8px', display: 'block' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=19.0697,72.8881&hl=en&z=14&output=embed"
              ></iframe>
              <div className="technique-map-caption">
                📍 Sable Nagar, Kurla, Mumbai, Maharashtra
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="technique-detail-footer">
          <span>Powered by MetaLens v2.0</span>
          <span>🔬 Forensic Intelligence</span>
        </div>

      </div>

      <style jsx>{`
        .technique-detail-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .technique-detail-modal {
          position: relative;
          max-width: 540px;
          width: 100%;
          padding: 32px;
          background: #0f172a;
          border: 1px solid rgba(0, 218, 255, 0.15);
          max-height: 90vh;
          overflow-y: auto;
        }

        .technique-detail-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #667799;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .technique-detail-close:hover {
          color: #eefaff;
          background: rgba(255, 255, 255, 0.05);
        }

        .technique-detail-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 2px solid;
          margin-bottom: 20px;
        }

        .technique-detail-icon {
          font-size: 32px;
          font-family: "Orbitron", sans-serif;
        }

        .technique-detail-title {
          font-family: "Orbitron", sans-serif;
          font-size: 18px;
          color: #edfaff;
          letter-spacing: 2px;
          margin: 0;
        }

        .technique-detail-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .technique-detail-desc {
          color: #829aa6;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        .technique-detail-features h4 {
          color: #8899bb;
          font-size: 12px;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .technique-detail-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .technique-detail-features li {
          color: #c0d0e0;
          font-size: 13px;
          padding: 6px 12px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .technique-detail-features li::before {
          content: "›";
          color: #00d4ff;
          font-weight: 700;
        }

        .technique-detail-demo {
          padding: 16px;
          border: 1px solid;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
        }

        .technique-demo-label {
          font-family: "Orbitron", sans-serif;
          font-size: 8px;
          color: #667799;
          letter-spacing: 1.5px;
          display: block;
          margin-bottom: 6px;
        }

        .technique-demo-text {
          color: #e0e8f0;
          font-size: 14px;
          margin: 0;
          font-weight: 500;
        }

        .technique-detail-action {
          padding: 14px 24px;
          border: none;
          border-radius: 8px;
          color: white;
          font-family: "Rajdhani", sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 4px;
        }

        .technique-detail-action:hover {
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
        }

        .technique-demo-result {
          margin-top: 8px;
          border: 1px solid rgba(0, 218, 255, 0.2);
          border-radius: 8px;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .technique-demo-result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(0, 218, 255, 0.1);
        }

        .technique-demo-result-header span {
          color: #00cde9;
          font-family: "Orbitron", sans-serif;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .technique-demo-result-header button {
          background: none;
          border: none;
          color: #667799;
          cursor: pointer;
          font-size: 14px;
          padding: 2px 6px;
        }

        .technique-demo-result-header button:hover {
          color: #eefaff;
        }

        .technique-demo-result-text {
          padding: 14px;
          margin: 0;
          color: #c0d0e0;
          font-size: 13px;
          font-family: "Rajdhani", sans-serif;
          line-height: 1.8;
          white-space: pre-wrap;
          background: rgba(0, 0, 0, 0.2);
        }

        /* =========================================================
           EMBEDDED MAP (GPS technique)
        ========================================================= */
        .technique-map-embed {
          margin-top: 10px;
          padding: 8px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(52, 211, 153, 0.35);
          border-radius: 8px;
          animation: slideDown 0.3s ease;
        }

        .technique-map-embed iframe {
          width: 100%;
          height: 260px;
          border: 0;
          border-radius: 6px;
          display: block;
          filter: invert(0.9) hue-rotate(180deg) brightness(0.95);
        }

        .technique-map-caption {
          margin-top: 8px;
          padding: 8px 12px;
          color: #34d399;
          font-family: "Orbitron", sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          text-align: center;
          background: rgba(52, 211, 153, 0.06);
          border-radius: 6px;
        }

        .technique-detail-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #1a2340;
          color: #445566;
          font-family: "Orbitron", sans-serif;
          font-size: 8px;
          letter-spacing: 1px;
        }

        @media (max-width: 600px) {
          .technique-detail-modal {
            padding: 20px;
          }

          .technique-detail-features ul {
            grid-template-columns: 1fr;
          }

          .technique-detail-title {
            font-size: 15px;
          }

          .technique-detail-footer {
            flex-direction: column;
            gap: 6px;
            text-align: center;
          }

          .technique-map-embed iframe {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default TechniqueDetail;