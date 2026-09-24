import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryCard from "../components/HistoryCard";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ================================================================
  //  Fetch reports from MongoDB
  // ================================================================
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/reports");
      setReports(res.data.reports || []);
      setError(null);
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ================================================================
  //  Delete a report
  // ================================================================
  const handleDelete = async (report) => {
    if (
      !window.confirm(
        `Delete report for "${report.file_name}"? This cannot be undone.`,
      )
    ) {
      return;
    }
    try {
      await axios.delete(`/api/reports/${report.id}`);
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch (err) {
      alert("Failed to delete: " + (err.response?.data?.error || err.message));
    }
  };

  // ================================================================
  //  Open full report view
  // ================================================================
  const handleView = (report) => {
    navigate(`/history/${report.id}`);
  };

  // ================================================================
  //  Open PDF for a report
  // ================================================================
  const handleDownloadPDF = (report) => {
    // Navigate to the PDF page, passing the report
    navigate("/pdf-report", { state: { results: report } });
  };

  // ================================================================
  //  Filter + search
  // ================================================================
  const filteredReports = reports.filter((r) => {
    const verdict = (r.verdict?.authenticity || "unknown").toLowerCase();
    const matchesFilter = filter === "all" || verdict === filter;
    const matchesSearch =
      !search ||
      (r.file_name || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats
  const stats = {
    total: reports.length,
    authentic: reports.filter(
      (r) => (r.verdict?.authenticity || "").toLowerCase() === "authentic",
    ).length,
    partial: reports.filter(
      (r) => (r.verdict?.authenticity || "").toLowerCase() === "partial",
    ).length,
    tampered: reports.filter(
      (r) => (r.verdict?.authenticity || "").toLowerCase() === "tampered",
    ).length,
  };

  return (
    <div className="history-page">
      {/* Background */}
      <div className="history-background-grid"></div>
      <div className="history-glow glow-blue"></div>
      <div className="history-glow glow-cyan"></div>

      {/* Navbar */}
      <nav className="history-navbar">
        {/* <button className="history-brand" onClick={() => navigate('/')}>
          <div className="history-brand-logo">
            <div className="history-logo-ring"></div>
            <div className="history-logo-eye"><span></span></div>
          </div>
          <div className="history-brand-text">
            <strong>META<span>LENS</span></strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </button> */}

        <button className="history-brand" onClick={() => navigate("/")}>
          <div className="history-brand-logo">
            <div className="logo-ring"></div>
            <div className="logo-eye">
              <span></span>
            </div>
            <div className="logo-scan"></div>
          </div>
          <div className="history-brand-text">
            <strong>
              META<span>LENS</span>
            </strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </button>

        <div className="history-nav-buttons">
          <button
            className="history-nav-btn"
            onClick={() => navigate("/analyze")}
          >
            ⚡ Analyze
          </button>
          <button className="history-nav-btn active">📜 History</button>
          <button className="history-nav-btn" onClick={() => navigate("/")}>
            ← Home
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="history-main">
        <div className="history-header">
          <div className="history-section-number">04 / ARCHIVE</div>
          <h1 className="history-title">
            Analysis <span>History</span>
          </h1>
          <p className="history-desc">
            Every image you've analyzed, stored in MongoDB. Click any report to
            view, re-download the PDF, or delete.
          </p>
        </div>

        {/* Stats Row */}
        <div className="history-stats-row">
          <div className="history-stat-card">
            <span className="history-stat-label">Total</span>
            <strong className="history-stat-value">{stats.total}</strong>
          </div>
          <div className="history-stat-card authentic">
            <span className="history-stat-label">Authentic</span>
            <strong className="history-stat-value">{stats.authentic}</strong>
          </div>
          <div className="history-stat-card partial">
            <span className="history-stat-label">Partial</span>
            <strong className="history-stat-value">{stats.partial}</strong>
          </div>
          <div className="history-stat-card tampered">
            <span className="history-stat-label">Tampered</span>
            <strong className="history-stat-value">{stats.tampered}</strong>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="history-controls">
          <input
            type="text"
            placeholder="🔍  Search by filename…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="history-search-input"
          />
          <div className="history-filter-buttons">
            {["all", "authentic", "partial", "tampered"].map((f) => (
              <button
                key={f}
                className={`history-filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className="history-refresh-btn" onClick={fetchReports}>
            ↻ Refresh
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="history-loading">
            <div className="history-spinner"></div>
            <span>Loading reports…</span>
          </div>
        )}

        {error && (
          <div className="history-error">
            ❌ {error}
            <button onClick={fetchReports} className="history-retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredReports.length === 0 && (
          <div className="history-empty">
            <div className="history-empty-icon">📭</div>
            <h3>No reports found</h3>
            <p>
              {reports.length === 0
                ? "You haven't analyzed any images yet."
                : "No reports match your search/filter."}
            </p>
            <button
              className="history-cta-btn"
              onClick={() => navigate("/analyze")}
            >
              ⚡ Analyze an Image
            </button>
          </div>
        )}

        {!loading && !error && filteredReports.length > 0 && (
          <div className="history-list">
            {filteredReports.map((report) => (
              <HistoryCard
                key={report.id}
                report={report}
                onView={handleView}
                onDelete={handleDelete}
                onDownloadPDF={handleDownloadPDF}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="history-footer">
        <div>
          META<span>LENS</span>
        </div>
        <p>DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE</p>
      </footer>

      <style jsx>{`
        .history-page {
          min-height: 100vh;
          background: #02070d;
          position: relative;
          overflow-x: hidden;
          font-family: "Rajdhani", sans-serif;
        }

        .history-background-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 218, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 218, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
        }

        .history-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        .glow-blue {
          background: #3b82f6;
          top: -200px;
          right: -100px;
        }

        .glow-cyan {
          background: #00d4ff;
          bottom: -200px;
          left: -100px;
        }

        /* Navbar */
        .history-navbar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(0, 218, 255, 0.08);
          background: rgba(2, 7, 13, 0.8);
          backdrop-filter: blur(10px);
        }

        .history-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
        }

         /* .history-brand-logo {
          position: relative;
          width: 32px;
          height: 32px;
        }

        .history-logo-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #00dfff;
          border-radius: 50%;
          opacity: 0.6;
        }

        .history-logo-eye {
          position: absolute;
          inset: 8px;
          background: #00dfff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-logo-eye span {
          width: 5px;
          height: 5px;
          background: #02070d;
          border-radius: 50%;
        }  */










          .history-brand-logo {
  position: relative;
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 220, 255, 0.75);
  transform: rotate(45deg);
  box-shadow:
    0 0 20px rgba(0, 210, 255, 0.15),
    inset 0 0 18px rgba(0, 210, 255, 0.08);
  overflow: hidden;
  flex-shrink: 0;
}

.history-brand-logo .logo-ring {
  position: absolute;
  width: 27px;
  height: 27px;
  border: 1px solid #00dfff;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(0, 220, 255, 0.65);
}

.history-brand-logo .logo-eye {
  position: absolute;
  width: 15px;
  height: 9px;
  border: 1px solid #00e1ff;
  border-radius: 80% 0;
  transform: rotate(-45deg);
  box-shadow: 0 0 8px rgba(0, 225, 255, 0.7);
}

.history-brand-logo .logo-eye span {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00e1ff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.history-brand-logo .logo-scan {
  position: absolute;
  width: 65px;
  height: 1px;
  background: #00eaff;
  box-shadow: 0 0 8px #00eaff;
  transform: rotate(-45deg);
  animation: historyLogoScan 2.5s linear infinite;
}

@keyframes historyLogoScan {
  0% {
    transform: translateX(-30px) rotate(-45deg);
  }
  100% {
    transform: translateX(30px) rotate(-45deg);
  }
}









































































        /* .history-brand-logo {
          position: relative;
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 220, 255, 0.75);
          transform: rotate(45deg);
          box-shadow:
            0 0 20px rgba(0, 210, 255, 0.15),
            inset 0 0 18px rgba(0, 210, 255, 0.08);
          overflow: hidden;
          flex-shrink: 0;
        }

        .logo-ring {
          position: absolute;
          width: 27px;
          height: 27px;
          border: 1px solid #00dfff;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(0, 220, 255, 0.65);
        }

        .logo-eye {
          position: absolute;
          width: 15px;
          height: 9px;
          border: 1px solid #00e1ff;
          border-radius: 80% 0;
          transform: rotate(-45deg);
          box-shadow: 0 0 8px rgba(0, 225, 255, 0.7);
        }

        .logo-eye span {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00e1ff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .logo-scan {
          position: absolute;
          width: 65px;
          height: 1px;
          background: #00eaff;
          box-shadow: 0 0 8px #00eaff;
          transform: rotate(-45deg);
          animation: logoScan 2.5s linear infinite;
        }

        @keyframes logoScan {
          0% {
            transform: translateX(-30px) rotate(-45deg);
          }
          100% {
            transform: translateX(30px) rotate(-45deg);
          }
        } */

        .history-brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .history-brand-text strong {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 15px;
          letter-spacing: 1px;
        }

        .history-brand-text strong span {
          color: #00dfff;
        }

        .history-brand-text small {
          color: #667799;
          font-family: "Orbitron", sans-serif;
          font-size: 7px;
          letter-spacing: 1.5px;
          margin-top: 1px;
        }

        .history-nav-buttons {
          display: flex;
          gap: 8px;
        }

        .history-nav-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid rgba(0, 218, 255, 0.2);
          color: #a0cbd6;
          font-family: "Rajdhani", sans-serif;
          font-size: 13px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .history-nav-btn:hover {
          border-color: #00dfff;
          color: #edfaff;
          background: rgba(0, 218, 255, 0.05);
        }

        .history-nav-btn.active {
          background: rgba(0, 218, 255, 0.1);
          border-color: #00dfff;
          color: #edfaff;
        }

        /* Main */
        .history-main {
          position: relative;
          z-index: 5;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 30px 80px;
        }

        .history-header {
          margin-bottom: 30px;
        }

        .history-section-number {
          color: #00cde9;
          font-family: "Orbitron", sans-serif;
          font-size: 10px;
          letter-spacing: 2.5px;
          margin-bottom: 6px;
        }

        .history-title {
          font-family: "Orbitron", sans-serif;
          font-size: 36px;
          font-weight: 600;
          color: #edfaff;
          margin: 0 0 10px 0;
          letter-spacing: -1px;
        }

        .history-title span {
          color: #00dfff;
        }

        .history-desc {
          color: #829aa6;
          font-size: 14px;
          max-width: 600px;
          line-height: 1.6;
        }

        /* Stats */
        .history-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .history-stat-card {
          padding: 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 10px;
        }

        .history-stat-card.authentic {
          border-left: 3px solid #34d399;
        }
        .history-stat-card.partial {
          border-left: 3px solid #fbbf24;
        }
        .history-stat-card.tampered {
          border-left: 3px solid #f87171;
        }

        .history-stat-label {
          display: block;
          color: #667799;
          font-size: 11px;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .history-stat-value {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 24px;
          font-weight: 700;
        }

        /* Controls */
        .history-controls {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .history-search-input {
          flex: 1;
          min-width: 240px;
          padding: 10px 16px;
          background: #0a0e1a;
          border: 1px solid #1a2340;
          border-radius: 8px;
          color: #edfaff;
          font-family: "Rajdhani", sans-serif;
          font-size: 14px;
          outline: none;
          transition: border 0.2s ease;
        }

        .history-search-input:focus {
          border-color: #00d4ff;
        }

        .history-filter-buttons {
          display: flex;
          gap: 6px;
        }

        .history-filter-btn {
          padding: 10px 16px;
          background: transparent;
          border: 1px solid #1a2340;
          color: #667799;
          font-family: "Rajdhani", sans-serif;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .history-filter-btn:hover {
          border-color: #2a3a5c;
          color: #a0cbd6;
        }

        .history-filter-btn.active {
          background: rgba(0, 212, 255, 0.1);
          border-color: #00d4ff;
          color: #00d4ff;
        }

        .history-refresh-btn {
          padding: 10px 16px;
          background: transparent;
          border: 1px solid #1a2340;
          color: #667799;
          font-family: "Rajdhani", sans-serif;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .history-refresh-btn:hover {
          border-color: #00d4ff;
          color: #00d4ff;
        }

        /* List */
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Loading / Error / Empty */
        .history-loading,
        .history-error {
          padding: 40px;
          text-align: center;
          color: #829aa6;
          font-family: "Orbitron", sans-serif;
          font-size: 13px;
        }

        .history-spinner {
          width: 36px;
          height: 36px;
          margin: 0 auto 14px;
          border: 3px solid #1a2340;
          border-top-color: #00d4ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .history-error {
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.3);
          border-radius: 10px;
          color: #f87171;
        }

        .history-retry-btn {
          margin-left: 12px;
          padding: 6px 14px;
          background: transparent;
          border: 1px solid #f87171;
          color: #f87171;
          border-radius: 6px;
          cursor: pointer;
          font-family: "Rajdhani", sans-serif;
        }

        .history-empty {
          text-align: center;
          padding: 60px 20px;
          background: #0a0e1a;
          border: 1px dashed #1a2340;
          border-radius: 12px;
        }

        .history-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .history-empty h3 {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 18px;
          margin: 0 0 8px 0;
        }

        .history-empty p {
          color: #829aa6;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .history-cta-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
          border: none;
          border-radius: 8px;
          font-family: "Rajdhani", sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .history-cta-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.3);
        }

        /* Footer */
        .history-footer {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 30px;
          border-top: 1px solid rgba(0, 218, 255, 0.08);
          color: #445566;
        }

        .history-footer div {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .history-footer div span {
          color: #00dfff;
        }

        .history-footer p {
          font-size: 10px;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1.5px;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 700px) {
          .history-navbar {
            padding: 14px 20px;
            flex-direction: column;
            gap: 14px;
          }
          .history-main {
            padding: 24px 16px 60px;
          }
          .history-title {
            font-size: 26px;
          }
          .history-stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .history-controls {
            flex-direction: column;
          }
          .history-filter-buttons {
            flex-wrap: wrap;
          }
        }






        








































      `}</style>
    </div>
  );
};

export default HistoryPage;
