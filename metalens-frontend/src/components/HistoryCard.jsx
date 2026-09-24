import React from 'react';

const HistoryCard = ({ report, onView, onDelete, onDownloadPDF }) => {
  // Extract common fields with fallbacks
  const verdict = report.verdict || {};
  const exif = report.exif || {};
  const gps = report.gps || {};
  const platform = report.platform_details || {};

  // Verdict badge class
  const verdictClass = (verdict.authenticity || 'unknown').toLowerCase();
  const verdictEmoji =
    verdictClass === 'authentic' ? '✅' :
    verdictClass === 'partial' ? '⚠️' :
    verdictClass === 'tampered' ? '❌' : '❓';

  // Format date
  const formatDate = (iso) => {
    if (!iso) return 'Unknown';
    try {
      const d = new Date(iso);
      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const device = `${exif['IFD0:Make'] || ''} ${exif['IFD0:Model'] || ''}`.trim() || 'Unknown';
  const location = gps.address || (gps.lat ? `${gps.lat}, ${gps.lon}` : 'No location');

  return (
    <div className="history-card">
      {/* Left: thumbnail placeholder / icon */}
      <div className="history-card-thumb">
        <span className="history-thumb-icon">📷</span>
      </div>

      {/* Middle: details */}
      <div className="history-card-body">
        <div className="history-card-top">
          <div className="history-file-name" title={report.file_name}>
            {report.file_name || 'untitled.jpg'}
          </div>
          <div className={`history-verdict-badge ${verdictClass}`}>
            {verdictEmoji} {verdict.authenticity || 'UNKNOWN'}
            {verdict.score !== undefined && (
              <span className="history-verdict-score"> · {verdict.score}%</span>
            )}
          </div>
        </div>

        <div className="history-card-meta">
          <span>🕐 {formatDate(report.created_at || report.analysis_time)}</span>
          <span>📱 {device}</span>
          <span>📍 {location}</span>
          {platform.name && <span>🌐 {platform.name}</span>}
        </div>

        {report.sha256 && (
          <div className="history-card-hash">
            <span>SHA-256:</span> <code>{report.sha256.substring(0, 16)}…{report.sha256.substring(report.sha256.length - 8)}</code>
          </div>
        )}
      </div>

      {/* Right: actions */}
      <div className="history-card-actions">
        <button
          className="history-action-btn primary"
          onClick={() => onView(report)}
          title="View full report"
        >
          👁️ View
        </button>
        <button
          className="history-action-btn secondary"
          onClick={() => onDownloadPDF(report)}
          title="Open PDF report"
        >
          📄 PDF
        </button>
        <button
          className="history-action-btn danger"
          onClick={() => onDelete(report)}
          title="Delete this report"
        >
          🗑️
        </button>
      </div>

      <style jsx>{`
        .history-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #0f172a;
          border: 1px solid #1a2340;
          border-radius: 10px;
          transition: all 0.25s ease;
        }

        .history-card:hover {
          border-color: #00d4ff;
          transform: translateX(2px);
        }

        .history-card-thumb {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 252, 0.1));
          border: 1px solid rgba(0, 218, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-thumb-icon {
          font-size: 28px;
          opacity: 0.85;
        }

        .history-card-body {
          flex: 1;
          min-width: 0;
        }

        .history-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .history-file-name {
          color: #edfaff;
          font-weight: 600;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: "Rajdhani", sans-serif;
        }

        .history-verdict-badge {
          flex-shrink: 0;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 0.5px;
        }

        .history-verdict-badge.authentic {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.4);
        }

        .history-verdict-badge.partial {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.4);
        }

        .history-verdict-badge.tampered {
          background: rgba(248, 113, 113, 0.12);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.4);
        }

        .history-verdict-badge.unknown {
          background: rgba(102, 119, 153, 0.12);
          color: #8899bb;
          border: 1px solid rgba(102, 119, 153, 0.4);
        }

        .history-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #667799;
          font-family: "Rajdhani", sans-serif;
          margin-bottom: 6px;
        }

        .history-card-hash {
          font-size: 10px;
          color: #667799;
          font-family: "Orbitron", sans-serif;
        }

        .history-card-hash code {
          color: #00d4ff;
          font-family: "Courier New", monospace;
          font-size: 10px;
        }

        .history-card-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .history-action-btn {
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: "Rajdhani", sans-serif;
          border: 1px solid transparent;
        }

        .history-action-btn.primary {
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
        }

        .history-action-btn.primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        }

        .history-action-btn.secondary {
          background: transparent;
          color: #8899bb;
          border: 1px solid #1a2340;
        }

        .history-action-btn.secondary:hover {
          border-color: #00d4ff;
          color: #00d4ff;
        }

        .history-action-btn.danger {
          background: transparent;
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .history-action-btn.danger:hover {
          background: rgba(248, 113, 113, 0.1);
          border-color: #f87171;
        }

        @media (max-width: 700px) {
          .history-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .history-card-actions {
            width: 100%;
            justify-content: flex-end;
          }
          .history-card-thumb {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HistoryCard;