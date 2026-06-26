/**
 * HoustonAvatar — the colored Houston helmet glyph, optionally wrapped in
 * the "card-running-glow" comet halo when an agent is actively working.
 *
 * This is the single source of truth for rendering an agent's avatar
 * across every Houston surface (desktop, mobile, any third-party
 * frontend built on `houston-engine`). Old local copies in `app/` and
 * `mobile/` duplicated the SVG path data + the running-glow wrapper;
 * every tweak had to be done twice. Not anymore.
 *
 * Pair `running` with the `.card-running-glow` rule shipped from
 * `globals.css` so the halo animation stays in lockstep with the
 * kanban card / detail panel variants. If your app doesn't import the
 * core globals, the avatar still renders — the halo is just inert.
 */
import type { CSSProperties } from "react";
import { cn } from "../utils";

const HOUSTON_GRAY = "#9b9b9b";

interface HelmetProps {
  /** Hex fill color. Defaults to Houston gray. */
  color?: string;
  /** Pixel size (width + height). */
  size?: number;
  className?: string;
}

const NODOFLUX_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij4KICA8cmVjdCB4PSIxMiIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMiIgcng9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iMjQiIGN5PSIzNCIgcj0iNSIgZmlsbD0iIzMzMyIvPgogIDxjaXJjbGUgY3g9IjQwIiBjeT0iMzQiIHI9IjUiIGZpbGw9IiMzMzMiLz4KICA8Y2lyY2xlIGN4PSIyMiIgY3k9IjMyIiByPSIxLjUiIGZpbGw9IiNmZmYiLz4KICA8Y2lyY2xlIGN4PSIzOCIgY3k9IjMyIiByPSIxLjUiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIyMiIgeT0iNDMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzLjUiIHJ4PSIxLjc1IiBmaWxsPSIjMzMzIi8+CiAgPGxpbmUgeDE9IjMyIiB5MT0iMjAiIHgyPSIzMiIgeTI9IjEwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iMzIiIGN5PSI4IiByPSI0IiBmaWxsPSIjMzMzIi8+CiAgPGNpcmNsZSBjeD0iMzAuNSIgY3k9IjYuNSIgcj0iMSIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjUiIHk9IjMwIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMiIgcng9IjMiIGZpbGw9IiMzMzMiLz4KICA8cmVjdCB4PSI1MiIgeT0iMzAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEyIiByeD0iMyIgZmlsbD0iIzMzMyIvPgo8L3N2Zz4K";

export function HoustonHelmet({
  size = 24,
  className,
}: HelmetProps) {
  return (
    <img
      src={NODOFLUX_ICON}
      alt="NodoFlux"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      aria-hidden
    />
  );
}

interface HoustonAvatarProps {
  /** Agent's themed hex color. Drives both the helmet fill AND the
   *  faint circle tint behind it. */
  color?: string;
  /** Outer circle diameter in pixels. Helmet sizes itself to ~65% of
   *  this to match the existing desktop look. */
  diameter?: number;
  /** When true, wraps the badge in a `.card-running-glow` halo — the
   *  same comet-trail effect the desktop uses on kanban cards and the
   *  chat panel header when a session is mid-flight. */
  running?: boolean;
  className?: string;
}

/** Agent avatar badge: colored circle + Houston helmet. Flip `running`
 *  to `true` and the badge grows a spinning comet border without any
 *  other code change required. */
export function HoustonAvatar({
  color,
  diameter = 40,
  running = false,
  className,
}: HoustonAvatarProps) {
  const bg = color ?? HOUSTON_GRAY;
  const innerDiameter = running ? Math.max(diameter - 4, 1) : diameter;
  const inner = (
    <div
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center",
        className,
      )}
      style={{
        width: innerDiameter,
        height: innerDiameter,
        backgroundColor: `color-mix(in srgb, var(--color-secondary, #f5f5f5) 82%, ${bg} 18%)`,
      }}
    >
      <HoustonHelmet size={Math.round(innerDiameter * 0.65)} />
    </div>
  );
  if (!running) return inner;
  return (
    <span
      className="shrink-0 rounded-full flex items-center justify-center card-running-glow"
      style={{
        width: diameter,
        height: diameter,
        "--glow-bg": "var(--color-background, #ffffff)",
      } as CSSProperties}
    >
      {inner}
    </span>
  );
}
