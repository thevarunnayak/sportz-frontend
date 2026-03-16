import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!pin) {
      setError('Please enter your admin PIN.');
      return;
    }

    const success = login(pin);
    if (!success) {
      setError('Invalid PIN.');
      return;
    }

    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white border-2 border-black rounded-2xl p-8 shadow-hard">
        <h1 className="text-2xl font-black mb-2">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your PIN to access the admin dashboard.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-semibold">
            Admin PIN
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-2 w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="Enter PIN"
            />
          </label>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-brand-blue text-black font-bold rounded-full border-2 border-black hover:bg-blue-200 transition"
            >
              Login
            </button>
            <a
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Back to Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
