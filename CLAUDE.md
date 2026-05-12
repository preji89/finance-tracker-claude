# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # run ESLint
```

There is no test suite configured.

## Architecture

This is a single-page React app (Vite + React 19) with all logic in `src/App.jsx`. There are no sub-components, routing, or external state management — everything lives in one component using `useState`.

**Known bug in the starter code:** `amount` is stored as a string in state (the `<input type="number">` value is never parsed), so arithmetic on `totalIncome`, `totalExpenses`, and `balance` uses string concatenation instead of addition. Fix: parse to `Number` or `parseFloat` when creating a new transaction or when seeding the initial data.

**Data model — transaction object:**
```js
{ id, description, amount, type: "income"|"expense", category, date }
```

Categories are a fixed array: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Styling:** flat CSS in `src/App.css`. Notable classes: `.income-amount` (green), `.expense-amount` (red), `.balance-amount`, `.delete-btn` (defined in CSS but the delete column is not yet rendered in the table).
