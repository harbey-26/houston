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

const NODOFLUX_ICON = "data:image/png;base64,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";

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
