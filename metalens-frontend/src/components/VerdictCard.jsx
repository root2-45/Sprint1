import React from 'react';

const VerdictCard = ({ verdict, reconstructed }) => {
  const score = verdict?.score || 0;
  const authenticity = verdict?.authenticity || 'UNKNOWN';
  let scoreClass = 'score-low';
  if (score >= 70) scoreClass = 'score-high';
  else if (score >= 40) scoreClass = 'score-med';
  let cardClass = 'card info';
  if (authenticity === 'AUTHENTIC') cardClass = 'card success';
  else if (authenticity === 'TAMPERED' || authenticity === 'PARTIAL') cardClass = 'card warning';
  let statusText = '❓ UNKNOWN';
  let statusColor = '#667799';
  if (authenticity === 'AUTHENTIC') { statusText = '✅ AUTHENTIC'; statusColor = '#34d399'; }
  else if (authenticity === 'PARTIAL') { statusText = '⚠️ PARTIAL'; statusColor = '#fbbf24'; }
  else if (authenticity === 'TAMPERED') { statusText = '⚠️ TAMPERED'; statusColor = '#f59e0b'; }

  return (
    <div className={`card ${cardClass}`}>
      <h3>⚖️ Forensic Verdict</h3>
      <div className="value">
        <span className={`score-ring ${scoreClass}`}>{score}%</span>
        <span style={{ fontSize: '22px', fontWeight: 700, color: statusColor }}>{statusText}</span>
        <div style={{ marginTop: '8px', color: '#8899bb', fontSize: '14px' }}>
          Platform: <strong>{reconstructed?.platform_icon || ''} {reconstructed?.platform_name || 'Unknown'}</strong>
          <br />Metadata: <strong>{reconstructed?.metadata_status || 'Unknown'}</strong>
          {reconstructed?.reconstructed_date && <><br />📅 Reconstructed Date: <strong style={{ color: '#fbbf24' }}>{reconstructed.reconstructed_date}</strong></>}
          {reconstructed?.warning && <><br /><span style={{ color: '#f59e0b' }}>{reconstructed.warning}</span></>}
        </div>
      </div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #2a3a5c; }
        .card.success { border-left-color: #34d399; }
        .card.warning { border-left-color: #f59e0b; }
        .card.info { border-left-color: #60a5fa; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .score-ring { display: inline-block; width: 60px; height: 60px; border-radius: 50%; line-height: 60px; text-align: center; font-size: 20px; font-weight: 700; margin-right: 12px; }
        .score-high { background: #064e3b; color: #34d399; }
        .score-med { background: #78350f; color: #fbbf24; }
        .score-low { background: #7f1d1d; color: #f87171; }
      `}</style>
    </div>
  );
};

export default VerdictCard;