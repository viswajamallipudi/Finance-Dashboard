# AURA — Finance Dashboard

Built this as a personal finance tracker to understand where money goes. It's a frontend-only project — no backend, no install, just open and use.


## What's inside

**Dashboard**
- Balance, Income, Expenses and Savings Rate cards at the top
- Numbers count up smoothly every time something changes
- A small strip below showing your top spending category, how this month compares to last, and a tip based on your data

**Charts**
- Line chart tracking balance, income and expenses across months
- Donut chart showing spending split by category
- Both are interactive, animated and switch colors with the theme

**Transactions**
- Full list with date, description, category, type and amount
- Search works across name and category at the same time
- Filter by income or expense, filter by category, sort by date or amount
- Everything filters together live — no reloads

**Roles**
- Admin can add, edit and delete transactions
- Viewer gets read-only access — all action buttons disappear
- Switch between them from the sidebar instantly

**Insights**
- Monthly income vs expenses bar chart
- Category breakdown with fill bars showing percentage of total
- Observation cards that pull actual numbers — savings rate, spending direction, biggest transaction, etc.

---

## Extra stuff

- Dark and light mode, saved to localStorage
- All transactions persist across page refreshes
- One-click CSV export
- Animated background, floating particles, modal transitions
- Escape key closes any open modal

---

## Tech

- HTML, CSS, vanilla JS — no framework, no build step
- Chart.js from CDN for the charts
- Google Fonts — Syne for headings, Plus Jakarta Sans for body, JetBrains Mono for numbers

---

## Files

```
index.html  — layout, sections, modals
style.css   — themes, animations, all visual stuff
app.js      — state, logic, rendering, charts
```

---

## Why vanilla JS

Frameworks are great but I wanted to show the thinking behind state management without hiding it behind abstractions. There's one `state` object, one `renderAll()` call, and everything stays in sync. It's easier to follow and easier to explain.
