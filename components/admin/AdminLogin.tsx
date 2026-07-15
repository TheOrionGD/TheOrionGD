import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid username or password');
        setLoading(false);
        return;
      }

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Connection to authentication service failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] text-[#1A1A1A] font-serif flex flex-col justify-center items-center px-4 relative selection:bg-[#2C4A6E]/20">
      
      {/* Return link */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#3A3A3A] hover:text-[#2C4A6E] transition-colors focus:outline-none"
      >
        <FaArrowLeft size={10} />
        <span>Return to Public Frame</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm border border-[#C8C8C8] bg-[#EDEDED] p-8"
      >
        <div className="text-center mb-8 border-b border-[#C8C8C8] pb-6">
          <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-[#1A1A1A] mb-1">
            System of Record
          </h1>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#3A3A3A] font-bold">
            {"// AUTHORIZED ACCESS ONLY //"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-[#2C4A6E]/40 text-[#2C4A6E] font-mono text-[10px] uppercase tracking-wider flex items-center gap-2">
            <FaExclamationCircle className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 font-mono text-xs text-[#3A3A3A]">
          <div>
            <label className="block uppercase tracking-wider mb-2 text-[#1A1A1A] font-bold">
              Operator ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-[#EDEDED] border border-[#C8C8C8] px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2C4A6E] rounded-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider mb-2 text-[#1A1A1A] font-bold">
              Security Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#EDEDED] border border-[#C8C8C8] px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#2C4A6E] rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2C4A6E] text-[#EDEDED] font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {loading ? (
              <span>VERIFYING...</span>
            ) : (
              <span>ACCESS DASHBOARD //</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
