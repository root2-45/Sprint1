import React from 'react';

const ReconstructedCard = ({ reconstructed, platformDetails }) => {
  const hasMetadata = reconstructed?.has_metadata || false;
  const cardClass = hasMetadata ? 'card success' : 'card warning';
  return (
    <div className={cardClass}>
      <h3>🔄 Reconstructed Data</h3>
      <div className="value">
        <div className="data-row"><span className="data-label">Platform:</span><span className="data-value">{platformDetails?.icon || ''} {platformDetails?.name || reconstructed?.platform || 'Unknown'}</span></div>
        <div className="data-row"><span className="data-label">Metadata Status:</span><span className="data-value">{reconstructed?.metadata_status || 'Unknown'}</span></div>
        {reconstructed?.reconstructed_date && <div className="data-row"><span className="data-label">📅 Reconstructed Date:</span><span className="data-value" style={{ color: '#fbbf24' }}>{reconstructed.reconstructed_date}</span></div>}
        {hasMetadata ? <div style={{ color: '#34d399', marginTop: '4px' }}>✅ Original metadata is intact</div> : <div style={{ color: '#f59e0b', marginTop: '4px' }}>⚠️ Metadata was stripped</div>}
      </div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #2a3a5c; }
        .card.success { border-left-color: #34d399; }
        .card.warning { border-left-color: #f59e0b; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .data-row { padding: 3px 0; }
        .data-label { color: #667799; font-size: 13px; }
        .data-value { color: #e0e8f0; font-weight: 500; }
      `}</style>
    </div>
  );
};

export default ReconstructedCard;