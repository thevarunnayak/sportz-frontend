import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export const AdminLayout: React.FC = () => {
  const { logout, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-brand-yellow border-2 border-black rounded-2xl p-6 shadow-hard mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-brand-dark mb-1">Admin Panel</h1>
            <p className="text-sm font-medium opacity-80">Manage matches and push live updates.</p>
          </div>
          {!isLoginPage && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-100 transition"
              >
                Public View
              </Link>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
