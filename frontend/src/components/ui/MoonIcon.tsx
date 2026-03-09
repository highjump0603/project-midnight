interface MoonIconProps {
  size?: number;
  className?: string;
}

export default function MoonIcon({ size = 32, className = "" }: MoonIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left bracket < */}
      <path
        d="M18 12 L4 35 L18 58"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right bracket > */}
      <path
        d="M82 12 L96 35 L82 58"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Crescent moon */}
      <path
        d="M50 15 C36 15 26 24 26 35 C26 46 36 55 50 55 C42 55 35 46 35 35 C35 24 42 15 50 15Z"
        fill="currentColor"
      />
      {/* Clock circle (inner) */}
      <circle cx="50" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {/* Clock hands */}
      <line x1="50" y1="35" x2="50" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="35" x2="55" y2="37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Star */}
      <path
        d="M63 16 L64.5 20.5 L69 20.5 L65.5 23.2 L67 27.5 L63 24.8 L59 27.5 L60.5 23.2 L57 20.5 L61.5 20.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}
