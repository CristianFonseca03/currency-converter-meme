import twemoji from "twemoji";

/**
 * Converts an emoji character to its Twemoji CDN URL (SVG).
 * Uses the official twemoji library to compute the correct codepoint,
 * handling ZWJ sequences, variation selectors, etc.
 */
export function emojiToTwemojiUrl(emoji: string): string {
  const codePoint = twemoji.convert.toCodePoint(
    emoji.indexOf("\u200D") < 0 ? emoji.replace(/\uFE0F/g, "") : emoji
  );
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoint}.svg`;
}
