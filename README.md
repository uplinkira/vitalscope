# Micro Mirror

Micro Mirror is a preventive wellness product prototype that turns a daily face photo into a longitudinal health direction signal, then extends that signal with smart ring data, agent identity, and GOAT-based payment flows.

## Team

- `uplinkira`
- `2` collaborating bioinformatics graduate researchers from the Chinese Academy of Sciences

This repository is the long-term product repository and source of truth for the project.

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

## Current MVP

- daily camera capture or image upload fallback
- local timeline of daily mirror records
- dual-reference report:
  - TCM-inspired interpretation
  - modern medical-style interpretation
- smart ring preorder flow
- GOAT Testnet3 payment flow with MetaMask
- `AgentKit Workflow Studio`
  - maps local `agentkit/` modules to product workflows
  - highlights `x402`, `x402-merchant`, `ERC-8004`, and `wallet`
- `ERC-8004 Agent Identity Lab`
  - generates sample agent metadata
  - registers an agent from the browser
  - reads linked wallet, reputation summary, and client list
- gamified demo layer:
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

This repository keeps the product direction close to the infrastructure that the team wants to keep building on:

- `x402`
  - payment intent and settlement framing for the smart ring preorder path
- `x402-merchant`
  - merchant-side order and subscription operations
- `ERC-8004`
  - future-facing on-chain agent identity and trust layer
- `wallet`
  - browser wallet connectivity for the live demo

The repository also includes generated assets that make those integrations visible instead of only described:
- `generated/agentkit-catalog.json`
- `generated/agentkit-demo.json`

## Repository Role

- Primary source repository:
  - `https://github.com/uplinkira/micro-mirror.git`
- Release and deployment mirror:
  - `https://github.com/uplinkira/micro-mirror-deploy.git`

The recommended long-term workflow is:
- develop in `micro-mirror`
- bind Vercel directly to `micro-mirror`
- keep `micro-mirror-deploy` only as a release archive while the migration finishes

The detailed migration guide lives in:
- `docs/repo_deploy_workflow_2026.md`

## Repository Structure

- `index.html`
  - single-page static MVP
- `generated/`
  - generated AgentKit catalog and demo workflow assets
- `scripts/generate-agentkit-demo-assets.mjs`
  - refreshes AgentKit-derived demo assets
- `docs/pitch_micro_mirror.md`
  - one-line summary, pitch script, and judge Q&A
- `docs/repo_deploy_workflow_2026.md`
  - GitHub, Vercel, token, pricing, and single-repo workflow guide

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

## Medical Scope

Micro Mirror is a product prototype and should not be treated as a diagnostic system, a regulated medical device, or a substitute for professional medical advice.

## License

This repository is released under the `Apache-2.0` license.

Why this choice:
- commercial use is allowed
- private modification is allowed
- redistribution is allowed
- it includes an explicit patent grant, which is stronger than a bare-minimum permissive license for future product work

Important note:
- the `Micro Mirror` product name, branding, pitch framing, and other unlicensed trademarks remain reserved to their respective owners under the terms of `Apache-2.0`
