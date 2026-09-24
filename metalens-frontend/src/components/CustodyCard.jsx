import React from 'react';

const CustodyCard = ({ custody }) => {
  return (
    <div className="card info">
      <h3>🔗 Chain of Custody</h3>
      <div className="value">
        <div className="custody-timeline">
          {custody?.map((item, index) => (
            <div key={index} className="custody-item">
              <div className="event">{item.event}</div>
              <div className="details">{item.details}</div>
              {item.device && <div className="device">📱 {item.device}</div>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #60a5fa; }
        .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
        .value { font-size: 14px; line-height: 1.8; }
        .custody-timeline { position: relative; padding-left: 30px; }
        .custody-item { position: relative; padding: 10px 0; border-left: 2px solid #2a3a5c; padding-left: 20px; }
        .custody-item::before { content: ''; position: absolute; left: -6px; top: 14px; width: 10px; height: 10px; border-radius: 50%; background: #00d4ff; }
        .custody-item .event { font-weight: 600; color: #c0d0e0; }
        .custody-item .details { font-size: 13px; color: #667799; }
        .custody-item .device { font-size: 12px; color: #60a5fa; margin-top: 2px; }
      `}</style>
    </div>
  );
};

export default CustodyCard;