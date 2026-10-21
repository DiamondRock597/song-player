export type Track = {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string | null;
  variant: number;
};

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
