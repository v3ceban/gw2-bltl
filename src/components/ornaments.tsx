const CORNERS = ["tl", "tr", "bl", "br"] as const;

function CornerFlourish() {
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path
        d="M3 43 L3 16 Q3 3 16 3 L43 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 43 L9 18 Q9 9 18 9 L43 9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M9 18 Q14 14 18 14 Q14 18 14 23 Q11 19 9 18 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="6" cy="6" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Corners() {
  return (
    <>
      {CORNERS.map((pos) => (
        <span key={pos} className={`corner ${pos}`}>
          <CornerFlourish />
        </span>
      ))}
    </>
  );
}

export function Seal() {
  return (
    <svg className="seal" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" />
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="6" x2="50" y2="16" />
        <line x1="50" y1="84" x2="50" y2="94" />
        <line x1="6" y1="50" x2="16" y2="50" />
        <line x1="84" y1="50" x2="94" y2="50" />
        <line x1="19" y1="19" x2="26" y2="26" />
        <line x1="74" y1="74" x2="81" y2="81" />
        <line x1="81" y1="19" x2="74" y2="26" />
        <line x1="26" y1="74" x2="19" y2="81" />
      </g>
      <path
        d="M50 30 L62 50 L50 70 L38 50 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="5" fill="#140f08" />
    </svg>
  );
}
