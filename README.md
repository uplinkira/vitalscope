# Micro Mirror

Micro Mirror is a preventive wellness prototype that turns a daily face photo into a longitudinal health direction signal, then connects that signal to an upgrade path that includes smart ring data, on-chain agent identity, and GOAT-based checkout.

## Why This Repo Exists

This project was created for the Shenzhen onsite hackathon sprint listed at:
- `https://luma.com/bwro4uva`

Based on the public event page, the sprint was hosted by `Sophia Li`, `GOAT Network`, and `OpenBuild`, framed as a high-intensity build session around `OpenClaw`, `GOAT`, `x402`, `ERC-8004`, and the `GOAT Bitcoin L2 Testnet`, with an onsite build window from `14:30` to `17:30` inside a four-hour event block.

Micro Mirror was taken from zero to a working MVP in Shenzhen within roughly that three-hour build window, in collaboration with two current bioinformatics graduate student co-authors from the Chinese Academy of Sciences. The result is intentionally scoped as a fast, demo-ready product thesis rather than a finished medical product.

## Product Thesis

Most people do not need more one-off health anxiety. They need a lightweight way to notice recovery drift early, compare change over time, and decide what to adjust next.

Micro Mirror starts with the smallest repeatable ritual:
- take one face photo per day
- keep the data on a timeline
- convert that timeline into a preventive health direction
- explain the result using both TCM-style framing and modern medical-style reporting

The upgrade path adds a smart ring so the product can combine visual signals with physiological signals such as:
- HRV
- resting heart rate
- sleep recovery

## What The MVP Includes

- Daily camera capture or image upload fallback
- Local timeline of daily mirror records
- Dual-reference report:
  - TCM-inspired interpretation
  - modern medical-style interpretation
- Smart ring preorder flow
- GOAT Testnet3 payment flow with MetaMask
- `AgentKit Workflow Studio`
  - maps local `agentkit/` modules to product workflows
  - highlights `x402`, `x402-merchant`, `ERC-8004`, and `wallet`
- `ERC-8004 Agent Identity Lab`
  - generates sample agent metadata
  - registers an agent from the browser
  - reads linked wallet, reputation summary, and client list
- Gamified presentation layer for demo clarity:
  - `Season`
  - `Rank`
  - `Quest XP`
  - `Quest Checkout Board`

## Why The Agent Matters

In Micro Mirror, the agent is not just a chatbot wrapper. It has a concrete job across three layers:

1. Observe
- read the image timeline
- combine sleep, stress, hydration, and optional ring signals

2. Decide
- generate an actionable preventive direction
- present the result in dual framing so the user can understand both intuition and structure

3. Act
- move the user into subscription or hardware checkout
- later accumulate trust and identity using `ERC-8004`

## Why GOAT / AgentKit Is Central

This repo was shaped to make the hackathon integration legible:

- `x402`
  - payment intent and settlement framing for the smart ring preorder path
- `x402-merchant`
  - merchant-side order and subscription operations
- `ERC-8004`
  - future-facing on-chain agent identity and trust layer
- `wallet`
  - browser wallet connectivity for the live demo

The repo also includes generated assets that make those integrations visible instead of only described:
- `generated/agentkit-catalog.json`
- `generated/agentkit-demo.json`

## Repository Structure

- `index.html`
  - single-page static MVP
- `generated/`
  - generated AgentKit catalog and demo workflow assets
- `scripts/generate-agentkit-demo-assets.mjs`
  - refreshes AgentKit-derived demo assets
- `docs/pitch_micro_mirror.md`
  - one-line summary and pitch script
- `docs/repo_deploy_workflow_2026.md`
  - GitHub, Vercel, token, and single-repo migration guide

## Local Run

```bash
cd D+20260314+goat/micro-mirror
python3 -m http.server 8000
```

Open:
- `http://127.0.0.1:8000`

To refresh the AgentKit demo assets:

```bash
cd D+20260314+goat/micro-mirror
node scripts/generate-agentkit-demo-assets.mjs
```

## GitHub And Deployment

- Primary source repository:
  - `https://github.com/uplinkira/micro-mirror.git`
- Current Vercel-connected mirror repository:
  - `https://github.com/uplinkira/micro-mirror-deploy.git`

For the current hackathon phase, the recommended workflow is:
- develop in `micro-mirror`
- push stable snapshots to `micro-mirror-deploy` when you want to refresh production

The detailed migration path for moving to a single Vercel-bound main repo is documented in:
- `docs/repo_deploy_workflow_2026.md`

## Submission Context

This repo was prepared as a hackathon delivery repository aligned with:
- `D+20260314+goat/1+requirement.md`

Final submission entry referenced there:
- `https://julieshi.notion.site/8b33110376804173b6ce1c95ee4a25c6`

## Medical Scope

Micro Mirror is a hackathon MVP and should not be treated as a diagnostic system, a regulated medical device, or a substitute for professional medical advice.

## License

This repository is released under the `Apache-2.0` license.

Why this choice:
- commercial use is allowed
- private modification is allowed
- redistribution is allowed
- it includes an explicit patent grant, which is stronger than a bare-minimum permissive license for future product work

Important note:
- the `Micro Mirror` product name, branding, pitch framing, and other unlicensed trademarks remain reserved to their respective owners under the terms of `Apache-2.0`

## Collaboration Note

This repository documents a zero-to-one hackathon build. It should be read as an early product prototype, a research-inspired design direction, and a commercialization starting point developed under severe time constraints rather than a final production system.
