import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  LayoutAnimationConfig,
} from 'react-native-reanimated';

import { CountTag, CoverOverlay, Icon, IconButton, Spinner } from '@/components';
import type { PlayerStatus } from '@/core/player';
import { colors, radii, spacing, typography } from '@/theme';

import { PLAYER_SUBTITLE } from './constants';
import { useMiniPlayer } from './use-mini-player';

const PROGRESS_HEIGHT = 2;
const COVER_SIZE = 48;
const GLYPH_SIZE = 18;
const PLAY_GLYPH_OFFSET = 3;
const STATE_ICON_SIZE = 24;
const ENTER_MS = 220;
const EXIT_MS = 180;
const GLYPH_FADE_MS = 200;

const entering = FadeInDown.duration(ENTER_MS);
const exiting = FadeOutDown.duration(EXIT_MS);

const glyphEntering = FadeIn.duration(GLYPH_FADE_MS);
const glyphExiting = FadeOut.duration(GLYPH_FADE_MS);

type Glyph = 'loading' | 'error' | 'pause' | 'play';

const toGlyph = (status: PlayerStatus): Glyph => {
  switch (status) {
    case 'loading':
      return 'loading';
    case 'error':
      return 'error';
    case 'playing':
      return 'pause';
    default:
      return 'play';
  }
};

const GlyphIcon = ({ glyph }: { glyph: Glyph }) => {
  switch (glyph) {
    case 'loading':
      return <Spinner size={STATE_ICON_SIZE} />;
    case 'error':
      return <Icon name="error" size={STATE_ICON_SIZE} color={colors.misc100} />;
    case 'pause':
      return <Icon name="pause" size={GLYPH_SIZE} color={colors.misc100} />;
    case 'play':
      return <Icon name="play" size={GLYPH_SIZE} color={colors.misc100} style={styles.playGlyph} />;
  }
};

// Cross-fades between glyphs: keying by glyph remounts the layer, and the outgoing one fades out
// on top of the incoming one (both absolutely filled and centred). Entering is skipped on first
// mount so the glyph rides in with the bar instead of fading separately.
const CoverState = ({ status }: { status: PlayerStatus }) => {
  const glyph = toGlyph(status);

  return (
    <LayoutAnimationConfig skipEntering skipExiting>
      <Animated.View
        key={glyph}
        entering={glyphEntering}
        exiting={glyphExiting}
        style={styles.glyphLayer}
      >
        <GlyphIcon glyph={glyph} />
      </Animated.View>
    </LayoutAnimationConfig>
  );
};

// Figma `player-collapsed` (1:5407), docked above the tab bar via TabBar's `accessory` slot.
// Touch areas: cover = play/pause, chevron = stop and hide, everything else = actions sheet.
// The bar is a full-size background Pressable with the buttons as siblings on top, so VoiceOver
// can reach all three (a Pressable parent would swallow its children's accessibility).
export const MiniPlayer = () => {
  const { track, status, isError, playLabel, progressStyle, onPressBar, onTogglePlay, onClose } =
    useMiniPlayer();

  if (!track) return null;

  return (
    <Animated.View entering={entering} exiting={exiting} style={styles.container}>
      <Pressable
        onPress={onPressBar}
        accessibilityRole="button"
        accessibilityLabel={`${track.title}, open actions`}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.progressTrack} pointerEvents="none">
        <Animated.View style={[styles.progressFill, progressStyle]} />
      </View>
      <View style={styles.content} pointerEvents="box-none">
        <View style={styles.item} pointerEvents="box-none">
          <Pressable
            onPress={onTogglePlay}
            disabled={isError}
            accessibilityRole="button"
            accessibilityLabel={playLabel}
            accessibilityState={{ disabled: isError }}
            style={styles.cover}
          >
            {track.imageUrl !== null && (
              <Image
                source={track.imageUrl}
                recyclingKey={track.id}
                contentFit="cover"
                style={styles.image}
                accessibilityIgnoresInvertColors
              />
            )}
            <CoverOverlay>
              <CoverState status={status} />
            </CoverOverlay>
          </Pressable>
          {/* Read as part of the bar's label; touches fall through to the bar. */}
          <View
            style={styles.text}
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {track.title}
              </Text>
              <CountTag count={track.variant} />
            </View>
            <Text style={styles.subtitle} numberOfLines={1}>
              {PLAYER_SUBTITLE}
            </Text>
          </View>
        </View>
        <View style={styles.buttonArea}>
          <IconButton
            icon="chevron-down"
            variant="ghost"
            color={colors.chevronIcon}
            accessibilityLabel="Close player"
            onPress={onClose}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
