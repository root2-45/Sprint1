// import React, { useState } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const from = location.state?.from?.pathname || '/analyze';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       await login(email, password);
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-background-grid"></div>
//       <div className="auth-glow glow-blue"></div>
//       <div className="auth-glow glow-cyan"></div>

//       <div className="auth-card">
//         <div className="auth-card-corners">
//           <span></span><span></span><span></span><span></span>
//         </div>

//         <div className="auth-logo">
//           <div className="auth-logo-ring"></div>
//           <div className="auth-logo-eye"><span></span></div>
//         </div>

//         <h1 className="auth-title">
//           Welcome <span>Back</span>
//         </h1>
//         <p className="auth-subtitle">Sign in to access your forensic reports</p>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="auth-field">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//               autoFocus
//             />
//           </div>

//           <div className="auth-field">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//               minLength={8}
//             />
//           </div>

//           {error && <div className="auth-error">❌ {error}</div>}

//           <button type="submit" className="auth-submit" disabled={loading}>
//             {loading ? '⏳ Signing in…' : '▶ Sign In'}
//           </button>
//         </form>

//         <p className="auth-switch">
//           Don't have an account? <Link to="/signup">Create one</Link>
//         </p>

//         <Link to="/" className="auth-back">← Back to home</Link>
//       </div>

//       <style jsx>{`
//         .auth-page {
//           min-height: 100vh;
//           background: #02070d;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           position: relative;
//           overflow: hidden;
//           font-family: 'Rajdhani', sans-serif;
//         }

//         .auth-background-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(0, 218, 255, 0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0, 218, 255, 0.03) 1px, transparent 1px);
//           background-size: 50px 50px;
//           pointer-events: none;
//         }

//         .auth-glow {
//           position: absolute;
//           width: 400px;
//           height: 400px;
//           border-radius: 50%;
//           filter: blur(120px);
//           opacity: 0.2;
//           pointer-events: none;
//         }

//         .glow-blue { background: #3b82f6; top: -200px; right: -100px; }
//         .glow-cyan { background: #00d4ff; bottom: -200px; left: -100px; }

//         .auth-card {
//           position: relative;
//           z-index: 2;
//           width: 100%;
//           max-width: 420px;
//           padding: 40px 32px;
//           background: rgba(15, 23, 42, 0.95);
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           border-radius: 12px;
//           backdrop-filter: blur(10px);
//         }

//         .auth-card-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//         }

//         .auth-card-corners span {
//           position: absolute;
//           width: 16px;
//           height: 16px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.5;
//         }

//         .auth-card-corners span:nth-child(1) { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
//         .auth-card-corners span:nth-child(2) { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
//         .auth-card-corners span:nth-child(3) { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
//         .auth-card-corners span:nth-child(4) { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

//         .auth-logo {
//           position: relative;
//           width: 56px;
//           height: 56px;
//           margin: 0 auto 20px;
//         }

//         .auth-logo-ring {
//           position: absolute;
//           inset: 0;
//           border: 3px solid #00dfff;
//           border-radius: 50%;
//           opacity: 0.7;
//         }

//         .auth-logo-eye {
//           position: absolute;
//           inset: 14px;
//           background: #00dfff;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .auth-logo-eye span {
//           width: 8px;
//           height: 8px;
//           background: #02070d;
//           border-radius: 50%;
//         }

//         .auth-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 24px;
//           font-weight: 600;
//           color: #edfaff;
//           text-align: center;
//           letter-spacing: -0.5px;
//           margin: 0 0 6px 0;
//         }

//         .auth-title span { color: #00dfff; }

//         .auth-subtitle {
//           color: #829aa6;
//           font-size: 13px;
//           text-align: center;
//           margin: 0 0 28px 0;
//         }

//         .auth-form {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .auth-field {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }

//         .auth-field label {
//           color: #a0cbd6;
//           font-size: 12px;
//           font-family: "Orbitron", sans-serif;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//         }

