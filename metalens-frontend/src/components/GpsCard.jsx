// import React from 'react';

// const GpsCard = ({ gps }) => {
//   const hasGps = gps && gps.lat && gps.lon;
//   const cardClass = hasGps ? 'card success' : 'card warning';
//   return (
//     <div className={cardClass}>
//       <h3>📍 GPS Location</h3>
//       <div className="value">
//         {hasGps ? (
//           <>
//             <div style={{ color: '#34d399', fontSize: '18px', fontWeight: 700 }}>✅ GPS FOUND</div>
//             <div className="data-row"><span className="data-label">Latitude:</span><span className="data-value">{gps.lat}</span></div>
//             <div className="data-row"><span className="data-label">Longitude:</span><span className="data-value">{gps.lon}</span></div>
//             <div style={{ marginTop: '8px', fontSize: '12px', color: '#667799' }}>🔍 Recovered using recursive flattening + DMS conversion</div>
//           </>
//         ) : (
//           <>
//             <div style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 700 }}>❌ GPS NOT FOUND</div>
//             <div style={{ marginTop: '8px', color: '#667799' }}>No GPS data could be recovered from any layer</div>
//             <div style={{ marginTop: '8px', fontSize: '12px', color: '#667799' }}>💡 Location services were likely OFF when photo was taken</div>
//           </>
//         )}
//       </div>
//       <style>{`
//         .card { background: #141b2b; border-radius: 12px; padding: 20px; margin-bottom: 14px; border-left: 4px solid #2a3a5c; }
//         .card.success { border-left-color: #34d399; }
//         .card.warning { border-left-color: #f59e0b; }
//         .card h3 { color: #8899bb; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
//         .value { font-size: 14px; line-height: 1.8; }
//         .data-row { padding: 3px 0; }
//         .data-label { color: #667799; font-size: 13px; }
//         .data-value { color: #e0e8f0; font-weight: 500; }
//       `}</style>
//     </div>
//   );
// };

// export default GpsCard;


import React from 'react';

const GpsCard = ({ gps }) => {
  // Extract GPS from the exif data
  const hasGps = gps && gps.lat && gps.lon;
  const cardClass = hasGps ? 'card success' : 'card warning';

  return (
    <div className={cardClass}>
      <h3>📍 GPS Location</h3>
      <div className="value">
        {hasGps ? (
          <>
            <div style={{ color: '#34d399', fontSize: '18px', fontWeight: 700 }}>✅ GPS FOUND</div>
            <div className="data-row">
              <span className="data-label">Latitude:</span>
              <span className="data-value">{gps.lat}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Longitude:</span>
              <span className="data-value">{gps.lon}</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 700 }}>❌ GPS NOT FOUND</div>
            <div style={{ marginTop: '8px', color: '#667799' }}>
              No GPS data could be recovered
            </div>
          </>
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
        .card.success { border-left-color: #34d399; }
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
        .data-row {
          padding: 3px 0;
        }
        .data-label {
          color: #667799;
          font-size: 13px;
        }
        .data-value {
          color: #e0e8f0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default GpsCard;