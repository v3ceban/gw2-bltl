import { useState } from "react";
import {
  appraise,
  emptyPrice,
  parseCostString,
  STACK_SIZE,
  type Price,
} from "./lib/coins";
import { Corners, Seal } from "./components/ornaments";
import { CoinRow } from "./components/coin-row";
import { Receipt } from "./components/receipt";
import { Coin } from "./components/coin";

function ResetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function initialBuy(): Price {
  const param = new URLSearchParams(window.location.search).get("cost");
  if (param === null) return emptyPrice();

  const url = new URL(window.location.href);
  url.searchParams.delete("cost");
  window.history.replaceState(null, "", url);

  return parseCostString(param);
}

export default function App() {
  const [buy, setBuy] = useState<Price>(initialBuy);
  const [sell, setSell] = useState<Price>(emptyPrice);
  const [stack, setStack] = useState(false);

  const qty = stack ? STACK_SIZE : 1;
  const appraisal = appraise(buy, sell, qty);

  const reset = () => {
    setBuy(emptyPrice());
    setSell(emptyPrice());
  };

  return (
    <main className={`ledger${appraisal.verdict === "loss" ? " loss" : ""}`}>
      <Corners />

      <header>
        <Seal />
        <h1>Black Lion Trading Ledger</h1>
        <p className="eyebrow">
          Appraise your margin before the lion takes its cut.
        </p>
      </header>

      <CoinRow
        label="Your cost"
        hint="what you pay per item"
        value={buy}
        onChange={setBuy}
      />
      <CoinRow
        label="List price"
        hint="what you sell it for"
        value={sell}
        onChange={setSell}
      />

      <div className="actions">
        <button
          type="button"
          className="ghost-btn"
          title="Clear both prices"
          onClick={reset}
        >
          <ResetIcon />
          Reset prices
        </button>
      </div>

      <div className="stackbar">
        <div className="lab">
          <b>Full stack</b>
          <span>{stack ? "selling a stack of 250" : "selling one item"}</span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            aria-label="Toggle full stack of 250"
            checked={stack}
            onChange={(e) => setStack(e.target.checked)}
          />
          <span className="track">
            <span className="knob" />
          </span>
        </label>
      </div>

      <hr className="rule" />

      <Receipt appraisal={appraisal} />

      <footer className="foot">
        Fees are charged to the seller on the list price. Each fee is rounded to
        whole <Coin kind="bronze" /> bronze (minimum 1), matching the in-game
        Trading Post.
      </footer>
    </main>
  );
}
