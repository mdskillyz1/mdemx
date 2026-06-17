type LogoProps = {
  compact?: boolean;
  tagline?: string;
  size?: "sm" | "md";
};

export function Logo({ compact = false, tagline = "London digital studio", size = "md" }: LogoProps) {
  const markSize = size === "sm" ? "size-10" : "size-12";
  const titleSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <span className="flex items-center gap-3">
      <span
        className={`relative grid ${markSize} shrink-0 place-items-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[#08110d] shadow-[0_0_32px_rgba(167,243,194,0.18)]`}
        aria-hidden="true"
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(167,243,194,0.32),transparent_2rem)]" />
        <svg viewBox="0 0 64 64" className="relative size-full" role="img">
          <path
            d="M12 45V19h8.2l11.7 15.2L43.7 19H52v26h-8.2V31.9L34.9 43h-6L20.1 31.9V45H12Z"
            fill="#a7f3c2"
          />
          <path
            d="M14 51h36"
            fill="none"
            stroke="#4ade80"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M48 13 55 6"
            fill="none"
            stroke="#f7fff9"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </span>
      {!compact ? (
        <span>
          <span className={`block font-semibold tracking-tight text-white ${titleSize}`}>MDemx</span>
          <span className="block text-xs text-[var(--muted)]">{tagline}</span>
        </span>
      ) : null}
    </span>
  );
}
