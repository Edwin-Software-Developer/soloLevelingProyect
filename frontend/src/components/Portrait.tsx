import type { CSSProperties } from "react";
import { useState } from "react";

interface PortraitProps {
  name: string;
  title: string;
  portraitUrl: string | null;
  accent: string;
  large?: boolean;
}

export default function Portrait({ name, title, portraitUrl, accent, large = false }: PortraitProps) {
  const [failedPortraitUrl, setFailedPortraitUrl] = useState<string | null>(null);
  const hasPortrait = portraitUrl !== null && failedPortraitUrl !== portraitUrl;
  const style = { "--portrait-accent": accent } as CSSProperties;
  return (
    <div className={`portrait-art${large ? " portrait-art-large" : ""}${hasPortrait ? " has-image" : ""}`} style={style} role="img" aria-label={`${name}, ${title}`}>
      {hasPortrait ? <img src={portraitUrl} alt="" onError={() => setFailedPortraitUrl(portraitUrl)} /> : <div className="portrait-silhouette" />}
      <div className="portrait-caption">
        <span>{title}</span>
        <strong>{name}</strong>
      </div>
    </div>
  );
}
