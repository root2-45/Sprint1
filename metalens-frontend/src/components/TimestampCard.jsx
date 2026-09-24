import React from 'react';

const TimestampCard = ({ timestamp }) => {
  // Check if any timestamp data exists (including new ones)
  const hasData = timestamp?.original || 
                  timestamp?.compression || 
                  timestamp?.human || 
                  timestamp?.reconstructed || 
                  timestamp?.filesystem;
                  
  const cardClass = hasData ? 'card info' : 'card warning';
  
  return (
    <div className={cardClass}>
      <h3>🕐 Timestamp Analysis</h3>
      <div className="value">
        
        {/* 1. ORIGINAL CLICK TIME (From EXIF) */}
        {timestamp?.original && (
          <div className="timestamp-row original">
            <span style={{ color: '#34d399' }}>✅ Original Click Time:</span>
            <strong>{timestamp.original}</strong>
            <span style={{ fontSize: '11px', color: '#667799', display: 'block' }}>
              (From DateTimeOriginal)
            </span>
          </div>
        )}

        {/* 2. COMPRESSION TIME (From ModifyDate) */}
        {timestamp?.compression && (
          <div className="timestamp-row compression">
            <span style={{ color: '#f59e0b' }}>🔄 Compression Time:</span>
            <strong>{timestamp.compression}</strong>
            <span style={{ fontSize: '11px', color: '#667799', display: 'block' }}>
              (From ModifyDate - when file was last modified)
            </span>
          </div>
        )}

        {/* 3. HUMAN-READABLE TIME (From ImageDescription) */}
        {timestamp?.human && (
          <div className="timestamp-row human">
            <span style={{ color: '#60a5fa' }}>📝 Human-Readable Time:</span>
            <strong>{timestamp.human}</strong>
            <span style={{ fontSize: '11px', color: '#667799', display: 'block' }}>
              (From ImageDescription)
            </span>
          </div>
        )}

        {/* 4. RECONSTRUCTED DATE FROM FILENAME - NEW! */}
        {timestamp?.reconstructed && (
          <div className="timestamp-row reconstructed">
            <span style={{ color: '#fbbf24' }}>📅 Reconstructed Date:</span>
            <strong>{timestamp.reconstructed}</strong>
            <span style={{ fontSize: '11px', color: '#667799', display: 'block' }}>
              (Extracted from filename - WhatsApp/Instagram pattern)
            </span>
          </div>
        )}

        {/* 5. FILE SYSTEM DATE - NEW! */}
        {timestamp?.filesystem && (
          <div className="timestamp-row filesystem">
            <span style={{ color: '#f87171' }}>📁 File System Date:</span>
            <strong>{timestamp.filesystem}</strong>
            <span style={{ fontSize: '11px', color: '#667799', display: 'block' }}>
              (Date file was downloaded/saved to computer)
            </span>
          </div>
        )}

        {/* NO DATA FOUND */}
        {!hasData && (
          <div style={{ color: '#f59e0b' }}>❌ No timestamps could be recovered</div>
        )}

      </div>

      <style jsx>{`
        .card {
          background: #141b2b;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 14px;
          border-left: 4px solid #2a3a5c;
        }
        .card.info { border-left-color: #60a5fa; }
        .card.warning { border-left-color: #f59e0b; }
        .card h3 {
          color: #8899bb;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .value {
          font-size: 14px;
          line-height: 1.8;
        }
        .timestamp-row {
          padding: 4px 0;
          border-left: 2px solid #2a3a5c;
          padding-left: 10px;
          margin: 4px 0;
        }
        .timestamp-row.original { border-left-color: #34d399; }
        .timestamp-row.compression { border-left-color: #f59e0b; }
        .timestamp-row.human { border-left-color: #60a5fa; }
        .timestamp-row.reconstructed { border-left-color: #fbbf24; }
        .timestamp-row.filesystem { border-left-color: #f87171; }
      `}</style>
    </div>
  );
};

export default TimestampCard;