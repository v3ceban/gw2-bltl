import { breakdown } from "../lib/coins";
import { Coin } from "./coin";

export function CoinAmount({ value }: { value: number }) {
  const { negative, gold, silver, bronze } = breakdown(value);
  return (
    <>
      {negative && <span className="sign">−</span>}
      {gold > 0 && (
        <span className="coin-amt">
          {gold}
          <Coin kind="gold" />
        </span>
      )}
      {(silver > 0 || gold > 0) && (
        <span className="coin-amt">
          {silver}
          <Coin kind="silver" />
        </span>
      )}
      <span className="coin-amt">
        {bronze}
        <Coin kind="bronze" />
      </span>
    </>
  );
}
