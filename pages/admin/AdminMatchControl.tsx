import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminMatches } from '../../hooks/useAdminMatches';
import { CommentaryForm } from '../../components/admin/CommentaryForm';
import { ScoreUpdateForm } from '../../components/admin/ScoreUpdateForm';

export const AdminMatchControl: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { matches, isLoading, error, reloadMatches } = useAdminMatches();

  const match = useMemo(() => {
    if (!id) return undefined;
    return matches.find((m) => String(m.id) === String(id));
  }, [id, matches]);

  const matchTitle = match ? `${match.homeTeam} vs ${match.awayTeam}` : 'Match';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Manage Match</h2>
          <p className="text-sm text-gray-600">{matchTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-100 transition"
          >
            Back to Dashboard
          </button>
          <button
            type="button"
            onClick={reloadMatches}
            className="px-4 py-2 bg-brand-blue text-black font-bold rounded-lg border-2 border-black hover:bg-blue-200 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading match details…</div>
      ) : error ? (
        <div className="py-12 text-center text-red-700">{error}</div>
      ) : !match ? (
        <div className="py-12 text-center text-gray-500">Match not found.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ScoreUpdateForm matchId={String(match.id)} onUpdated={reloadMatches} />
            <CommentaryForm matchId={String(match.id)} onAdded={reloadMatches} />
          </div>
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-hard">
            <h3 className="text-lg font-bold mb-2">Match Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Sport:</span> {match.sport}
              </div>
              <div>
                <span className="font-semibold">Start:</span> {new Date(match.startTime).toLocaleString()}
              </div>
              {match.endTime && (
                <div>
                  <span className="font-semibold">End:</span> {new Date(match.endTime).toLocaleString()}
                </div>
              )}
              <div>
                <span className="font-semibold">Status:</span> {match.status}
              </div>
              <div>
                <span className="font-semibold">Score:</span> {match.homeScore} - {match.awayScore}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
