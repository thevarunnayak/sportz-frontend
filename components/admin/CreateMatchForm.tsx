import React, { useState } from 'react';
import { createMatch } from '../../services/api';

interface CreateMatchFormProps {
    onCreated: () => void;
}

export const CreateMatchForm: React.FC<CreateMatchFormProps> = ({ onCreated }) => {
    const [sport, setSport] = useState('');
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    const isFormValid =
        sport.trim() !== '' &&
        homeTeam.trim() !== '' &&
        awayTeam.trim() !== '' &&
        startTime !== '' &&
        endTime !== '';
    
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!sport || !homeTeam || !awayTeam || !startTime) {
            setError('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            await createMatch({
                sport,
                homeTeam,
                awayTeam,
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
            });
            setSuccess('Match created successfully!');
            setSport('');
            setHomeTeam('');
            setAwayTeam('');
            setStartTime('');
            setEndTime('');
            onCreated();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create match');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} className="bg-white border-2 border-black rounded-2xl p-6 shadow-hard">
            <h2 className="text-lg font-bold mb-4">Create New Match</h2>

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
                    Sport
                    <input
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                        className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="e.g. Cricket"
                        required
                    />
                </label>

                <label className="space-y-1 text-sm font-semibold">
                    Home Team
                    <input
                        value={homeTeam}
                        onChange={(e) => setHomeTeam(e.target.value)}
                        className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="Home Team"
                        required
                    />
                </label>

                <label className="space-y-1 text-sm font-semibold">
                    Away Team
                    <input
                        value={awayTeam}
                        onChange={(e) => setAwayTeam(e.target.value)}
                        className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="Away Team"
                        required
                    />
                </label>

                <label className="space-y-1 text-sm font-semibold">
                    Start Time
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </label>

                <label className="space-y-1 text-sm font-semibold md:col-span-2">
                    End Time
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                </label>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="px-6 py-2 bg-brand-blue text-black font-bold rounded-full border-2 border-black hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Creating…' : 'Create Match'}
                </button>
            </div>
        </form>
    );
};
