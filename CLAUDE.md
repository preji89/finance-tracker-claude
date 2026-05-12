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

This is a single-page React app (Vite + React 19) with no routing or external state management. State is managed with `useState` and lifted to `App.jsx`, which passes data and callbacks down to child components.

**Component structure:**

- `src/App.jsx` — root component; owns `transactions` state and the `categories` constant; renders the three child components.
- `src/Summary.jsx` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally, and displays the summary cards.
- `src/TransactionForm.jsx` — owns its own form state (`description`, `amount`, `type`, `category`); receives `categories` and an `onAdd` callback; calls `onAdd` with the new transaction object on submit.
- `src/TransactionList.jsx` — receives `transactions` and `categories`; owns filter state (`filterType`, `filterCategory`) internally; renders the filtered transactions table.

**Data model — transaction object:**
```js
{ id, description, amount, type: "income"|"expense", category, date }
```

Categories are a fixed array defined in `App.jsx`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Styling:** flat CSS in `src/App.css`. Notable classes: `.income-amount` (green), `.expense-amount` (red), `.balance-amount`, `.delete-btn` (defined in CSS but the delete column is not yet rendered in the table).
