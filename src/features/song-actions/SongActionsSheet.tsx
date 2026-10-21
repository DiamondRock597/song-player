import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { blurs, spacing } from '@/theme';

import { ActionGroup, SheetHandle, SheetHeader } from './components';
import { SNAP_POINTS, SONG_ACTION_SECTIONS } from './constants';
import { styles } from './SongActionsSheet.styles';
import { useSongActionsSheet } from './useSongActionsSheet';

// Figma `overlay-shape`: overlays/200 tint with a 3px backdrop blur. On Android expo-blur
// needs a BlurTargetView around the content to blur, so it falls back to a translucent fill there.
const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    opacity={1}
    pressBehavior="close"
    style={[props.style, styles.backdrop]}
  >
    <BlurView intensity={blurs.overlay} tint="dark" style={StyleSheet.absoluteFill} />
  </BottomSheetBackdrop>
);

export const SongActionsSheet: FC = () => {
  const {
    modalRef,
    topInset,
    bottomInset,
    clipId,
    title,
    variant,
    tags,
    coverUrl,
    onAction,
    onClose,
    onDismiss,
  } = useSongActionsSheet();

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={SNAP_POINTS}
      enableDynamicSizing={false}
      topInset={topInset}
      enablePanDownToClose
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      handleComponent={SheetHandle}
      backgroundStyle={styles.background}
    >
      <BottomSheetScrollView
        contentContainerStyle={[styles.content, { paddingBottom: spacing[6] + bottomInset }]}
        showsVerticalScrollIndicator={false}
      >
        <SheetHeader
          clipId={clipId}
          title={title}
          variant={variant}
          tags={tags}
          coverUrl={coverUrl}
          onClose={onClose}
        />
        <View style={styles.list}>
          {SONG_ACTION_SECTIONS.map((section) => (
            <ActionGroup key={section.key} actions={section.actions} onAction={onAction} />
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
