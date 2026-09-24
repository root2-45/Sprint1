// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// const UploadZone = ({ onFileUpload, preview, error }) => {
//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       onFileUpload(acceptedFiles[0]);
//     }
//   }, [onFileUpload]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'image/*': [] },
//     multiple: false,
//     maxSize: 50 * 1024 * 1024,
//   });

//   return (
//     <div className="upload-section">
//       <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'dragover' : ''}`}>
//         <input {...getInputProps()} />
//         <div className="upload-icon">📸</div>
//         <div className="upload-text">{isDragActive ? 'Drop your image here' : 'Drop your image here'}</div>
//         <div className="upload-hint">or click to browse • JPG, PNG, WEBP</div>
//         <div className="upload-size">Max file size: 50MB</div>
//       </div>
//       {preview && (
//         <div className="preview-container">
//           <img src={preview} alt="Preview" className="preview-image" />
//         </div>
//       )}
//       {error && <div className="error-message">❌ {error}</div>}
//       <style>{`
//         .upload-section { margin: 20px 0; }
//         .upload-zone { border: 2px dashed #2a3a5c; border-radius: 16px; padding: 50px 20px; text-align: center; cursor: pointer; transition: all 0.3s ease; background: #0f172a; }
//         .upload-zone:hover { border-color: #00d4ff; background: #1a2340; }
//         .upload-zone.dragover { border-color: #7b2ffc; background: #1f1a3a; }
//         .upload-icon { font-size: 56px; margin-bottom: 10px; }
//         .upload-text { font-size: 18px; color: #c0d0e0; }
//         .upload-hint { font-size: 13px; color: #667799; margin-top: 6px; }
//         .upload-size { font-size: 11px; color: #445566; margin-top: 8px; }
//         .preview-container { text-align: center; margin-top: 15px; }
//         .preview-image { max-width: 300px; max-height: 250px; border-radius: 12px; border: 1px solid #2a3a5c; }
//         .error-message { margin-top: 12px; padding: 12px; background: #7f1d1d; border-radius: 8px; color: #f87171; text-align: center; }
//       `}</style>
//     </div>
//   );
// };

// export default UploadZone;




