// Shapes of songs.json. A generation produces two clip variants of the same song;
// what a clip carries depends on the generation status.

export type GenerationStatus = 'in_progress' | 'error' | 'completed';

type ClipBase = {
  id: string;
  variant: number;
  title: string;
  // Comma-separated, e.g. "Country, Smooth, Ballad". Can be empty.
  tags: string;
};

export type PendingClip = ClipBase & {
  coverUrl: string | null;
  audioUrl: null;
  duration: null;
};

export type FailedClip = ClipBase & {
  coverUrl: null;
  audioUrl: null;
  duration: null;
};

export type CompletedClip = ClipBase & {
  coverUrl: string | null;
  audioUrl: string;
  // Seconds. Missing for some completed clips.
  duration: number | null;
};

export type Clip = PendingClip | FailedClip | CompletedClip;

type GenerationBase = {
  id: string;
  // ISO 8601, UTC.
  createdAt: string;
};

export type InProgressGeneration = GenerationBase & {
  status: 'in_progress';
  // 0–100.
  progress: number;
  clips: PendingClip[];
};

export type FailedGeneration = GenerationBase & {
  status: 'error';
  error: string;
  clips: FailedClip[];
};

export type CompletedGeneration = GenerationBase & {
  status: 'completed';
  clips: CompletedClip[];
};

export type Generation = InProgressGeneration | FailedGeneration | CompletedGeneration;

export type SongsData = {
  generations: Generation[];
};
