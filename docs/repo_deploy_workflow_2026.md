# Micro Mirror 2026 GitHub + Vercel Workflow Guide

## TL;DR

If you want the most stable hackathon workflow right now:
- keep `micro-mirror` as the main development repository
- keep `micro-mirror-deploy` as the production mirror
- only sync to `micro-mirror-deploy` when you want to refresh the live Vercel demo

If you want the cleaner long-term 2026 setup:
- keep only `micro-mirror`
- bind Vercel directly to `micro-mirror`
- let pushes to `main` trigger production deployment automatically

This file now also includes the old `VERCEL_TOKEN` guide, so you do not need a separate `vercel_token_guide.md`.

## Current Recommended Mode For This Team

### Why not only edit the Vercel repo

Do not use `micro-mirror-deploy` as the main coding repo.

If you only edit the deployment repo:
- Vercel updates
- but your real source history drifts
- future development becomes confusing

The safest current rule is:
- `micro-mirror` = source of truth
- `micro-mirror-deploy` = release mirror

### Current Best Practice

Daily development:
1. edit `micro-mirror`
2. verify locally
3. commit and push `micro-mirror`

When you want a live demo refresh:
1. sync `micro-mirror` into `micro-mirror-deploy`
2. commit and push `micro-mirror-deploy`
3. wait for Vercel auto-deploy

## What “Single Main Repo Bound To Vercel” Means

In the cleaner long-term setup:
- `micro-mirror` becomes the only active repo
- Vercel connects directly to `https://github.com/uplinkira/micro-mirror`
- `main` becomes the production branch
- future pushes to `main` deploy automatically
- pull requests can produce preview deployments

This is the 2026-default pattern because it reduces:
- repo drift
- manual sync work
- release mistakes

## How To Move Vercel From `micro-mirror-deploy` To `micro-mirror`

There are two practical ways.

## Path A: Create a New Vercel Project From `micro-mirror`

This is the cleanest and safest path.

1. Open:
   - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
2. Log in to Vercel
3. Import the `micro-mirror` repository
4. Keep the root directory as `.`
5. Because this repo is a static site, most cases can keep default settings
6. Deploy
7. After the first deploy, set:
   - Production Branch = `main`
8. Confirm that future pushes to `main` deploy automatically

Use this path if:
- you do not care about preserving the old Vercel project identity
- you want the simplest migration with the lowest risk

## Path B: Rebind an Existing Vercel Project To `micro-mirror`

Use this if you want to keep the existing Vercel project and just change the connected Git repository.

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
- you want to preserve the same Vercel project shell
- you want to keep the existing domain and project settings with minimal disruption

## After The Switch

Once Vercel is directly bound to `micro-mirror`, your new rule should be:
- only develop in `micro-mirror`
- stop treating `micro-mirror-deploy` as active

Then choose one of these cleanup options:
- archive `micro-mirror-deploy`
- leave it read-only as a historical release mirror
- delete it later after the team is comfortable

## How To Verify The Repo Binding Worked

After rebinding or creating the new project, check:
- the Vercel dashboard shows the connected repository as `uplinkira/micro-mirror`
- pushes to `main` in `micro-mirror` create production deployments
- pull requests or non-production branches create preview deployments
- the live page matches the latest commit from `micro-mirror`

## Vercel Token Guide, Merged Here

## Fastest Path If You Just Need A `vercel.app`

Open:
- `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`

Then:
- log in
- import the repo
- click `Deploy`

## How To Get `VERCEL_TOKEN`

### Option A: Create an Access Token in the Vercel Dashboard

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

## Recommended Production Release Steps

1. Make sure `micro-mirror` is up to date

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
git pull
```

2. Deploy with token

```bash
./node_modules/.bin/vercel --prod --token "$VERCEL_TOKEN"
```

3. If the CLI asks:
- `Set up and deploy?` choose `Y`
- choose the correct personal scope or team
- if it asks whether to link to an existing project, choose according to your current setup
- keep the root directory as `.`

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

## Current Repo Commands

### Main Repo Development

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
git add .
git commit -m "your update"
git push origin main
```

### Sync To Deploy Mirror

```bash
rsync -a --exclude '.git' --exclude 'node_modules' \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror/ \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy/
```

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy
git add .
git commit -m "deploy latest stable demo"
git push origin main
```

## When It Is Acceptable To Patch The Deploy Repo Directly

Only in an emergency:
- you are minutes away from a live demo
- the fix is extremely small
- you truly cannot wait

If that happens:
- patch `micro-mirror-deploy`
- deploy
- immediately back-port the same change to `micro-mirror`

Otherwise drift is guaranteed.

## Final Recommendation

Short term:
- keep the current dual-repo setup because it is already working

Medium term:
- stop adding independent edits to the deploy mirror

Long term:
- bind Vercel directly to `micro-mirror`
- archive `micro-mirror-deploy`

## One-Sentence Version

The best 2026 setup for this project is not “edit the Vercel repo forever”, but “move Vercel to the main `micro-mirror` repository and let that repository become the single source of truth.”
