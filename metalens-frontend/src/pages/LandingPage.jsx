import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="landing-page">
      <div className="landing-background-grid"></div>
      <div className="landing-glow glow-blue"></div>
      <div className="landing-glow glow-cyan"></div>
      <div className="landing-glow glow-purple"></div>

      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-brand">
          <div className="landing-brand-logo">
            <div className="landing-logo-ring"></div>
            <div className="landing-logo-eye"><span></span></div>
          </div>
          <div className="landing-brand-text">
            <strong>META<span>LENS</span></strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </div>

        <div className="landing-nav-actions">
          {user ? (
            <>
              <span className="landing-user-info">👤 {user.email}</span>
              <button className="landing-btn-secondary" onClick={logout}>
                Logout
              </button>
              <button className="landing-btn-primary" onClick={() => navigate('/analyze')}>
                ⚡ Analyze
              </button>
            </>
          ) : (
            <>
              <button className="landing-btn-secondary" onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button className="landing-btn-primary" onClick={() => navigate('/signup')}>
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="landing-main">
        <div className="landing-hero">
          <div className="landing-section-number">01 / FORENSIC INTELLIGENCE</div>

          <h1 className="landing-hero-title">
            Uncover the truth<br />
            hidden in every <span>photo</span>
          </h1>

          <p className="landing-hero-desc">
            MetaLens analyzes EXIF metadata, GPS coordinates, compression artifacts,
            AI-vision content, and cryptographic integrity — giving you a complete
            forensic report on any image in seconds.
          </p>

          <div className="landing-hero-actions">
            <button
              className="landing-hero-cta"
              onClick={() => navigate(user ? '/analyze' : '/signup')}
            >
              ⚡ {user ? 'Analyze an Image' : 'Get Started Free'}
            </button>
            {!user && (
              <button className="landing-hero-cta-outline" onClick={() => navigate('/login')}>
                I already have an account
              </button>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="landing-features">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">📷</div>
            <h3>EXIF Metadata</h3>
            <p>Camera model, settings, original timestamps, and device fingerprints.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">📍</div>
            <h3>GPS Location</h3>
            <p>Extract latitude/longitude and reverse-geocode to a full address.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🤖</div>
            <h3>AI Vision</h3>
            <p>Local AI analyzes visible content, objects, and scene details.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🔐</div>
            <h3>SHA-256 Hash</h3>
            <p>Cryptographic fingerprint for tamper-proof evidence verification.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">🔗</div>
            <h3>Chain of Custody</h3>
            <p>Automatic timeline reconstruction from capture to analysis.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">📄</div>
            <h3>PDF Reports</h3>
            <p>Professional forensic reports ready for legal or academic use.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div>META<span>LENS</span></div>
        <p>DIGITAL IMAGE FORENSICS / AI INTELLIGENCE / EVIDENCE</p>
        <small>© 2026 MetaLens</small>
      </footer>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: #02070d;
          position: relative;
          overflow-x: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        .landing-background-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 218, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 218, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
        }

        .landing-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        .glow-blue { background: #3b82f6; top: -200px; right: -100px; }
        .glow-cyan { background: #00d4ff; bottom: -200px; left: -100px; }
        .glow-purple { background: #7b2ffc; top: 40%; left: 50%; transform: translateX(-50%); }

        /* Navbar */
        .landing-navbar {
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

        .landing-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .landing-brand-logo {
          position: relative;
          width: 32px;
          height: 32px;
        }

        .landing-logo-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #00dfff;
          border-radius: 50%;
          opacity: 0.6;
        }

        .landing-logo-eye {
          position: absolute;
          inset: 8px;
          background: #00dfff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .landing-logo-eye span {
          width: 5px;
          height: 5px;
          background: #02070d;
          border-radius: 50%;
        }

        .landing-brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .landing-brand-text strong {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 15px;
          letter-spacing: 1px;
        }

        .landing-brand-text strong span { color: #00dfff; }

        .landing-brand-text small {
          color: #667799;
          font-family: "Orbitron", sans-serif;
          font-size: 7px;
          letter-spacing: 1.5px;
          margin-top: 1px;
        }

        .landing-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .landing-user-info {
          color: #a0cbd6;
          font-size: 13px;
          font-family: "Rajdhani", sans-serif;
        }

        .landing-btn-primary,
        .landing-btn-secondary {
          padding: 8px 16px;
          border-radius: 6px;
          font-family: "Rajdhani", sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .landing-btn-primary {
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
          border: none;
        }

        .landing-btn-primary:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .landing-btn-secondary {
          background: transparent;
          color: #a0cbd6;
          border: 1px solid rgba(0, 218, 255, 0.3);
        }

        .landing-btn-secondary:hover {
          border-color: #00dfff;
          color: #edfaff;
          background: rgba(0, 218, 255, 0.05);
        }

        /* Hero */
        .landing-main {
          position: relative;
          z-index: 5;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 30px 80px;
        }

        .landing-hero {
          text-align: center;
          margin-bottom: 80px;
        }

        .landing-section-number {
          color: #00cde9;
          font-family: "Orbitron", sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          margin-bottom: 20px;
        }

        .landing-hero-title {
          font-family: "Orbitron", sans-serif;
          font-size: 52px;
          font-weight: 600;
          color: #edfaff;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin: 0 0 24px 0;
        }

        .landing-hero-title span {
          color: #00dfff;
        }

        .landing-hero-desc {
          max-width: 640px;
          margin: 0 auto 40px;
          color: #829aa6;
          font-size: 16px;
          line-height: 1.7;
        }

        .landing-hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .landing-hero-cta,
        .landing-hero-cta-outline {
          padding: 16px 36px;
          border-radius: 8px;
          font-family: "Rajdhani", sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .landing-hero-cta {
          background: linear-gradient(135deg, #00d4ff, #7b2ffc);
          color: white;
          border: none;
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.25);
        }

        .landing-hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0, 212, 255, 0.45);
        }

        .landing-hero-cta-outline {
          background: transparent;
          color: #a0cbd6;
          border: 1px solid rgba(0, 218, 255, 0.3);
        }

        .landing-hero-cta-outline:hover {
          border-color: #00dfff;
          color: #edfaff;
          background: rgba(0, 218, 255, 0.05);
        }

        /* Features */
        .landing-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .landing-feature-card {
          padding: 24px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid #1a2340;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .landing-feature-card:hover {
          border-color: rgba(0, 218, 255, 0.4);
          transform: translateY(-4px);
          background: rgba(15, 23, 42, 0.95);
        }

        .landing-feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .landing-feature-card h3 {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 14px;
          letter-spacing: 0.5px;
          margin: 0 0 8px 0;
        }

        .landing-feature-card p {
          color: #829aa6;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        /* Footer */
        .landing-footer {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 30px;
          border-top: 1px solid rgba(0, 218, 255, 0.08);
          color: #445566;
        }

        .landing-footer div {
          color: #edfaff;
          font-family: "Orbitron", sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .landing-footer div span { color: #00dfff; }

        .landing-footer p {
          font-size: 10px;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1.5px;
          margin: 0 0 6px 0;
        }

        .landing-footer small {
          font-size: 10px;
          color: #445566;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .landing-features { grid-template-columns: 1fr 1fr; }
          .landing-hero-title { font-size: 38px; }
        }

        @media (max-width: 600px) {
          .landing-navbar { padding: 14px 16px; flex-direction: column; gap: 12px; }
          .landing-main { padding: 30px 16px 60px; }
          .landing-hero-title { font-size: 30px; }
          .landing-hero-desc { font-size: 14px; }
          .landing-features { grid-template-columns: 1fr; }
          .landing-hero-cta, .landing-hero-cta-outline { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;