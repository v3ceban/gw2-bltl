import type { CoinKind } from "../lib/coins";

export function Coin({ kind }: { kind: CoinKind }) {
  return <span className={`coin ${kind}`} />;
}
