import React from 'react';

const AiCard = ({ ai }) => {
  let cardClass = 'card info';
  let content = '';
  if (ai?.success) { cardClass = 'card success'; content = <div className="ai-box">{ai.analysis}</div>; }
  else if (ai?.error) { cardClass = 'card warning'; content = <div style={{ color: '#f59e0b' }}>⚠️ {ai.error}</div>; }
  else { content = <div style={{ color: '#667799' }}>AI analysis not available</div>; }
  return (
    <div className={cardClass}>
      <h3>🤖 AI Vision Analysis</h3>
      <div className="value">{content}</div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #2a3a5c; }
        .card.success { border-left-color: #34d399; }
        .card.warning { border-left-color: #f59e0b; }
        .card.info { border-left-color: #60a5fa; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .ai-box { background: #0a0e1a; padding: 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
      `}</style>
    </div>
  );
};

export default AiCard;