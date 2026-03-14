# Micro Mirror 2026 GitHub + Vercel Workflow Guide

## TL;DR

The target end state is:
- keep only `micro-mirror` as the active main repository
- bind Vercel directly to `https://github.com/uplinkira/micro-mirror`
- let pushes to `main` trigger production deployment automatically

Until that cutover is finished:
- `micro-mirror` stays the source of truth
- `micro-mirror-deploy` stays a release mirror and deployment archive

This file also absorbs the old `VERCEL_TOKEN` guide, so no separate token manual is needed.

## What Vercel Is Actually Doing

For this project, Vercel is not “running a big server” for us. It is mainly doing four things:

1. Git integration
- Vercel connects to the GitHub repository
- when you push to a connected branch, it starts a new deployment

2. Build and package
- Vercel takes the repository snapshot for that commit
- it runs the configured build or static export flow
- for the current Micro Mirror MVP, that is effectively a static front-end deployment

3. Preview vs production routing
- pushes on the production branch become production deployments
- pull requests and non-production branches can get preview deployments

4. Hosted delivery
- Vercel stores the deployment output and serves the site from its platform edge network
- for a static site like this, that means the HTML, CSS, JS, and assets can be delivered without us renting a separate traditional server first

In short:
- GitHub provides versioned source code
- Vercel turns a commit into a hosted deployment URL

## Why We Can Run It For Free Right Now

The current MVP is a very good fit for Vercel `Hobby` because:

- the app is mostly static HTML, CSS, and browser-side JavaScript
- camera access happens in the browser
- the wallet interaction is client-side
- there is no heavy always-on backend in this repository
- current expected traffic is hackathon-demo level rather than production-scale consumer traffic

That combination keeps the project light enough that the free plan is usually sufficient for:
- personal testing
- judge demos
- portfolio-style product preview

## Important Boundary: Why “Free” Does Not Mean “Unlimited”

According to Vercel's current plan documentation:
- `Hobby` is free
- `Hobby` is intended for personal, non-commercial use

So the reason this works without paying right now is:
- the app is lightweight
- the usage is still small
- the project is still at demo / prototype stage

It does not mean:
- the plan is appropriate forever
- the plan is the right choice for a commercial launch

## Current Free-Plan Limits That Matter To This Team

The exact quota table can change, so always re-check the official Vercel pricing pages before a high-stakes release. For planning purposes, the important practical limits are:

- `Hobby` is for personal, non-commercial use
- included usage is lower than paid plans
- collaboration, governance, and advanced security are more limited than on paid tiers
- once the project becomes a real product with multiple operators, more traffic, or revenue activity, `Pro` becomes the safer default

For this project, the biggest triggers are:
- multiple collaborators managing production together
- meaningful public traffic growth
- adding heavier backend functions or data services
- moving from hackathon / prototype status into real commercial operations

## How Vercel Charges When You Upgrade

At the time of writing, Vercel publicly lists:
- `Hobby`
  - free
- `Pro`
  - `$20` per user per month
  - plus additional usage beyond what is included in the plan
- `Enterprise`
  - custom pricing

This means the paid model is not just “one flat subscription forever”.

The cost structure is:
- a base team plan
- plus usage-based expansion when you exceed included resources on paid tiers

For Micro Mirror, the practical reading is:
- free is fine for the current static demo
- `Pro` is the expected next step for team collaboration and productization

## When This Team Should Upgrade To `Pro`

Upgrade when any of these become true:

- the project is no longer just a personal or hackathon prototype
- the team wants normal multi-person production collaboration
- the deployment starts representing an active commercial or quasi-commercial product
- you add server-side features that create sustained usage
- you need stronger logs, security controls, or operational guarantees

## Best 2026 Repository Strategy

The cleanest long-term setup is:
- one active repo: `micro-mirror`
- one production branch: `main`
- one Vercel project connected directly to that repo

Why this is better:
- no repo drift
- no manual sync step before each release
- cleaner issue tracking and commit history
- easier onboarding for future collaborators

## What “Single Main Repo Bound To Vercel” Means

