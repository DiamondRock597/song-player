import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

import { blurs, colors, radii, shadows, spacing } from '@/theme';

import { SONG_ACTION_SECTIONS } from './actions';
import { ActionGroup } from './components/ActionGroup';
import { SheetHandle } from './components/SheetHandle';
import { SheetHeader } from './components/SheetHeader';
import { useSongActionsSheet } from './useSongActionsSheet';

// Full height: the sheet reaches up to `topInset` and the content scrolls if it doesn't fit.
const SNAP_POINTS = ['100%'];

// Module-level so the reference is stable across renders.
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

// Figma `bs/song-page/context-menu` (1:5409). Mounted once in (tabs)/_layout.tsx and opened
// through useSongActionsStore.open(clipId). Fixed full height, stopping below the status bar.
export const SongActionsSheet = () => {
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

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.overlays200,
  },
  background: {
    ...shadows.sheetTop,
    backgroundColor: colors.bg900,
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
  },
  content: {
    gap: 10,
    paddingHorizontal: spacing[5],
  },
  list: {
    gap: spacing[3],
  },
});
