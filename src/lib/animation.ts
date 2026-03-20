/** Snappy ease used throughout the portfolio */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO },
} as const;
