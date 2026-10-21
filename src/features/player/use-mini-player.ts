import { useCallback, useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { stopAndHide, togglePlay, useGlobalPlayer } from '@/core/player';
import { useSongActionsStore } from '@/core/song-actions';

import { PROGRESS_TWEEN_MS } from './constants';

const progressEasing = Easing.linear;

const toRatio = (positionSec: number, durationSec: number): number =>
  durationSec > 0 ? Math.min(1, Math.max(0, positionSec / durationSec)) : 0;

export const useMiniPlayer = () => {
  const { currentTrack, status, positionSec, durationSec } = useGlobalPlayer();
  const openActions = useSongActionsStore((s) => s.open);
  const trackId = currentTrack?.id ?? null;

  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = toRatio(positionSec, durationSec);
    if (ratio < progress.get()) {
      progress.set(ratio);
    } else {
      progress.set(withTiming(ratio, { duration: PROGRESS_TWEEN_MS, easing: progressEasing }));
    }
  }, [progress, positionSec, durationSec]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: progress.get() }],
  }));

  const onPressBar = useCallback(() => {
    if (trackId) {
      openActions(trackId);
    }
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
    onTogglePlay: togglePlay,
    onClose: stopAndHide,
  };
};
