export interface HunterCharacter {
  id: string;
  name: string;
  title: string;
  rank: string;
  class: string;
  guild: string;
  biography: string;
  portraitUrl: string | null;
  accent: string;
}

export interface StoryMoment {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  posterUrl: string | null;
  accent: string;
}
