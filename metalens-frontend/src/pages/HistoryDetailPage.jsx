import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Reuse your existing cards
import VerdictCard from '../components/VerdictCard';
import ExifCard from '../components/ExifCard';
import ReconstructedCard from '../components/ReconstructedCard';
import GpsCard from '../components/GpsCard';
import TimestampCard from '../components/TimestampCard';
import PlatformCard from '../components/PlatformCard';
import CustodyCard from '../components/CustodyCard';
import PixelCard from '../components/PixelCard';
import AiCard from '../components/AiCard';
import RecommendationsCard from '../components/RecommendationsCard';

const HistoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/reports/${id}`);
        setReport(res.data.report);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleBack = () => navigate('/history');

  const handlePDF = () => {
    navigate('/pdf-report', { state: { results: report } });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#02070d', color: '#829aa6', fontFamily: 'Orbitron, sans-serif' }}>
        Loading report…
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#02070d', color: '#f87171', fontFamily: 'Orbitron, sans-serif', gap: '16px' }}>
        <div>❌ {error || 'Report not found'}</div>
        <button onClick={handleBack} style={{ padding: '10px 20px', background: '#1a2340', color: '#8899bb', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          ← Back to History
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#02070d', padding: '40px 20px', fontFamily: 'Rajdhani, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ color: '#00cde9', fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '2.5px' }}>
              05 / ARCHIVED REPORT
            </div>
            <h1 style={{ color: '#edfaff', fontFamily: 'Orbitron, sans-serif', fontSize: '24px', margin: '6px 0 0 0' }}>
              {report.file_name}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePDF} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #00d4ff, #7b2ffc)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
              📄 Open PDF
            </button>
            <button onClick={handleBack} style={{ padding: '10px 20px', background: 'transparent', color: '#8899bb', border: '1px solid #2a3a5c', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
              ← Back
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <VerdictCard verdict={report.verdict} reconstructed={report.reconstructed} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <ExifCard exif={report.exif} />
            <ReconstructedCard reconstructed={report.reconstructed} platformDetails={report.platform_details} />
          </div>
          <GpsCard gps={report.gps} />
          <TimestampCard timestamp={report.timestamp} />
          <PlatformCard platformDetails={report.platform_details} />
          <CustodyCard custody={report.custody} />
          <PixelCard pixel={report.pixel} />
          <AiCard ai={report.ai} />
          <RecommendationsCard verdict={report.verdict} />
        </div>

      </div>
    </div>
  );
};

export default HistoryDetailPage;