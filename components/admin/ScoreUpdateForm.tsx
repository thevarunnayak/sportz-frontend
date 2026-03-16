import React, { useState } from 'react';
import { updateMatchScore } from '../../services/api';

interface ScoreUpdateFormProps {
  matchId: string;
  onUpdated?: () => void;
}

export const ScoreUpdateForm: React.FC<ScoreUpdateFormProps> = ({ matchId, onUpdated }) => {
  const [homeScore, setHomeScore] = useState<number | ''>('');
  const [awayScore, setAwayScore] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const home = Number(homeScore);
    const away = Number(awayScore);

    if (Number.isNaN(home) || Number.isNaN(away)) {
      setError('Scores must be valid numbers.');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateMatchScore(matchId, { homeScore: home, awayScore: away });
      setSuccess('Score updated successfully');
      setHomeScore('');
      setAwayScore('');
      onUpdated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update score');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white border-2 border-black rounded-2xl p-6 shadow-hard">
      <h2 className="text-lg font-bold mb-4">Update Score</h2>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-sm font-semibold">
          Home Score
          <input
            type="number"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            required
          />
        </label>

        <label className="space-y-1 text-sm font-semibold">
          Away Score
          <input
            type="number"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            required
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-brand-blue text-black font-bold rounded-full border-2 border-black hover:bg-blue-200 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Updating…' : 'Update Score'}
        </button>
      </div>
    </form>
  );
};
