import { emojiToTwemojiUrl } from "@/lib/twemoji";

interface TwemojiIconProps {
  emoji: string;
  size?: number;
  className?: string;
  alt?: string;
}

export default function TwemojiIcon({
  emoji,
  size = 20,
  className = "",
  alt = emoji,
}: TwemojiIconProps) {
  const url = emojiToTwemojiUrl(emoji);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      className={`inline-block ${className}`}
    />
  );
}
