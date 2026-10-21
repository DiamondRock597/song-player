import { StyleSheet } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme';

import { COVER_SIZE, PLAY_GLYPH_OFFSET, PROGRESS_HEIGHT } from './constants';

export const styles = StyleSheet.create({
  // Figma fills overlays/200 over the screen; opaque bg/900 here, like the tab bar, so list rows
  // scrolling underneath don't show through.
  container: {
    backgroundColor: colors.bg900,
  },
  progressTrack: {
    height: PROGRESS_HEIGHT,
    backgroundColor: colors.bg300,
  },
  progressFill: {
    height: PROGRESS_HEIGHT,
    width: '100%',
    transformOrigin: 'left',
    backgroundColor: colors.primary500,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing[5],
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingLeft: spacing[5],
    paddingRight: spacing[4],
    paddingVertical: spacing[2],
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    overflow: 'hidden',
    borderRadius: radii.md,
    backgroundColor: colors.bg200,
  },
  image: {
    width: COVER_SIZE,
    height: COVER_SIZE,
  },
  glyphLayer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: {
    marginLeft: PLAY_GLYPH_OFFSET,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing[1],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  title: {
    ...typography.body400,
    flexShrink: 1,
    color: colors.txt900,
  },
  subtitle: {
    ...typography.caption200,
    color: colors.txt200,
  },
  buttonArea: {
    padding: spacing[1],
  },
});
