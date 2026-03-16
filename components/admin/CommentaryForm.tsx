import React, { useState } from 'react';
import { addMatchCommentary } from '../../services/api';

interface CommentaryFormProps {
  matchId: string;
  onAdded?: () => void;
}

export const CommentaryForm: React.FC<CommentaryFormProps> = ({ matchId, onAdded }) => {
  const [minute, setMinute] = useState<number | ''>('');
  const [message, setMessage] = useState('');
  const [eventType, setEventType] = useState('');
  const [actor, setActor] = useState('');
  const [team, setTeam] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!message.trim()) {
      setError('Message is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addMatchCommentary(matchId, {
        minute: minute === '' ? undefined : Number(minute),
        message: message.trim(),
        eventType: eventType || undefined,
        actor: actor || undefined,
        team: team || undefined,
      });
      setSuccess('Commentary added successfully');
      setMinute('');
      setMessage('');
      setEventType('');
      setActor('');
      setTeam('');
      onAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add commentary');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white border-2 border-black rounded-2xl p-6 shadow-hard">
      <h2 className="text-lg font-bold mb-4">Add Commentary</h2>

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
          Minute
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="e.g. 15"
          />
        </label>

        <label className="space-y-1 text-sm font-semibold">
          Event Type (optional)
          <input
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="e.g. boundary"
          />
        </label>

        <label className="space-y-1 text-sm font-semibold">
          Actor (optional)
          <input
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="e.g. Batsman name"
          />
        </label>

        <label className="space-y-1 text-sm font-semibold">
          Team (optional)
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="e.g. Home"
          />
        </label>

        <label className="space-y-1 text-sm font-semibold md:col-span-2">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            rows={4}
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
          {isSubmitting ? 'Adding…' : 'Add Commentary'}
        </button>
      </div>
    </form>
  );
};
