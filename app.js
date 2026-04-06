/* ═══════════════════════════════════════════
   AURA Finance Dashboard — Application Logic
   ═══════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

const state = {
  transactions: [],
  role:  'admin',
  theme: 'dark',
};

// ─────────────────────────────────────────────
// MOCK DATA  (30 transactions across Jan–Apr 2026)
// ─────────────────────────────────────────────

const MOCK = [
  { id: 1,  description: 'Monthly Salary',          amount: 4500, type: 'income',  category: 'Salary',          date: '2026-04-01' },
  { id: 2,  description: 'Freelance Design Project', amount: 1200, type: 'income',  category: 'Freelance',        date: '2026-04-03' },
  { id: 3,  description: 'Monthly Rent',             amount: 1400, type: 'expense', category: 'Housing',          date: '2026-04-02' },
  { id: 4,  description: 'Grocery Shopping',         amount: 185,  type: 'expense', category: 'Food & Dining',    date: '2026-04-04' },
  { id: 5,  description: 'Netflix Subscription',     amount: 18,   type: 'expense', category: 'Entertainment',    date: '2026-04-04' },
  { id: 6,  description: 'Uber Ride',                amount: 32,   type: 'expense', category: 'Transportation',   date: '2026-04-05' },
  { id: 7,  description: 'Doctor Appointment',       amount: 130,  type: 'expense', category: 'Healthcare',       date: '2026-04-05' },
  { id: 8,  description: 'Amazon Shopping',          amount: 95,   type: 'expense', category: 'Shopping',         date: '2026-04-06' },
  { id: 9,  description: 'Electric Bill',            amount: 98,   type: 'expense', category: 'Utilities',        date: '2026-03-30' },
  { id: 10, description: 'Stock Dividend',           amount: 340,  type: 'income',  category: 'Investments',      date: '2026-03-28' },
  { id: 11, description: 'Monthly Salary',           amount: 4500, type: 'income',  category: 'Salary',           date: '2026-03-01' },
  { id: 12, description: 'Monthly Rent',             amount: 1400, type: 'expense', category: 'Housing',          date: '2026-03-02' },
  { id: 13, description: 'Restaurant Dinner',        amount: 78,   type: 'expense', category: 'Food & Dining',    date: '2026-03-10' },
  { id: 14, description: 'Gym Membership',           amount: 55,   type: 'expense', category: 'Healthcare',       date: '2026-03-01' },
  { id: 15, description: 'Concert Tickets',          amount: 130,  type: 'expense', category: 'Entertainment',    date: '2026-03-15' },
  { id: 16, description: 'Freelance Article Writing',amount: 450,  type: 'income',  category: 'Freelance',        date: '2026-03-20' },
  { id: 17, description: 'Internet Bill',            amount: 68,   type: 'expense', category: 'Utilities',        date: '2026-03-05' },
  { id: 18, description: 'New Shoes',                amount: 115,  type: 'expense', category: 'Shopping',         date: '2026-03-18' },
  { id: 19, description: 'Monthly Salary',           amount: 4500, type: 'income',  category: 'Salary',           date: '2026-02-01' },
  { id: 20, description: 'Monthly Rent',             amount: 1400, type: 'expense', category: 'Housing',          date: '2026-02-02' },
  { id: 21, description: 'Grocery Shopping',         amount: 215,  type: 'expense', category: 'Food & Dining',    date: '2026-02-08' },
  { id: 22, description: 'Car Service',              amount: 265,  type: 'expense', category: 'Transportation',   date: '2026-02-12' },
  { id: 23, description: 'Investment Return',        amount: 620,  type: 'income',  category: 'Investments',      date: '2026-02-20' },
  { id: 24, description: 'Pharmacy',                 amount: 48,   type: 'expense', category: 'Healthcare',       date: '2026-02-15' },
  { id: 25, description: 'Spotify Premium',          amount: 10,   type: 'expense', category: 'Entertainment',    date: '2026-02-01' },
  { id: 26, description: 'Monthly Salary',           amount: 4500, type: 'income',  category: 'Salary',           date: '2026-01-01' },
  { id: 27, description: 'Monthly Rent',             amount: 1400, type: 'expense', category: 'Housing',          date: '2026-01-02' },
  { id: 28, description: "New Year's Dinner",        amount: 190,  type: 'expense', category: 'Food & Dining',    date: '2026-01-01' },
  { id: 29, description: 'Tax Refund',               amount: 800,  type: 'income',  category: 'Other',            date: '2026-01-15' },
  { id: 30, description: 'Winter Clothes',           amount: 320,  type: 'expense', category: 'Shopping',         date: '2026-01-20' },
];

// ─────────────────────────────────────────────
// COLOURS & EMOJIS
// ─────────────────────────────────────────────

const CAT_COLORS = {
  'Salary':        '#6366F1',
  'Freelance':     '#06B6D4',
  'Investments':   '#8B5CF6',
  'Food & Dining': '#F59E0B',
  'Housing':       '#EF4444',
  'Transportation':'#10B981',
  'Entertainment': '#EC4899',
  'Shopping':      '#F97316',
  'Healthcare':    '#14B8A6',
  'Utilities':     '#64748B',
  'Other':         '#94A3B8',
};

const CAT_EMOJI = {
  'Salary':        '💼',
  'Freelance':     '🖥️',
  'Investments':   '📈',
  'Food & Dining': '🍽️',
  'Housing':       '🏠',
  'Transportation':'🚗',
  'Entertainment': '🎬',
  'Shopping':      '🛍️',
  'Healthcare':    '🏥',
  'Utilities':     '⚡',
  'Other':         '📋',
};

// ─────────────────────────────────────────────
// CHART INSTANCES
// ─────────────────────────────────────────────

let lineChart  = null;
let donutChart = null;
let barChart   = null;

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

function init() {
  const savedTx    = localStorage.getItem('aura_tx');
  const savedTheme = localStorage.getItem('aura_theme');
  const savedRole  = localStorage.getItem('aura_role');

  state.transactions = savedTx ? JSON.parse(savedTx) : [...MOCK];
  state.theme        = savedTheme || 'dark';
  state.role         = savedRole  || 'admin';

  applyTheme();
  applyRole();
  populateCategoryFilter();
  setupParticles();
  setupEventListeners();
  renderAll();

  // default date in add form
  document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
}

// ─────────────────────────────────────────────
// PERSIST
// ─────────────────────────────────────────────

function save() {
  localStorage.setItem('aura_tx', JSON.stringify(state.transactions));
}

// ─────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────

function setupEventListeners() {
  // Nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.section));
  });

  // Role
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.role = btn.dataset.role;
      localStorage.setItem('aura_role', state.role);
      applyRole();
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Switched to ${state.role === 'admin' ? '🔑 Admin' : '👁️ Viewer'} mode`, 'success');
    });
  });

  // Theme
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // Add buttons
  document.getElementById('addBtn').addEventListener('click',  openAddModal);
  document.getElementById('addBtn2').addEventListener('click', openAddModal);

  // Modal closes
  document.getElementById('modalClose').addEventListener('click',     closeAddModal);
  document.getElementById('editModalClose').addEventListener('click', closeEditModal);
  document.getElementById('modalOverlay').addEventListener('click',     e => { if (e.target.id === 'modalOverlay')     closeAddModal(); });
  document.getElementById('editModalOverlay').addEventListener('click', e => { if (e.target.id === 'editModalOverlay') closeEditModal(); });

  // Forms
  document.getElementById('transactionForm').addEventListener('submit',     handleAdd);
  document.getElementById('editTransactionForm').addEventListener('submit', handleEdit);

  // Filters / search
  ['searchInput','typeFilter','categoryFilter','sortBy'].forEach(id => {
    document.getElementById(id).addEventListener('input',  renderTransactions);
    document.getElementById(id).addEventListener('change', renderTransactions);
  });

  // Export
  document.getElementById('exportBtn').addEventListener('click', exportCSV);

  // Mobile menu
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Keyboard Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAddModal(); closeEditModal(); }
  });
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

function navigateTo(name) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.section === name));
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === `section-${name}`));

  if (name === 'insights') {
    setTimeout(renderInsightsCharts, 80);
  }

  // close mobile sidebar on nav
  document.getElementById('sidebar').classList.remove('open');
}

// ─────────────────────────────────────────────
// ROLE
// ─────────────────────────────────────────────

function applyRole() {
  document.getElementById('app').classList.toggle('viewer-mode', state.role === 'viewer');
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === state.role));
}

// ─────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = state.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

  // Update Chart.js defaults to match theme
  const textColor = state.theme === 'dark' ? '#94A3B8' : '#4B5563';
  Chart.defaults.color = textColor;
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('aura_theme', state.theme);
  applyTheme();
  renderCharts(); // redraw with updated colours
}

// ─────────────────────────────────────────────
// RENDER ALL
// ─────────────────────────────────────────────

function renderAll() {
  renderStats();
  renderCharts();
  renderTransactions();
  renderQuickInsights();
  renderInsightsPage();
}

// ─────────────────────────────────────────────
// STATS (count-up animation)
// ─────────────────────────────────────────────

function renderStats() {
  const income  = sum(state.transactions, 'income');
  const expense = sum(state.transactions, 'expense');
  const balance = income - expense;
  const rate    = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  countUp('balanceVal',  balance, true);
  countUp('incomeVal',   income,  true);
  countUp('expenseVal',  expense, true);
  countUp('savingsVal',  rate,    false, '%');

  const chip = document.getElementById('savingsChip');
  if (chip) {
    chip.textContent = `${rate >= 0 ? '+' : ''}${rate}% saved`;
    chip.className   = `stat-change ${rate >= 0 ? 'positive' : 'negative'}`;
  }
}

function sum(txs, type) {
  return txs.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0);
}

function countUp(id, target, currency = false, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;

  const duration  = 900;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = target * ease;

    el.textContent = currency
      ? `$${Math.round(current).toLocaleString()}`
      : `${Math.round(current)}${suffix}`;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────
// CHARTS
// ─────────────────────────────────────────────

const MONTHS     = ['Jan', 'Feb', 'Mar', 'Apr'];
const MONTH_KEYS = ['2026-01', '2026-02', '2026-03', '2026-04'];

function chartDefaults() {
  const isDark = state.theme === 'dark';
  return {
    gridColor:    isDark ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.1)',
    tickColor:    isDark ? '#64748B' : '#9CA3AF',
    tooltipBg:    isDark ? '#0d1230' : '#fff',
    tooltipTitle: isDark ? '#E2E8F0' : '#1E1B4B',
    tooltipBody:  isDark ? '#94A3B8' : '#4B5563',
  };
}

function renderCharts() {
  renderLineChart();
  renderDonutChart();
}

function renderLineChart() {
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;

  const d = chartDefaults();

  const mkData = type => MONTH_KEYS.map(m =>
    state.transactions
      .filter(t => t.type === type && t.date.startsWith(m))
      .reduce((s, t) => s + t.amount, 0)
  );

  const income  = mkData('income');
  const expense = mkData('expense');
  const balance = income.map((v, i) => v - expense[i]);

  if (lineChart) lineChart.destroy();

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Balance',
          data: balance,
          borderColor: '#6366F1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          fill: true,
          tension: 0.45,
          borderWidth: 2.5,
          pointBackgroundColor: '#6366F1',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Income',
          data: income,
          borderColor: '#10B981',
          backgroundColor: 'transparent',
          tension: 0.45,
          borderWidth: 2,
          borderDash: [6, 4],
          pointBackgroundColor: '#10B981',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Expenses',
          data: expense,
          borderColor: '#F43F5E',
          backgroundColor: 'transparent',
          tension: 0.45,
          borderWidth: 2,
          borderDash: [6, 4],
          pointBackgroundColor: '#F43F5E',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          labels: {
            color: d.tickColor,
            font: { family: 'Plus Jakarta Sans', size: 12 },
            boxWidth: 14,
            boxHeight: 2,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: d.tooltipBg,
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          titleColor: d.tooltipTitle,
          bodyColor: d.tooltipBody,
          padding: 14,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: d.gridColor },
          ticks: { color: d.tickColor, font: { family: 'Plus Jakarta Sans', size: 12 } },
        },
        y: {
          grid: { color: d.gridColor },
          ticks: {
            color: d.tickColor,
            font: { family: 'JetBrains Mono', size: 11 },
            callback: v => `$${v.toLocaleString()}`,
          },
        },
      },
    },
  });
}

function renderDonutChart() {
  const ctx = document.getElementById('donutChart');
  if (!ctx) return;

  const d = chartDefaults();
  const cats = categoryTotals('expense');
  const top  = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 7);
  const borderBg = state.theme === 'dark' ? '#05091A' : '#F0F2FF';

  if (donutChart) donutChart.destroy();

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: top.map(([c]) => c),
      datasets: [{
        data: top.map(([, v]) => v),
        backgroundColor: top.map(([c]) => CAT_COLORS[c] || '#6366F1'),
        borderColor: borderBg,
        borderWidth: 3,
        hoverOffset: 10,
      }],
    },
    options: {
      responsive: true,
      cutout: '68%',
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: d.tickColor,
            font: { family: 'Plus Jakarta Sans', size: 11 },
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
          },
        },
        tooltip: {
          backgroundColor: d.tooltipBg,
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          titleColor: d.tooltipTitle,
          bodyColor: d.tooltipBody,
          padding: 14,
          callbacks: {
            label: ctx => ` $${ctx.parsed.toLocaleString()}`,
          },
        },
      },
    },
  });
}

// ─────────────────────────────────────────────
// QUICK INSIGHTS (Dashboard)
// ─────────────────────────────────────────────

function renderQuickInsights() {
  const cats     = categoryTotals('expense');
  const top      = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
  const income   = sum(state.transactions, 'income');
  const expense  = sum(state.transactions, 'expense');
  const savings  = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  // This month vs last
  const thisMo  = monthExpense('2026-04');
  const lastMo  = monthExpense('2026-03');
  const pct     = lastMo > 0 ? ((thisMo - lastMo) / lastMo * 100).toFixed(1) : null;

  setText('topCategory',   top ? `${CAT_EMOJI[top[0]] || '📋'} ${top[0]} — $${top[1].toLocaleString()}` : '—');

  const changeEl = document.getElementById('monthlyChange');
  if (changeEl) {
    if (pct !== null) {
      changeEl.textContent = `${pct > 0 ? '+' : ''}${pct}% vs last month`;
      changeEl.style.color = pct > 0 ? '#F43F5E' : '#10B981';
    } else {
      changeEl.textContent = 'No prior month data';
      changeEl.style.color = '';
    }
  }

  const tips = [
    savings < 10  ? `Your savings rate is ${savings}%. Try to reach 20%.` : null,
    savings >= 20 ? `Great! You're saving ${savings}% of your income.`    : null,
    top           ? `Consider trimming ${top[0]} spend.`                   : null,
    `${state.transactions.filter(t => t.type === 'income').length} income sources recorded.`,
  ].filter(Boolean);

  setText('smartTip', tips[Math.floor(Math.random() * tips.length)] || 'Keep tracking!');
}

function monthExpense(key) {
  return state.transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(key))
    .reduce((s, t) => s + t.amount, 0);
}

// ─────────────────────────────────────────────
// TRANSACTIONS
// ─────────────────────────────────────────────

function populateCategoryFilter() {
  const sel   = document.getElementById('categoryFilter');
  const cats  = [...new Set(MOCK.map(t => t.category))].sort();
  cats.forEach(c => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = `${CAT_EMOJI[c] || '📋'} ${c}`;
    sel.appendChild(o);
  });
}

function getFiltered() {
  const search  = document.getElementById('searchInput').value.toLowerCase().trim();
  const type    = document.getElementById('typeFilter').value;
  const cat     = document.getElementById('categoryFilter').value;
  const sort    = document.getElementById('sortBy').value;

  let list = [...state.transactions];

  if (search) list = list.filter(t =>
    t.description.toLowerCase().includes(search) ||
    t.category.toLowerCase().includes(search)
  );
  if (type) list = list.filter(t => t.type === type);
  if (cat)  list = list.filter(t => t.category === cat);

  list.sort((a, b) => {
    switch (sort) {
      case 'date-asc':    return new Date(a.date) - new Date(b.date);
      case 'amount-desc': return b.amount - a.amount;
      case 'amount-asc':  return a.amount - b.amount;
      default:            return new Date(b.date) - new Date(a.date);
    }
  });

  return list;
}

function renderTransactions() {
  const tbody = document.getElementById('transactionsBody');
  if (!tbody) return;

  const list = getFiltered();

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="6">
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>No transactions match your filters.</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((t, i) => `
    <tr style="animation: fadeSlideIn 0.3s var(--ease) ${i * 0.03}s both">
      <td><span class="tx-date">${fmtDate(t.date)}</span></td>
      <td><span class="tx-desc">${esc(t.description)}</span></td>
      <td>
        <span class="cat-badge" style="background:${CAT_COLORS[t.category] || '#6366F1'}22;color:${CAT_COLORS[t.category] || '#6366F1'}">
          ${CAT_EMOJI[t.category] || '📋'} ${t.category}
        </span>
      </td>
      <td><span class="type-badge ${t.type}">${t.type}</span></td>
      <td><span class="tx-amount ${t.type}">${t.type === 'income' ? '+' : '−'}$${t.amount.toLocaleString()}</span></td>
      <td class="tx-actions admin-only">
        <button class="btn btn-sm btn-edit"   onclick="openEditModal(${t.id})">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTx(${t.id})">🗑️</button>
      </td>
    </tr>
  `).join('');
}

function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function esc(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ─────────────────────────────────────────────
// ADD
// ─────────────────────────────────────────────

function openAddModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('transactionForm').reset();
  document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
}

function closeAddModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleAdd(e) {
  e.preventDefault();

  const desc   = document.getElementById('formDesc').value.trim();
  const amount = parseFloat(document.getElementById('formAmount').value);
  const type   = document.getElementById('formType').value;
  const cat    = document.getElementById('formCategory').value.replace(/^[^ ]+ /, '');
  const date   = document.getElementById('formDate').value;

  if (!desc || !amount || !date) return;

  state.transactions.unshift({ id: Date.now(), description: desc, amount, type, category: cat, date });
  save();
  closeAddModal();
  renderAll();
  showToast('✅ Transaction added!', 'success');
}

// ─────────────────────────────────────────────
// EDIT
// ─────────────────────────────────────────────

function openEditModal(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;

  document.getElementById('editFormId').value       = tx.id;
  document.getElementById('editFormDesc').value     = tx.description;
  document.getElementById('editFormAmount').value   = tx.amount;
  document.getElementById('editFormType').value     = tx.type;
  document.getElementById('editFormCategory').value = tx.category;
  document.getElementById('editFormDate').value     = tx.date;

  document.getElementById('editModalOverlay').classList.add('open');
}

function closeEditModal() {
  document.getElementById('editModalOverlay').classList.remove('open');
}

function handleEdit(e) {
  e.preventDefault();

  const id  = parseInt(document.getElementById('editFormId').value);
  const idx = state.transactions.findIndex(t => t.id === id);
  if (idx === -1) return;

  const cat = document.getElementById('editFormCategory').value.replace(/^[^ ]+ /, '');

  state.transactions[idx] = {
    ...state.transactions[idx],
    description: document.getElementById('editFormDesc').value.trim(),
    amount:      parseFloat(document.getElementById('editFormAmount').value),
    type:        document.getElementById('editFormType').value,
    category:    cat,
    date:        document.getElementById('editFormDate').value,
  };

  save();
  closeEditModal();
  renderAll();
  showToast('✏️ Transaction updated!', 'success');
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────

function deleteTx(id) {
  if (!confirm('Delete this transaction?')) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  save();
  renderAll();
  showToast('🗑️ Transaction deleted.', 'error');
}

// ─────────────────────────────────────────────
// INSIGHTS PAGE
// ─────────────────────────────────────────────

function renderInsightsPage() {
  renderCategoryList();
  renderObservations();
}

function renderInsightsCharts() {
  renderBarChart();
}

function renderBarChart() {
  const ctx = document.getElementById('barChart');
  if (!ctx) return;

  const d = chartDefaults();

  const income  = MONTH_KEYS.map(m => state.transactions.filter(t => t.type === 'income'  && t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0));
  const expense = MONTH_KEYS.map(m => state.transactions.filter(t => t.type === 'expense' && t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0));

  if (barChart) barChart.destroy();

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Income',   data: income,  backgroundColor: 'rgba(16,185,129,0.82)',  borderRadius: 8, borderSkipped: false },
        { label: 'Expenses', data: expense, backgroundColor: 'rgba(244,63,94,0.82)',   borderRadius: 8, borderSkipped: false },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          labels: { color: d.tickColor, font: { family: 'Plus Jakarta Sans', size: 12 }, boxWidth: 14 },
        },
        tooltip: {
          backgroundColor: d.tooltipBg,
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          titleColor: d.tooltipTitle,
          bodyColor: d.tooltipBody,
          padding: 14,
          callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()}` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: d.tickColor, font: { family: 'Plus Jakarta Sans', size: 12 } },
        },
        y: {
          grid: { color: d.gridColor },
          ticks: {
            color: d.tickColor,
            font: { family: 'JetBrains Mono', size: 11 },
            callback: v => `$${v.toLocaleString()}`,
          },
        },
      },
    },
  });
}

function renderCategoryList() {
  const el = document.getElementById('categoryList');
  if (!el) return;

  const cats  = categoryTotals('expense');
  const total = Object.values(cats).reduce((s, v) => s + v, 0);
  const list  = Object.entries(cats).sort((a, b) => b[1] - a[1]);

  if (list.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:14px;padding:20px 0">No expense data yet.</p>';
    return;
  }

  el.innerHTML = list.map(([cat, amount]) => `
    <div class="category-item">
      <div class="cat-dot" style="background:${CAT_COLORS[cat] || '#6366F1'}"></div>
      <span class="cat-name">${CAT_EMOJI[cat] || '📋'} ${cat}</span>
      <div class="cat-bar-wrap">
        <div class="cat-bar" style="width:${(amount / total * 100).toFixed(0)}%;background:${CAT_COLORS[cat] || '#6366F1'}"></div>
      </div>
      <span class="cat-amount" style="color:${CAT_COLORS[cat] || '#6366F1'}">$${amount.toLocaleString()}</span>
    </div>
  `).join('');
}

function renderObservations() {
  const el = document.getElementById('observationsGrid');
  if (!el) return;

  const income   = sum(state.transactions, 'income');
  const expense  = sum(state.transactions, 'expense');
  const balance  = income - expense;
  const savings  = income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0;

  const thisMo   = monthExpense('2026-04');
  const lastMo   = monthExpense('2026-03');
  const trend    = lastMo > 0 ? ((thisMo - lastMo) / lastMo * 100).toFixed(1) : null;

  const maxIncome  = state.transactions.filter(t => t.type === 'income') .sort((a, b) => b.amount - a.amount)[0];
  const maxExpense = state.transactions.filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount)[0];

  const months = [...new Set(state.transactions.map(t => t.date.slice(0, 7)))].length;

  const cards = [
    {
      icon: '🎯',
      title: 'Savings Rate',
      text: +savings >= 20
        ? `Excellent! You're saving ${savings}% of your income — above the recommended 20% benchmark.`
        : `You're saving ${savings}% of income. Aim for 20%+ by reviewing discretionary spending.`,
    },
    {
      icon: '📉',
      title: 'Spending Trend',
      text: trend === null
        ? 'Not enough data to compare months yet.'
        : +trend <= 0
          ? `Spending dropped ${Math.abs(trend)}% vs last month. Excellent discipline!`
          : `Spending rose ${trend}% vs last month. Review your recent expenses.`,
    },
    {
      icon: '⚖️',
      title: 'Income vs Expenses',
      text: balance >= 0
        ? `Positive net balance of $${balance.toLocaleString()}. You're living within your means.`
        : `Negative balance of $${Math.abs(balance).toLocaleString()}. Reduce expenses urgently.`,
    },
    {
      icon: '📅',
      title: 'Data Coverage',
      text: `${state.transactions.length} transactions across ${months} month${months !== 1 ? 's' : ''} are tracked in your dashboard.`,
    },
    {
      icon: '💰',
      title: 'Largest Income',
      text: maxIncome
        ? `${maxIncome.description} — $${maxIncome.amount.toLocaleString()}`
        : 'No income transactions recorded yet.',
    },
    {
      icon: '🔍',
      title: 'Biggest Expense',
      text: maxExpense
        ? `${maxExpense.description} — $${maxExpense.amount.toLocaleString()}`
        : 'No expense transactions recorded yet.',
    },
  ];

  el.innerHTML = cards.map((c, i) => `
    <div class="obs-card" style="animation-delay:${i * 0.08}s">
      <span class="obs-icon">${c.icon}</span>
      <div class="obs-title">${c.title}</div>
      <p class="obs-text">${c.text}</p>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────
// EXPORT CSV
// ─────────────────────────────────────────────

function exportCSV() {
  const header = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows   = state.transactions.map(t => [t.date, `"${t.description}"`, t.category, t.type, t.amount]);
  const csv    = [header, ...rows].map(r => r.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = `aura-finance-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);

  showToast('📊 Exported as CSV!', 'success');
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className   = `toast ${type}`;
  // force reflow
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────

function setupParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#6366F1', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#F43F5E'];

  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const p    = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const dur  = Math.random() * 18 + 12;
      const del  = Math.random() * 8;

      p.className = 'particle';
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        animation-duration: ${dur}s;
        animation-delay: ${del}s;
      `;
      container.appendChild(p);
    }, i * 400);
  }
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function categoryTotals(type) {
  const result = {};
  state.transactions
    .filter(t => t.type === type)
    .forEach(t => { result[t.category] = (result[t.category] || 0) + t.amount; });
  return result;
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ─────────────────────────────────────────────
// BOOTSTRAP
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
