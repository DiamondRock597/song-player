import { useCallback, useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { stopAndHide, togglePlay, useGlobalPlayer } from '@/core/player';
import { useSongActionsStore } from '@/core/song-actions';

// Matches the player service's progress write interval, so the line moves continuously.
const PROGRESS_TWEEN_MS = 250;
const progressEasing = Easing.linear;

const toRatio = (positionSec: number, durationSec: number): number =>
  durationSec > 0 ? Math.min(1, Math.max(0, positionSec / durationSec)) : 0;

// All MiniPlayer logic: store reads, the progress shared value and the handlers.
export const useMiniPlayer = () => {
  const { currentTrack, status, positionSec, durationSec } = useGlobalPlayer();
  const openActions = useSongActionsStore((s) => s.open);
  const trackId = currentTrack?.id ?? null;

  // 0–1, animated on the UI thread toward each new position.
  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = toRatio(positionSec, durationSec);
    if (ratio < progress.get()) {
      // New track, finished or seeked back: jump instead of sweeping backwards.
      progress.set(ratio);
    } else {
      progress.set(withTiming(ratio, { duration: PROGRESS_TWEEN_MS, easing: progressEasing }));
    }
  }, [progress, positionSec, durationSec]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: progress.get() }],
  }));

  const onPressBar = useCallback(() => {
    if (trackId) openActions(trackId);
  }, [trackId, openActions]);

  const isError = status === 'error';
  const isPlaying = status === 'playing';

  return {
    track: currentTrack,
    status,
    isError,
    playLabel: isPlaying ? 'Pause' : 'Play',
    progressStyle,
    onPressBar,
    // Module-level service functions: already stable references.
    onTogglePlay: togglePlay,
    onClose: stopAndHide,
  };
};
