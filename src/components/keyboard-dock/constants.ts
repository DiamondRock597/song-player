// The app is edge-to-edge, so both bars are translucent. Without these flags Reanimated adds the bar
// insets as margins to the Android content root (doubling the safe area) and turns
// decorFitsSystemWindows back on when the hook unmounts. With them, `height` is the full IME inset.
export const KEYBOARD_OPTIONS = {
  isStatusBarTranslucentAndroid: true,
  isNavigationBarTranslucentAndroid: true,
};