//         .auth-field input {
//           padding: 12px 14px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 6px;
//           color: #edfaff;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 14px;
//           outline: none;
//           transition: border 0.2s ease;
//         }

//         .auth-field input:focus {
//           border-color: #00d4ff;
//           box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
//         }

//         .auth-error {
//           padding: 10px 14px;
//           background: rgba(248, 113, 113, 0.1);
//           border: 1px solid rgba(248, 113, 113, 0.4);
//           border-radius: 6px;
//           color: #f87171;
//           font-size: 13px;
//         }

//         .auth-submit {
//           padding: 12px;
//           margin-top: 6px;
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 15px;
//           font-weight: 700;
//           letter-spacing: 0.5px;
//           cursor: pointer;
//           transition: all 0.25s ease;
//         }

//         .auth-submit:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 0 25px rgba(0, 212, 255, 0.35);
//         }

//         .auth-submit:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .auth-switch {
//           margin-top: 20px;
//           text-align: center;
//           color: #829aa6;
//           font-size: 13px;
//         }

//         .auth-switch a {
//           color: #00d4ff;
//           text-decoration: none;
//           font-weight: 600;
//         }

//         .auth-switch a:hover { text-decoration: underline; }

//         .auth-back {
//           display: block;
//           margin-top: 16px;
//           text-align: center;
//           color: #667799;
//           font-size: 12px;
//           text-decoration: none;
//         }

//         .auth-back:hover { color: #a0cbd6; }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;



// import React, { useState } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const from = location.state?.from?.pathname || '/analyze';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       await login(email, password);
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-background-grid"></div>
//       <div className="auth-glow glow-blue"></div>
//       <div className="auth-glow glow-cyan"></div>
//       <div className="auth-glow glow-purple"></div>

//       <div className="auth-card">
//         <div className="auth-card-corners">
//           <span></span><span></span><span></span><span></span>
//         </div>

//         {/* Logo — matches HomePage exactly */}
//         <div className="brand">
//           <div className="brand-logo">
//             <div className="logo-ring"></div>
//             <div className="logo-eye"><span></span></div>
//             <div className="logo-scan"></div>
//           </div>
//           <div className="brand-text">
//             <strong>META<span>LENS</span></strong>
//             <small>DIGITAL FORENSICS</small>
//           </div>
//         </div>

//         <h1 className="auth-title">
//           Welcome <span>Back</span>
//         </h1>
//         <p className="auth-subtitle">Sign in to access your forensic reports</p>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="auth-field">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               required
//               autoFocus
//             />
//           </div>

//           <div className="auth-field">
//             <label>Password</label>
//             <div className="password-wrap">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//                 minLength={8}
//               />
//               <button
//                 type="button"
//                 className="eye-btn"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 tabIndex={-1}
//               >
//                 {showPassword ? (
//                   // Eye open
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                     <circle cx="12" cy="12" r="3" />
//                   </svg>
//                 ) : (
//                   // Eye closed
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
//                     <line x1="1" y1="1" x2="23" y2="23" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && <div className="auth-error">❌ {error}</div>}

//           <button type="submit" className="auth-submit" disabled={loading}>
//             {loading ? '⏳ Signing in…' : '▶ Sign In'}
//           </button>
//         </form>

//         <p className="auth-switch">
//           Don't have an account? <Link to="/signup">Create one</Link>
//         </p>

//         <Link to="/" className="auth-back">← Back to home</Link>
//       </div>

//       <style jsx>{`
//         .auth-page {
//           min-height: 100vh;
//           background: #02070d;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           position: relative;
//           overflow: hidden;
//           font-family: 'Rajdhani', sans-serif;
//         }

//         .auth-background-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(0, 218, 255, 0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0, 218, 255, 0.03) 1px, transparent 1px);
//           background-size: 50px 50px;
//           pointer-events: none;
//         }

//         .auth-glow {
//           position: absolute;
//           width: 400px;
//           height: 400px;
//           border-radius: 50%;
//           filter: blur(120px);
//           opacity: 0.2;
//           pointer-events: none;
//         }

