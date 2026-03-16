import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminMatches } from '../../hooks/useAdminMatches';
import { CreateMatchForm } from '../../components/admin/CreateMatchForm';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { matches, isLoading, error, reloadMatches } = useAdminMatches();

  return (
    <div className="space-y-8">
      <CreateMatchForm onCreated={reloadMatches} />

      <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-hard">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">Manage Matches</h2>
          <p className="text-sm text-gray-600">
            {isLoading ? 'Fetching matches…' : `${matches.length} match${matches.length === 1 ? '' : 'es'}`}
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading matches…</div>
        ) : error ? (
          <div className="py-12 text-center text-red-700">{error}</div>
        ) : matches.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No matches found.</div>
        ) : (
          <div className="grid gap-4">
            {matches.map((match) => {
              const statusLower = match.status.toLowerCase();
              const isLive = statusLower === 'live';
              return (
                <div
                  key={match.id}
                  className="p-4 border-2 border-black rounded-2xl bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <div className="text-base font-bold text-brand-dark">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {new Date(match.startTime).toLocaleString()} ·{' '}
                      <span className={isLive ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                        {match.status}
                      </span>
                    </div>
                  </div>
                  {isLive && (
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/match/${match.id}`)}
                      className="px-4 py-2 bg-brand-blue text-black font-bold rounded-full border-2 border-black hover:bg-blue-200 transition"
                    >
                      Manage Match
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
