import { useEffect, useRef, useState } from "react";
import { sign, type Appraisal, type Verdict } from "../lib/coins";
import { CoinAmount } from "./coin-amount";

interface ReceiptProps {
  appraisal: Appraisal;
}

const TAG: Record<Verdict, string> = {
  profit: "Profit",
  loss: "Loss — the lion wins",
  even: "Breaks even",
};

export function Receipt({ appraisal }: ReceiptProps) {
  const {
    buyUnit,
    revenue,
    cost,
    listingFee,
    transactionFee,
    profit,
    verdict,
    roi,
    breakEven,
    isEmpty,
  } = appraisal;

  const [flash, setFlash] = useState(false);
  const lastSign = useRef<-1 | 0 | 1 | null>(null);

  useEffect(() => {
    if (isEmpty) {
      lastSign.current = null;
      return;
    }
    const s = sign(profit);
    if (lastSign.current !== null && s !== lastSign.current && s !== 0) {
      setFlash(false);
      requestAnimationFrame(() => setFlash(true));
    }
    lastSign.current = s;
  }, [profit, isEmpty]);

  return (
    <section className="receipt">
      <dl className="lines">
        <div className="line">
          <dt className="k">Revenue</dt>
          <dd className="v">
            <CoinAmount value={revenue} />
          </dd>
        </div>
        <div className="line">
          <dt className="k">Cost</dt>
          <dd className="v">
            <CoinAmount value={cost} />
          </dd>
        </div>
        <div className="line fee">
          <dt className="k">
            Listing fee<span className="pct">5%</span>
          </dt>
          <dd className="v">
            <CoinAmount value={listingFee} />
          </dd>
        </div>
        <div className="line fee">
          <dt className="k">
            Transaction fee<span className="pct">10%</span>
          </dt>
          <dd className="v">
            <CoinAmount value={transactionFee} />
          </dd>
        </div>
      </dl>

      <hr className="subrule" />

      <div
        className={`verdict${flash ? " flash" : ""}`}
        onAnimationEnd={() => setFlash(false)}
      >
        <p className="vtag">{TAG[verdict]}</p>
        <output className="hero">
          {isEmpty ? "—" : <CoinAmount value={profit} />}
        </output>
        <p className="meta">
          {isEmpty ? (
            <span className="roi">Enter a buy and sell price to appraise.</span>
          ) : (
            <>
              {roi !== null && (
                <span className="roi">
                  Return{" "}
                  <b>
                    {roi >= 0 ? "+" : ""}
                    {roi.toFixed(1)}%
                  </b>{" "}
                  on cost
                </span>
              )}
              {buyUnit > 0 && (
                <span className="be">
                  <span className="lbl">Break-even list</span>
                  <span className="val">
                    <CoinAmount value={breakEven} />
                  </span>
                </span>
              )}
            </>
          )}
        </p>
      </div>
    </section>
  );
}