//         .glow-blue { background: #3b82f6; top: -200px; right: -100px; }
//         .glow-cyan { background: #00d4ff; bottom: -200px; left: -100px; }
//         .glow-purple { background: #7b2ffc; top: 50%; left: 50%; transform: translate(-50%, -50%); }

//         .auth-card {
//           position: relative;
//           z-index: 2;
//           width: 100%;
//           max-width: 440px;
//           padding: 44px 36px;
//           background: rgba(15, 23, 42, 0.95);
//           border: 1px solid rgba(0, 218, 255, 0.25);
//           border-radius: 14px;
//           backdrop-filter: blur(14px);
//           box-shadow: 0 20px 60px rgba(0, 218, 255, 0.08);
//         }

//         .auth-card-corners {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//         }

//         .auth-card-corners span {
//           position: absolute;
//           width: 18px;
//           height: 18px;
//           border-color: #00e1ff;
//           border-style: solid;
//           opacity: 0.6;
//         }

//         .auth-card-corners span:nth-child(1) { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
//         .auth-card-corners span:nth-child(2) { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
//         .auth-card-corners span:nth-child(3) { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
//         .auth-card-corners span:nth-child(4) { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

//         /* =========================================================
//            BRAND LOGO — SAME AS HOMEPAGE
//         ========================================================= */
//         .brand {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 24px;
//         }

//         .brand-logo {
//           position: relative;
//           width: 52px;
//           height: 52px;
//         }

//         .logo-ring {
//           position: absolute;
//           inset: 0;
//           border: 2.5px solid #00dfff;
//           border-radius: 50%;
//           opacity: 0.7;
//           animation: logo-pulse 3s ease-in-out infinite;
//         }

//         .logo-eye {
//           position: absolute;
//           inset: 12px;
//           background: #00dfff;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 0 20px rgba(0, 223, 255, 0.6);
//         }

//         .logo-eye span {
//           width: 7px;
//           height: 7px;
//           background: #02070d;
//           border-radius: 50%;
//         }

//         .logo-scan {
//           position: absolute;
//           inset: 0;
//           border-radius: 50%;
//           border: 1px solid transparent;
//           border-top-color: #00dfff;
//           animation: logo-scan 2.5s linear infinite;
//           opacity: 0.8;
//         }

//         @keyframes logo-pulse {
//           0%, 100% { opacity: 0.7; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.05); }
//         }

//         @keyframes logo-scan {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .brand-text {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }

//         .brand-text strong {
//           color: #edfaff;
//           font-family: "Orbitron", sans-serif;
//           font-size: 18px;
//           letter-spacing: 2.5px;
//           font-weight: 700;
//         }

//         .brand-text strong span { color: #00dfff; }

//         .brand-text small {
//           color: #667799;
//           font-family: "Orbitron", sans-serif;
//           font-size: 8px;
//           letter-spacing: 3px;
//           margin-top: 3px;
//         }

//         /* =========================================================
//            TITLE
//         ========================================================= */
//         .auth-title {
//           font-family: "Orbitron", sans-serif;
//           font-size: 26px;
//           font-weight: 600;
//           color: #edfaff;
//           text-align: center;
//           letter-spacing: -0.5px;
//           margin: 0 0 6px 0;
//         }

//         .auth-title span { color: #00dfff; }

//         .auth-subtitle {
//           color: #829aa6;
//           font-size: 13px;
//           text-align: center;
//           margin: 0 0 30px 0;
//           letter-spacing: 0.3px;
//         }

//         /* =========================================================
//            FORM
//         ========================================================= */
//         .auth-form {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .auth-field {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .auth-field label {
//           color: #a0cbd6;
//           font-size: 11px;
//           font-family: "Orbitron", sans-serif;
//           letter-spacing: 1.5px;
//           text-transform: uppercase;
//         }