In the target setup:
- `micro-mirror` becomes the only development repository
- Vercel connects directly to `uplinkira/micro-mirror`
- pushing to `main` creates the production deployment
- pull requests or feature branches can create preview deployments

Then `micro-mirror-deploy` becomes optional:
- archive it
- keep it read-only as historical release evidence
- delete it later after the team fully stabilizes the new workflow

## How To Move Vercel From `micro-mirror-deploy` To `micro-mirror`

There are two practical ways.

## Path A: Create A New Vercel Project From `micro-mirror`

This is the cleanest and lowest-risk path.

1. Open:
   - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
2. Log in to Vercel
3. Import the `micro-mirror` repository
4. Keep the root directory as `.`
5. Because this repo is a static site, default settings are usually enough
6. Click `Deploy`
7. After the first deploy, set:
   - Production Branch = `main`
8. Confirm that future pushes to `main` deploy automatically

Use this path if:
- you do not need to preserve the current Vercel project shell
- you want the simplest migration

## Path B: Rebind An Existing Vercel Project To `micro-mirror`

Use this if you want to keep the current Vercel project and swap the connected Git repository.

1. Open the existing Vercel project
2. Go to:
   - `Project Settings`
   - `Git`
3. Find the connected Git repository section
4. Change or reconnect the Git repository to:
   - `uplinkira/micro-mirror`
5. Confirm the production branch is:
   - `main`
6. Trigger a redeploy
7. Push a small test commit to `micro-mirror`
8. Verify that the deployment now comes from the main repo rather than `micro-mirror-deploy`

Use this path if:
- you want to preserve the same project shell, domain, or settings

## How To Verify The Rebinding Worked

After rebinding or creating the new project, check:
- the Vercel dashboard shows the connected repository as `uplinkira/micro-mirror`
- pushes to `main` in `micro-mirror` create production deployments
- non-production branches or pull requests create preview deployments
- the live page matches the latest commit from `micro-mirror`

## Fastest Path If You Only Need A `vercel.app`

Open:
- `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`

Then:
- log in
- import the repo
- click `Deploy`

## How To Get `VERCEL_TOKEN`

### Option A: Create An Access Token In The Vercel Dashboard

1. Log in to `https://vercel.com`
2. Open your account settings
3. Go to the token page
4. Create a new access token
5. Copy it immediately
6. Do not commit it to GitHub

### Option B: Browser Login Then CLI Login

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel login
```

Then follow the CLI prompts.

## How To Deploy With `VERCEL_TOKEN`

### Method 1: Environment Variable

```bash
export VERCEL_TOKEN="your_token_here"
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel --prod --token "$VERCEL_TOKEN"
```

### Method 2: Inline Token

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel --prod --token "your_token_here"
```

## How To Link A Local Repo To A Vercel Project With CLI

If the project already exists in Vercel and you want the local repo connected cleanly:

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel link
```

If you need to connect a Git repository through CLI-assisted flow:

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel git connect
```

## Recommended Release Steps

### Preferred Long-Term Release Flow

1. Update `micro-mirror`
2. Verify locally
3. Commit and push `micro-mirror`
4. Let Vercel deploy from `micro-mirror`

### Temporary Two-Repo Fallback

Use this only until the Vercel binding is fully moved.

1. Make sure `micro-mirror` is up to date

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
git pull
```

2. Sync to the deploy mirror

```bash
rsync -a --exclude '.git' --exclude 'node_modules' \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror/ \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy/
```

3. Push the deployment mirror

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy
git add .
git commit -m "deploy latest stable demo"
git push origin main
```

## Local Preview

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
python3 -m http.server 8000
```

Open:
- `http://127.0.0.1:8000`

On macOS:

```bash
open http://127.0.0.1:8000
```

## Final Recommendation

For the current demo stage:
- free Vercel deployment is acceptable because the app is lightweight and traffic is small

For the long-term product stage:
- the correct structure is one main repository bound directly to Vercel
- the likely plan tier is `Pro` once the project becomes collaborative or commercial

## One-Sentence Version

The best 2026 setup for Micro Mirror is: keep `micro-mirror` as the only active repo, bind Vercel directly to it, and treat `micro-mirror-deploy` as a temporary release archive rather than the long-term development home.
