import type { CoinKind } from "../lib/coins";

function StepIcon({ direction }: { direction: "up" | "down" }) {
  const d = direction === "up" ? "M1 5 L5 1.5 L9 5" : "M1 1 L5 4.5 L9 1";
  return (
    <svg viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CoinFieldProps {
  kind: CoinKind;
  value: number;
  onChange: (value: number) => void;
}

export function CoinField({ kind, value, onChange }: CoinFieldProps) {
  const displayed = value > 0 ? String(value) : "";

  const handleInput = (raw: string) => {
    const parsed = parseFloat(raw);
    onChange(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
  };

  const step = (delta: number) => {
    onChange(Math.max(0, Math.round(value) + delta));
  };

  return (
    <label className="coinfield">
      <span className={`coin ${kind}`} />
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="0"
        value={displayed}
        onChange={(e) => handleInput(e.target.value)}
      />
      <span className="stepper">
        <button
          type="button"
          className="up"
          tabIndex={-1}
          aria-label="increase by 1"
          onClick={(e) => {
            e.preventDefault();
            step(1);
          }}
        >
          <StepIcon direction="up" />
        </button>
        <button
          type="button"
          className="down"
          tabIndex={-1}
          aria-label="decrease by 1"
          onClick={(e) => {
            e.preventDefault();
            step(-1);
          }}
        >
          <StepIcon direction="down" />
        </button>
      </span>
      <span className="tag">{kind}</span>
    </label>
  );
}
