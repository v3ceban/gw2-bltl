# Black Lion Trading Ledger

A Guild Wars 2 Trading Post profit calculator. Enter a buy cost and a list
price in gold/silver/bronze and it shows your profit after the seller's fees,
your return on cost, and the lowest list price that still breaks even.

## Fees

The Trading Post charges the seller two fees on the list price:

- **Listing fee** — 5%
- **Transaction fee** — 10%

Each fee is rounded to whole bronze with a minimum of 1, matching the in-game
behaviour. Toggle "Full stack" to appraise a stack of 250 instead of one item.

## Develop

Built with Vite, React, and TypeScript. Requires [Bun](https://bun.sh).

```sh
bun install
bun dev          # start the dev server
bun run build    # type-check and build to dist/
```

Other scripts: `bun run typecheck`, `bun run lint`, `bun run format`.

## Layout

- `src/lib/coins.ts` — coin math: fees, break-even, and the appraisal.
- `src/components/` — UI components.
- `src/app.tsx` — composition and state.
