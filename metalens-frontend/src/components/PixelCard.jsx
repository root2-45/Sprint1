import React from 'react';

const PixelCard = ({ pixel }) => {
  return (
    <div className="card info">
      <h3>🔬 Pixel Analysis</h3>
      <div className="value">
        {pixel?.error ? <div style={{ color: '#f59e0b' }}>{pixel.error}</div> : (
          <>
            <div className="data-row"><span className="data-label">Dimensions:</span><span className="data-value">{pixel?.width} × {pixel?.height}</span></div>
            <div className="data-row"><span className="data-label">Megapixels:</span><span className="data-value">{pixel?.megapixels || '?'} MP</span></div>
            <div className="data-row"><span className="data-label">Aspect Ratio:</span><span className="data-value">{pixel?.aspect_ratio || '?'}</span></div>
            <div className="data-row"><span className="data-label">Entropy:</span><span className="data-value">{pixel?.entropy || '?'}</span></div>
            {pixel?.is_square && <div style={{ color: '#fbbf24', marginTop: '4px' }}>🔍 Square crop detected — typical of Instagram</div>}
            {pixel?.is_compressed && <div style={{ color: '#f59e0b', marginTop: '4px' }}>⚠️ Heavy compression detected — likely from social media</div>}
          </>
        )}
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

export default PixelCard;