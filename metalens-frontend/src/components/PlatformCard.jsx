import React from 'react';

const PlatformCard = ({ platformDetails }) => {
  return (
    <div className="card info">
      <h3>📱 Social Media Fingerprint</h3>
      <div className="value">
        <div className="data-row"><span className="data-label">Platform:</span><span className="data-value">{platformDetails?.icon || ''} {platformDetails?.name || 'Unknown'}</span></div>
        <div className="data-row"><span className="data-label">Confidence:</span><span className="data-value">{platformDetails?.confidence || 'LOW'}</span></div>
        <div className="data-row"><span className="data-label">Fingerprint:</span><span className="data-value">{platformDetails?.fingerprint || 'N/A'}</span></div>
        <div className="data-row"><span className="data-label">Description:</span><span className="data-value">{platformDetails?.description || 'N/A'}</span></div>
      </div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #60a5fa; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .data-row { padding: 3px 0; }
        .data-label { color: #667799; font-size: 13px; }
        .data-value { color: #e0e8f0; font-weight: 500; }
      `}</style>
    </div>
  );
};

export default PlatformCard;