// import React from 'react';

// const ExifCard = ({ exif }) => {
//   const exifKeys = ['Make', 'Model', 'DateTimeOriginal', 'CreateDate', 'ModifyDate',
//     'FocalLength', 'FNumber', 'ISO', 'ExposureTime', 'Software', 'LensModel'];
//   let found = false;
//   let items = [];
//   for (const key of exifKeys) {
//     if (exif && exif[key] && exif[key] !== '' && exif[key] !== 'N/A') {
//       found = true;
//       items.push({ key, value: exif[key] });
//     }
//   }
//   const cardClass = found ? 'card success' : 'card warning';
//   return (
//     <div className={cardClass}>
//       <h3>📋 EXIF Metadata</h3>
//       <div className="value">
//         {found ? items.map((item, idx) => (
//           <div key={idx} className="data-row"><span className="data-label">{item.key}:</span><span className="data-value">{item.value}</span></div>
//         )) : <div style={{ color: '#f59e0b' }}>❌ No EXIF metadata found — data was stripped</div>}
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

// export default ExifCard;



import React from 'react';

const ExifCard = ({ exif }) => {
  // Map the actual tag names from ExifTool
  const exifKeys = [
    { key: 'IFD0:Make', label: 'Make' },
    { key: 'IFD0:Model', label: 'Model' },
    { key: 'IFD0:Software', label: 'Software' },
    { key: 'IFD0:ModifyDate', label: 'Modify Date' },
    { key: 'ExifIFD:DateTimeOriginal', label: 'Date/Time Original' },
    { key: 'ExifIFD:CreateDate', label: 'Create Date' },
    { key: 'ExifIFD:ExposureTime', label: 'Exposure Time' },
    { key: 'ExifIFD:FNumber', label: 'F Number' },
    { key: 'ExifIFD:ISO', label: 'ISO' },
    { key: 'ExifIFD:FocalLength', label: 'Focal Length' },
    { key: 'ExifIFD:ExposureProgram', label: 'Exposure Program' },
    { key: 'ExifIFD:WhiteBalance', label: 'White Balance' },
    { key: 'GPS:GPSLatitude', label: 'GPS Latitude' },
    { key: 'GPS:GPSLongitude', label: 'GPS Longitude' },
    { key: 'GPS:GPSPosition', label: 'GPS Position' },
    { key: 'Samsung:MCCData', label: 'Country' },
    { key: 'Composite:Megapixels', label: 'Megapixels' },
    { key: 'Composite:ImageSize', label: 'Image Size' },
  ];

  let found = false;
  let items = [];

  for (const { key, label } of exifKeys) {
    if (exif && exif[key] && exif[key] !== '' && exif[key] !== 'N/A') {
      found = true;
      items.push({ label, value: exif[key] });
    }
  }

  const cardClass = found ? 'card success' : 'card warning';

  return (
    <div className={cardClass}>
      <h3>📋 EXIF Metadata</h3>
      <div className="value">
        {found ? (
          items.map((item, idx) => (
            <div key={idx} className="data-row">
              <span className="data-label">{item.label}:</span>
              <span className="data-value">{item.value}</span>
            </div>
          ))
        ) : (
          <div style={{ color: '#f59e0b' }}>❌ No EXIF metadata found</div>
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

export default ExifCard;