//         .auth-field input {
//           width: 100%;
//           padding: 13px 16px;
//           background: #0a0e1a;
//           border: 1px solid #1a2340;
//           border-radius: 8px;
//           color: #edfaff;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 15px;
//           outline: none;
//           transition: all 0.2s ease;
//         }

//         .auth-field input:focus {
//           border-color: #00d4ff;
//           background: #0a0e1a;
//           box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.12), 0 0 20px rgba(0, 212, 255, 0.15);
//         }

//         .auth-field input::placeholder {
//           color: #445566;
//         }

//         /* =========================================================
//            PASSWORD FIELD WITH EYE
//         ========================================================= */
//         .password-wrap {
//           position: relative;
//           display: flex;
//           align-items: center;
//         }

//         .password-wrap input {
//           padding-right: 48px;
//         }

//         .eye-btn {
//           position: absolute;
//           right: 12px;
//           background: none;
//           border: none;
//           color: #667799;
//           cursor: pointer;
//           padding: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 6px;
//           transition: all 0.2s ease;
//         }

//         .eye-btn:hover {
//           color: #00dfff;
//           background: rgba(0, 218, 255, 0.08);
//         }

//         /* =========================================================
//            ERROR
//         ========================================================= */
//         .auth-error {
//           padding: 11px 14px;
//           background: rgba(248, 113, 113, 0.1);
//           border: 1px solid rgba(248, 113, 113, 0.4);
//           border-radius: 8px;
//           color: #f87171;
//           font-size: 13px;
//           text-align: center;
//         }

//         /* =========================================================
//            SUBMIT
//         ========================================================= */
//         .auth-submit {
//           padding: 14px;
//           margin-top: 8px;
//           background: linear-gradient(135deg, #00d4ff, #7b2ffc);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-family: "Rajdhani", sans-serif;
//           font-size: 15px;
//           font-weight: 700;
//           letter-spacing: 1px;
//           cursor: pointer;
//           transition: all 0.25s ease;
//           text-transform: uppercase;
//         }

//         .auth-submit:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
//         }

//         .auth-submit:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* =========================================================
//            SWITCH / BACK
//         ========================================================= */
//         .auth-switch {
//           margin-top: 24px;
//           text-align: center;
//           color: #829aa6;
//           font-size: 13px;
//         }

//         .auth-switch a {
//           color: #00d4ff;
//           text-decoration: none;
//           font-weight: 600;
//           transition: color 0.2s ease;
//         }

//         .auth-switch a:hover {
//           color: #5ce4ff;
//           text-decoration: underline;
//         }

//         .auth-back {
//           display: block;
//           margin-top: 14px;
//           text-align: center;
//           color: #667799;
//           font-size: 12px;
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }

//         .auth-back:hover { color: #a0cbd6; }

//         /* =========================================================
//            RESPONSIVE
//         ========================================================= */
//         @media (max-width: 480px) {
//           .auth-card { padding: 32px 24px; }
//           .auth-title { font-size: 22px; }
//           .brand-text strong { font-size: 16px; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;















import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/analyze';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-grid"></div>
      <div className="auth-glow glow-blue"></div>
      <div className="auth-glow glow-cyan"></div>
      <div className="auth-glow glow-purple"></div>

      <div className="auth-card">
        <div className="auth-card-corners">
          <span></span><span></span><span></span><span></span>
        </div>

        <div className="brand">
          <div className="brand-logo">
            <div className="logo-ring"></div>
            <div className="logo-eye"><span></span></div>
            <div className="logo-scan"></div>
          </div>
          <div className="brand-text">
            <strong>META<span>LENS</span></strong>
            <small>DIGITAL FORENSICS</small>
          </div>
        </div>

        <h1 className="auth-title">Welcome <span>Back</span></h1>
        <p className="auth-subtitle">Sign in to access your forensic reports</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">❌ {error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? '⏳ Signing in…' : '▶ Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        <Link to="/" className="auth-back">← Back to home</Link>
      </div>
    </div>
  );
};

export default LoginPage;