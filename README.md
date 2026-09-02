\# THE AETHERGRID



Grid Node // Protocol in Development.



Sister site to \[velohesystem.com](https://velohesystem.com) — same cyberpunk ecosystem, different purpose.



| Node | Role |

| --- | --- |

| velohesystem.com | NFT exhibition / archive |

| theaethergrid.com | Game-in-development node + Web3 + Aethergrid Spirits gallery |



\*\*Stack:\*\* Next.js App Router · TypeScript · Tailwind · Framer Motion · wagmi + viem + RainbowKit + TanStack Query



Local `stubs/x402-\*` packages keep the WalletConnect/Coinbase optional x402 deps from breaking the Next build. They are empty shims — no keys, no payments.



\---



\## Run



```bash

npm install

cp .env.example .env.local

\# set NEXT\_PUBLIC\_WC\_PROJECT\_ID

npm run dev

```



Open \[http://localhost:3000](http://localhost:3000).



| Variable | Required | Description |

| --- | --- | --- |

| `NEXT\_PUBLIC\_WC\_PROJECT\_ID` | For CONNECT NODE | WalletConnect Cloud project ID |



\---



\## Routes



\- `/` — boot landing

\- `/spirits` — VEL-AGS01…05 gallery (newest first)

\- `/protocol` — protocol in development (not playable)

\- `GET /api/market/prices` — BTC ETH BNB SOL POL XTZ (Tezos), cached \~45s. `txzUsd` aliases `xtzUsd`.



\---



\## Spirit assets



Place files at:



```

public/spirits/images/AGS01.png … AGS05.png

public/spirits/videos/AGS01.mp4 … AGS05.mp4

```



Missing stills render a core placeholder frame. Missing videos hide the motion toggle.



OpenSea URLs match the VΣLOHE catalog collection `0x407ccb1e09eb93525c2a5d12aeb1a46da135d737`.



\---



\## Checklist



\- \[ ] Set `NEXT\_PUBLIC\_WC\_PROJECT\_ID` in `.env.local`

\- \[ ] Drop Spirit stills / videos into `public/spirits/`

\- \[ ] Confirm Home · Spirits · Protocol

\- \[ ] Confirm CONNECT NODE works without gating the site

\- \[ ] Confirm header ticker polls `/api/market/prices`

\- \[ ] Confirm footer links to velohesystem.com



