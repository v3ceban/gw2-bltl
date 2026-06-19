export type CoinKind = "gold" | "silver" | "bronze";

export interface Price {
  gold: number;
  silver: number;
  bronze: number;
}

export const emptyPrice = (): Price => ({ gold: 0, silver: 0, bronze: 0 });

export const COIN_KINDS: CoinKind[] = ["gold", "silver", "bronze"];

export const BRONZE_PER_SILVER = 100;
export const BRONZE_PER_GOLD = 10000;

export const LISTING_RATE = 0.05;
export const TRANSACTION_RATE = 0.1;

export const STACK_SIZE = 250;

export const priceToBronze = (p: Price): number =>
  p.gold * BRONZE_PER_GOLD + p.silver * BRONZE_PER_SILVER + p.bronze;

export const fee = (value: number, rate: number): number =>
  value > 0 ? Math.max(1, Math.round(value * rate)) : 0;

export const sign = (value: number): -1 | 0 | 1 =>
  value > 0 ? 1 : value < 0 ? -1 : 0;

export interface CoinBreakdown {
  negative: boolean;
  gold: number;
  silver: number;
  bronze: number;
}

export function breakdown(value: number): CoinBreakdown {
  const negative = value < 0;
  let v = Math.abs(Math.round(value));
  const gold = Math.floor(v / BRONZE_PER_GOLD);
  v -= gold * BRONZE_PER_GOLD;
  const silver = Math.floor(v / BRONZE_PER_SILVER);
  const bronze = v - silver * BRONZE_PER_SILVER;
  return { negative, gold, silver, bronze };
}

export function breakEven(buy: number): number {
  const NET_OF_FEES = 1 - LISTING_RATE - TRANSACTION_RATE;
  const SEED_BACKOFF = 3;
  const GUARD_LIMIT = 100000;

  const profitAt = (u: number): number => {
    if (u <= 0) return -buy;
    return u - buy - fee(u, LISTING_RATE) - fee(u, TRANSACTION_RATE);
  };
  let u = Math.max(1, Math.ceil(buy / NET_OF_FEES) - SEED_BACKOFF);
  let guard = 0;
  while (profitAt(u) < 0 && guard++ < GUARD_LIMIT) u++;
  return u;
}

export type Verdict = "profit" | "loss" | "even";

export interface Appraisal {
  buyUnit: number;
  revenue: number;
  cost: number;
  listingFee: number;
  transactionFee: number;
  profit: number;
  verdict: Verdict;
  roi: number | null;
  breakEven: number;
  isEmpty: boolean;
}

export function appraise(buy: Price, sell: Price, qty: number): Appraisal {
  const buyUnit = priceToBronze(buy);
  const sellUnit = priceToBronze(sell);

  const revenue = sellUnit * qty;
  const cost = buyUnit * qty;
  const listingFee = fee(revenue, LISTING_RATE);
  const transactionFee = fee(revenue, TRANSACTION_RATE);
  const profit = revenue - cost - listingFee - transactionFee;
  const s = sign(profit);

  return {
    buyUnit,
    revenue,
    cost,
    listingFee,
    transactionFee,
    profit,
    verdict: s > 0 ? "profit" : s < 0 ? "loss" : "even",
    roi: cost > 0 ? (profit / cost) * 100 : null,
    breakEven: breakEven(buyUnit),
    isEmpty: revenue === 0 && cost === 0,
  };
}
