import { COIN_KINDS, type Price } from "../lib/coins";
import { CoinField } from "./coin-field";

interface CoinRowProps {
  label: string;
  hint: string;
  value: Price;
  onChange: (value: Price) => void;
}

export function CoinRow({ label, hint, value, onChange }: CoinRowProps) {
  return (
    <fieldset className="entry">
      <legend className="entry-label">
        <span>{label}</span>
        <span className="hint">{hint}</span>
      </legend>
      <div className="coinrow">
        {COIN_KINDS.map((kind) => (
          <CoinField
            key={kind}
            kind={kind}
            value={value[kind]}
            onChange={(v) => onChange({ ...value, [kind]: v })}
          />
        ))}
      </div>
    </fieldset>
  );
}
