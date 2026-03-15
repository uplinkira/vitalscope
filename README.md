# VitalScope

VitalScope is a health visualization product that turns daily face images and optional wearable signals into longitudinal wellness direction, recovery tracking, and action-oriented care planning.

## Maintainer

- `uplinkira`

This repository is the standalone long-term codebase for the product and is intended for continued solo development.

## Product Thesis

VitalScope starts from a simple habit:
- capture one face image per day
- keep those images on a comparable timeline
- turn visible change over time into a preventive wellness direction
- explain the result with both TCM-style framing and modern medical-style reporting

The long-term product path adds wearable inputs such as:
- HRV
- resting heart rate
- sleep recovery

That lets the product evolve from “health mirror” into a broader health visualization system.

## Current MVP

- daily camera capture or image upload fallback
- local timeline of daily records
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

## Product Role Of The Agent

In VitalScope, the agent is not only a text interface. It has three concrete jobs:

1. Observe
- read the image timeline
- combine sleep, stress, hydration, and optional wearable signals

2. Decide
- generate an actionable wellness direction
- present both intuitive and structured interpretations

3. Act
- move the user into subscription or hardware checkout
- accumulate trust and identity through `ERC-8004`

## Why GOAT / AgentKit Stays Central

VitalScope keeps building around the same infrastructure spine:

- `x402`
  - payment intent and settlement framing for the smart ring preorder path
- `x402-merchant`
  - merchant-side order and subscription operations
- `ERC-8004`
  - future-facing on-chain agent identity and trust layer
- `wallet`
  - browser wallet connectivity for the live demo

Generated assets that expose those integrations directly:
- `generated/agentkit-catalog.json`
- `generated/agentkit-demo.json`

## Repository Role

- Active repository:
  - `https://github.com/uplinkira/vitalscope.git`
- Hackathon snapshot / deploy archive:
  - `https://github.com/uplinkira/micro-mirror-deploy.git`

The archived `micro-mirror-deploy` repository preserves the March 14, 2026 Shenzhen hackathon snapshot. This repository is the continuation path.

## Repository Structure

- `index.html`
  - single-page static MVP
- `generated/`
  - generated AgentKit catalog and demo workflow assets
- `scripts/generate-agentkit-demo-assets.mjs`
  - refreshes AgentKit-derived demo assets
- `docs/pitch_vitalscope.md`
  - product summary, pitch script, and judge Q&A
- `docs/repo_deploy_workflow_2026.md`
  - GitHub, Vercel, token, pricing, and single-repo workflow guide

## Local Run

```bash
cd D+20260314+goat/vitalscope
python3 -m http.server 8000
```

Open:
- `http://127.0.0.1:8000`

To refresh the AgentKit demo assets:

```bash
cd D+20260314+goat/vitalscope
node scripts/generate-agentkit-demo-assets.mjs
```

## Medical Scope

VitalScope is a product prototype and should not be treated as a diagnostic system, a regulated medical device, or a substitute for professional medical advice.

## License

This repository is released under the `Apache-2.0` license.

Why this choice:
- commercial use is allowed
- private modification is allowed
- redistribution is allowed
- it includes an explicit patent grant, which is stronger than a bare-minimum permissive license for future product work

Important note:
- the `VitalScope` product name, branding, pitch framing, and other unlicensed trademarks remain reserved to their respective owners under the terms of `Apache-2.0`