import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadZone = ({ onFileUpload, preview, error }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div className="upload-zone-wrapper">
      <div 
        {...getRootProps()} 
        className={`upload-zone-forensic ${isDragActive ? 'dragover' : ''} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input {...getInputProps()} />
        
        {/* Forensic Corners */}
        <div className="upload-corners">
          <span></span><span></span><span></span><span></span>
        </div>

        {/* Scan Line */}
        <div className="upload-scan-line"></div>

        {/* Grid Overlay */}
        <div className="upload-grid-overlay"></div>

        {/* Content */}
        <div className="upload-content">
          <div className="upload-forensic-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="16" width="40" height="32" rx="4" stroke="#00dfff" strokeWidth="1.5"/>
              <circle cx="32" cy="32" r="12" stroke="#00dfff" strokeWidth="1.5" opacity="0.6"/>
              <circle cx="32" cy="32" r="5" fill="#00dfff" opacity="0.15"/>
              <circle cx="32" cy="32" r="2" fill="#00dfff" opacity="0.5"/>
              <line x1="12" y1="32" x2="52" y2="32" stroke="#00dfff" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="y1" from="16" to="48" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="y2" from="16" to="48" dur="3s" repeatCount="indefinite"/>
              </line>
            </svg>
          </div>
          <div className="upload-text-forensic">
            {isDragActive ? 'DROP IMAGE FOR ANALYSIS' : 'DROP YOUR IMAGE HERE'}
          </div>
          <div className="upload-hint-forensic">or click to browse • JPG, PNG, WEBP</div>
          <div className="upload-size-forensic">MAX FILE SIZE: 50MB</div>
          <div className="upload-status">
            <span className="upload-dot"></span>
            SECURE FORENSIC ENVIRONMENT
          </div>
        </div>
      </div>

      {preview && (
        <div className="upload-preview-container">
          <div className="upload-preview-frame">
            <div className="upload-preview-corners">
              <span></span><span></span><span></span><span></span>
            </div>
            <img src={preview} alt="Preview" className="upload-preview-image" />
            <div className="upload-preview-overlay">
              <span>EVIDENCE_READY</span>
              <span>●</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="upload-error">
          <span>⚠</span> {error}
        </div>
      )}

      <style jsx>{`
        .upload-zone-wrapper {
          margin: 20px 0;
          position: relative;
        }

        .upload-zone-forensic {
          position: relative;
          padding: 60px 30px;
          border: 1px solid rgba(0, 218, 255, 0.25);
          background: rgba(3, 15, 23, 0.6);
          text-align: center;
          cursor: pointer;
          transition: all 0.4s ease;
          overflow: hidden;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-zone-forensic:hover {
          border-color: rgba(0, 218, 255, 0.55);
          background: rgba(3, 20, 30, 0.8);
          box-shadow: 0 0 40px rgba(0, 210, 255, 0.06);
        }

        .upload-zone-forensic.dragover {
          border-color: #00dfff;
          background: rgba(0, 210, 255, 0.06);
          box-shadow: 0 0 60px rgba(0, 210, 255, 0.1);
        }

        /* Forensic Corners */
        .upload-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .upload-corners span {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #00e1ff;
          border-style: solid;
          filter: drop-shadow(0 0 5px #00dfff);
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .upload-zone-forensic:hover .upload-corners span {
          opacity: 1;
        }

        .upload-corners span:nth-child(1) {
          top: 12px;
          left: 12px;
          border-width: 2px 0 0 2px;
        }

        .upload-corners span:nth-child(2) {
          top: 12px;
          right: 12px;
          border-width: 2px 2px 0 0;
        }

        .upload-corners span:nth-child(3) {
          bottom: 12px;
          left: 12px;
          border-width: 0 0 2px 2px;
        }

        .upload-corners span:nth-child(4) {
          bottom: 12px;
          right: 12px;
          border-width: 0 2px 2px 0;
        }

        .upload-scan-line {
          position: absolute;
          left: 0;
          top: -2px;
          width: 100%;
          height: 1px;
          background: #00eaff;
          box-shadow: 0 0 10px #00eaff;
          opacity: 0.3;
          animation: uploadScan 4s linear infinite;
        }

        @keyframes uploadScan {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 102%; opacity: 0; }
        }

        .upload-grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            linear-gradient(rgba(0, 220, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 220, 255, 0.5) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .upload-content {
          position: relative;
          z-index: 2;
        }

        .upload-forensic-icon {
          margin-bottom: 20px;
        }

        .upload-text-forensic {
          font-family: "Orbitron", sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #eefaff;
          margin-bottom: 8px;
        }

        .upload-zone-forensic.dragover .upload-text-forensic {
          color: #00dfff;
        }

        .upload-hint-forensic {
          color: #667799;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .upload-size-forensic {
          color: #445566;
          font-size: 11px;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .upload-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 16px;
          border: 1px solid rgba(0, 220, 255, 0.12);
          background: rgba(0, 210, 255, 0.03);
          color: #4a6f7a;
          font-family: "Orbitron", sans-serif;
          font-size: 7px;
          letter-spacing: 1.5px;
        }

        .upload-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00ffb3;
          box-shadow: 0 0 8px #00ffb3;
          animation: uploadPulse 1.5s infinite;
        }

        @keyframes uploadPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Preview */
        .upload-preview-container {
          margin-top: 25px;
          display: flex;
          justify-content: center;
        }

        .upload-preview-frame {
          position: relative;
          max-width: 320px;
          border: 1px solid rgba(0, 218, 255, 0.25);
          padding: 8px;
          background: rgba(3, 15, 23, 0.6);
        }

        .upload-preview-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .upload-preview-corners span {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: #00e1ff;
          border-style: solid;
          opacity: 0.5;
        }

        .upload-preview-corners span:nth-child(1) {
          top: 8px;
          left: 8px;
          border-width: 2px 0 0 2px;
        }

        .upload-preview-corners span:nth-child(2) {
          top: 8px;
          right: 8px;
          border-width: 2px 2px 0 0;
        }

        .upload-preview-corners span:nth-child(3) {
          bottom: 8px;
          left: 8px;
          border-width: 0 0 2px 2px;
        }

        .upload-preview-corners span:nth-child(4) {
          bottom: 8px;
          right: 8px;
          border-width: 0 2px 2px 0;
        }

        .upload-preview-image {
          width: 100%;
          height: auto;
          display: block;
          filter: brightness(0.85) contrast(1.05);
        }

        .upload-preview-overlay {
          position: absolute;
          bottom: 12px;
          left: 16px;
          right: 16px;
          display: flex;
          justify-content: space-between;
          color: #7ca6b2;
          font-family: "Orbitron", sans-serif;
          font-size: 7px;
          letter-spacing: 1.5px;
        }

        .upload-preview-overlay span:last-child {
          color: #00ffb3;
        }

        /* Error */
        .upload-error {
          margin-top: 15px;
          padding: 14px 20px;
          border: 1px solid rgba(255, 80, 80, 0.25);
          background: rgba(255, 50, 50, 0.05);
          color: #f87171;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
        }

        .upload-error span {
          margin-right: 8px;
        }

        @media (max-width: 768px) {
          .upload-zone-forensic {
            padding: 40px 20px;
            min-height: 250px;
          }

          .upload-text-forensic {
            font-size: 14px;
          }

          .upload-hint-forensic {
            font-size: 12px;
          }

          .upload-forensic-icon svg {
            width: 48px;
            height: 48px;
          }
        }

        @media (max-width: 480px) {
          .upload-zone-forensic {
            padding: 30px 15px;
            min-height: 200px;
          }

          .upload-text-forensic {
            font-size: 12px;
          }

          .upload-status {
            font-size: 6px;
            padding: 4px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default UploadZone;