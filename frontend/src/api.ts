import type { HunterCharacter, StoryMoment } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}.`);
  }
  return response.json() as Promise<T>;
}

export const getCharacters = () => request<HunterCharacter[]>("/api/characters");
export const getCharacter = (id: string) => request<HunterCharacter>(`/api/characters/${id}`);
export const getMoments = () => request<StoryMoment[]>("/api/moments");
export const getMoment = (id: string) => request<StoryMoment>(`/api/moments/${id}`);
