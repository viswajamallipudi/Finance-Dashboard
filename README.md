# AURA Finance Dashboard

A clean, interactive finance dashboard built with vanilla HTML, CSS, and JavaScript.

## Setup

```bash
# No build step required — just open in browser
open index.html
```

Or serve with any static server:
```bash
npx serve .
```

## Features

### Core
| Feature | Details |
|---|---|
| **Dashboard Overview** | Summary cards (Balance, Income, Expenses, Savings Rate) with count-up animation |
| **Time Visualization** | Multi-line chart (Balance Trend, Income, Expenses by month) |
| **Category Visualization** | Donut chart of spending breakdown by category |
| **Transactions Section** | Full table with search, type filter, category filter, sort |
| **Role-Based UI** | Admin (CRUD access) / Viewer (read-only) toggle |
| **Insights Section** | Monthly bar chart, category breakdown bars, 6 observation cards |
| **State Management** | Vanilla JS state object + localStorage persistence |

### Optional Enhancements
- 🌙 **Dark / Light mode** toggle with theme persistence
- 💾 **Data persistence** via `localStorage`
- 📤 **CSV export** of all transactions
- ✨ **Animations**: aurora background, floating particles, card slide-ins, count-up numbers, modal bounce, chart transitions
- 🔍 **Advanced filtering**: search + type + category + sort combined

## Tech Stack
- **HTML5** — semantic markup
- **CSS3** — custom properties, glassmorphism, keyframe animations
- **JavaScript (ES2020)** — vanilla, no frameworks
- **Chart.js** (CDN) — line, donut, bar charts
- **Google Fonts**: Syne (headings), Plus Jakarta Sans (body), JetBrains Mono (numbers)

## Structure
```
finance/
├── index.html   # App shell + modals
├── style.css    # All styles
├── app.js       # All logic
└── README.md
```

## Role Behavior
| Action | Admin | Viewer |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
