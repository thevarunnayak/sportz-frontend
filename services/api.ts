import { API_BASE_URL } from "../constants";
import { CommentaryResponse, MatchResponse } from "../types";

export const fetchMatches = async (limit = 50): Promise<MatchResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches?limit=${limit}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Propagate error to be handled by the UI layer
    throw error;
  }
};

export const fetchMatchCommentary = async (
  matchId: string | number,
  limit = 100
): Promise<CommentaryResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/matches/${matchId}/commentary?limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export interface CreateMatchPayload {
  sport: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  endTime?: string;
}

export const createMatch = async (payload: CreateMatchPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export interface ScoreUpdatePayload {
  homeScore: number;
  awayScore: number;
}

export const updateMatchScore = async (
  matchId: string | number,
  payload: ScoreUpdatePayload
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export interface MatchCommentaryPayload {
  minute?: number;
  message: string;
  eventType?: string;
  actor?: string;
  team?: string;
}

export const addMatchCommentary = async (
  matchId: string | number,
  payload: MatchCommentaryPayload
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/commentary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
