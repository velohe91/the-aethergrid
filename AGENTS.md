<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# THE AETHERGRID — Agent Instructions

This repository is **THE AETHERGRID**, a Next.js application for the interactive Aethergrid node: Spirits, protocol experiences, Web3 wallet connectivity, and the evolving game universe. It shares a visual ecosystem with VΣLOHE while remaining a separate product and codebase.

## Branches and commits

- Work on a focused branch named `agent/<short-description>` unless the user explicitly names a different branch.
- Do not push, merge, or commit directly to `main` unless the user explicitly requests it.
- Before creating a commit, show the user what changed and obtain approval.
- Use focused commits with clear messages. Do not bundle unrelated changes.
- Never force-push, rewrite history, delete branches, or reset shared work unless explicitly requested.

## General development

Agents may implement scoped work such as:

- Pages, routes, React components, TypeScript, and JavaScript.
- Application and UI logic.
- Aethergrid lore, Spirits, protocol content, and static data.
- API routes, integrations, bug fixes, and tests.
- Accessible, responsive interaction improvements that preserve the visual system.

Before changing code:

1. Inspect the relevant implementation and its callers.
2. Make the smallest change that solves the requested problem.
3. Preserve unrelated behavior and files.
4. Run the relevant checks (at minimum lint or build when practical).
5. Report the result, known limitations, and files changed before requesting a commit.

Prefer extending the existing architecture over rewrites. Use Server Components by default; add `"use client"` only when browser-side state, effects, animations, wallet actions, or event handlers truly require it.

## Protected systems

The following systems are protected by default. Do not change them unless the user explicitly asks for that category of change.

### Web3 and blockchain

- Supported networks and chain IDs: Ethereum and Base, with Base as the preferred network.
- Wallet provider configuration and the `Web3Providers` architecture.
- wagmi, RainbowKit, viem, React Query, and existing connector configuration.
- Wallet connection and disconnection behavior, connection modals, and chain switching.
- Transaction, signing, payment, smart-contract, RPC, token, and x402 flows.
- Environment-variable names, secrets, API keys, RPC URLs, contract addresses, and production endpoints.

Never place secrets, private keys, seed phrases, wallet addresses intended to remain private, or access tokens in source control, client-side code, logs, examples, or documentation. Do not initiate transactions, switch a user's wallet network, sign messages, or create/update on-chain resources without the user's explicit, current approval.

### Visual system

Do not alter the established visual language unless explicitly requested. This includes:

- Cyan + violet core palette and design tokens in `src/app/globals.css`.
- Orbitron and Share Tech Mono typography.
- Cyberpunk/holographic language, glow treatment, grid, scanlines, and motion style.
- Tailwind styling conventions and shared UI/effect components.
- Site shell, header, ticker, navigation, and immersive layout behavior.

Functional UI changes are allowed when they preserve this system. Do not copy VΣLOHE pages wholesale; Aethergrid is a sister node with its own content and experience.

## Next.js, quality, and safety

- Follow the managed Next.js rules at the top of this file and current project conventions.
- Keep client/server boundaries explicit. Never import wallet or browser-only code into Server Components.
- Validate all external input at route and API boundaries.
- Avoid `any`, unsafe casts, unhandled promises, and silent error paths.
- Preserve metadata, keyboard access, focus states, reduced-motion behavior, and responsive layouts.
- Use `next/image`, `next/font`, and framework-native routing/data patterns where appropriate.
- Do not change dependencies, lockfiles, deployment configuration, or environment configuration unless the request requires it. Explain the reason and impact first.
- Do not delete user content, assets, routes, or configuration without explicit approval.

## If a request is unclear

Ask a concise question before making a decision that changes product behavior, blockchain behavior, architecture, public copy, deployment, or data. Protected systems are not permanently forbidden: when the user explicitly requests a change, implement it carefully while preserving compatibility and documenting the impact.