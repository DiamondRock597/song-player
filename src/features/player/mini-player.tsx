import { Image } from 'expo-image';
import type { FC } from 'react';
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
import { colors } from '@/theme';

import { ENTER_MS, EXIT_MS, GLYPH_FADE_MS, GLYPH_SIZE, PLAYER_SUBTITLE, STATE_ICON_SIZE } from './constants';
import { styles } from './mini-player.styles';
import { useMiniPlayer } from './use-mini-player';

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

const GlyphIcon: FC<{ glyph: Glyph }> = ({ glyph }) => {
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
const CoverState: FC<{ status: PlayerStatus }> = ({ status }) => {
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
export const MiniPlayer: FC = () => {
  const { track, status, isError, playLabel, progressStyle, onPressBar, onTogglePlay, onClose } =
    useMiniPlayer();

  if (!track) {
    return null;
  }

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
