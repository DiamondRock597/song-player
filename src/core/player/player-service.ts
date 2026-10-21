import { createAudioPlayer, setAudioModeAsync, type AudioStatus } from 'expo-audio';

import { usePlayerStore } from './player-store';
import type { PlayerStatus, Track } from './types';

const PROGRESS_WRITE_INTERVAL_MS = 250;

// The only player in the app. Created once at module load; never create another.
export const audioPlayer = createAudioPlayer();

let lastProgressWriteAt = 0;

export const initAudio = async (): Promise<void> => {
  await setAudioModeAsync({ playsInSilentMode: true });
};

export const playTrack = (track: Track): void => {
  if (track.id === usePlayerStore.getState().currentTrack?.id) {
    togglePlay();
    return;
  }
  usePlayerStore.setState({ currentTrack: track, status: 'loading', positionSec: 0, durationSec: 0 });
  try {
    audioPlayer.replace({ uri: track.audioUrl });
    audioPlayer.play();
  } catch {
    usePlayerStore.setState({ status: 'error' });
  }
};

export const togglePlay = (): void => {
  if (usePlayerStore.getState().currentTrack === null) return;
  if (audioPlayer.playing) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
};

export const seekTo = (sec: number): Promise<void> => {
  const target = Math.max(0, sec);
  usePlayerStore.setState({ positionSec: target });
  return audioPlayer.seekTo(target);
};

const toPlayerStatus = (status: AudioStatus): PlayerStatus => {
  if (status.error) return 'error';
  if (!status.isLoaded || (status.playing && status.isBuffering)) return 'loading';
  return status.playing ? 'playing' : 'paused';
};

// The single feed from the native player into the store.
audioPlayer.addListener('playbackStatusUpdate', (status) => {
  const state = usePlayerStore.getState();
  if (state.currentTrack === null) return;

  if (status.didJustFinish) {
    audioPlayer.pause();
    void audioPlayer.seekTo(0);
    usePlayerStore.setState({ status: 'paused', positionSec: 0 });
    return;
  }

  const nextStatus = toPlayerStatus(status);
  const durationSec = status.duration > 0 ? status.duration : state.durationSec;
  const now = Date.now();

  // Status and duration changes go through at once; progress alone is throttled.
  if (nextStatus !== state.status || durationSec !== state.durationSec) {
    lastProgressWriteAt = now;
    usePlayerStore.setState({ status: nextStatus, durationSec, positionSec: status.currentTime });
  } else if (now - lastProgressWriteAt >= PROGRESS_WRITE_INTERVAL_MS) {
    lastProgressWriteAt = now;
    usePlayerStore.setState({ positionSec: status.currentTime });
  }
});
