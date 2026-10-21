import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { showNotImplemented } from '@/components';
import { useSongActionsStore } from '@/core/song-actions';
import { useClip } from '@/features/songs';

import type { SongActionKey } from './actions';

export const useSongActionsSheet = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const clipId = useSongActionsStore((s) => s.clipId);
  const close = useSongActionsStore((s) => s.close);

  // Keep the last clip on screen while the sheet animates out after close() clears the id,
  // otherwise the content would vanish mid-animation.
  const [shownClipId, setShownClipId] = useState(clipId);
  if (clipId !== null && clipId !== shownClipId) setShownClipId(clipId);

  const clip = useClip(shownClipId);

  // Whether the modal is on screen. dismiss() on a modal that isn't presented (on mount, or after
  // onDismiss already cleared the store) leaves @gorhom's modal stuck in DISMISSING, and every
  // later present() is then ignored, so only dismiss what is actually open.
  const isPresentedRef = useRef(false);

  useEffect(() => {
    if (clipId) {
      isPresentedRef.current = true;
      modalRef.current?.present();
    } else if (isPresentedRef.current) {
      isPresentedRef.current = false;
      modalRef.current?.dismiss();
    }
  }, [clipId]);

  const insets = useSafeAreaInsets();

  const onAction = useCallback((_key: SongActionKey) => {
    showNotImplemented();
  }, []);

  const onDismiss = useCallback(() => {
    isPresentedRef.current = false;
    close();
  }, [close]);

  return {
    modalRef,
    topInset: insets.top,
    bottomInset: insets.bottom,
    clipId: shownClipId,
    title: clip?.title ?? '',
    variant: clip?.variant ?? null,
    tags: clip?.tags ?? '',
    coverUrl: clip?.coverUrl ?? null,
    onAction,
    onClose: close,
    onDismiss,
  };
};
