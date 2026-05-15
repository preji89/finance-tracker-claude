# Deploy to Staging

Run the full deploy pipeline: lint → build → push to staging.

## Steps

Execute these steps **in order**. Stop and report the failure if any step exits with a non-zero code — do not proceed to the next step.

### 1. Lint (tests)

```bash
npm run lint
```

Report any ESLint errors to the user. If there are errors, abort and ask the user to fix them before deploying.

### 2. Production build

```bash
npm run build
```

Confirm the `dist/` folder was produced. If the build fails, show the error output and abort.

### 3. Push to staging

Ensure a `staging` branch exists locally and push the current branch's build to it:

```bash
git push origin HEAD:staging
```

If the remote `staging` branch does not exist yet, create it with:

```bash
git push origin HEAD:staging --set-upstream
```

## Completion

After all three steps succeed, report:
- Lint: passed
- Build: succeeded (show the bundle size summary from Vite output)
- Staging: pushed (show the remote ref that was updated)
