import React from 'react';

const RecommendationsCard = ({ verdict }) => {
  const evidence = verdict?.evidence || [];
  const recommendations = verdict?.recommendations || [];
  return (
    <div className="card info">
      <h3>💡 Recommendations</h3>
      <div className="value">
        {evidence.length > 0 && <>
          <div style={{ marginBottom: '8px', color: '#8899bb', fontWeight: 600 }}>📌 Evidence Found:</div>
          {evidence.map((item, index) => <div key={index} className="recommendation-item">{item}</div>)}
          <div style={{ marginTop: '12px', color: '#8899bb', fontWeight: 600 }}>💡 Recommendations:</div>
        </>}
        {recommendations.length > 0 ? recommendations.map((item, index) => <div key={index} className="recommendation-item">{item}</div>) : <div style={{ color: '#667799' }}>No specific recommendations</div>}
      </div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #60a5fa; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .recommendation-item { padding: 4px 0; border-bottom: 1px solid #1a2340; }
        .recommendation-item:last-child { border-bottom: none; }
      `}</style>
    </div>
  );
};

export default RecommendationsCard;