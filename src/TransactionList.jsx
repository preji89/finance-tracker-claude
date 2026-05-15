import { useState } from 'react';

const PILL_COLORS = {
  food:          { color: '#e07878', background: 'rgba(224,120,120,0.08)', borderColor: 'rgba(224,120,120,0.28)' },
  housing:       { color: '#6fa8dc', background: 'rgba(111,168,220,0.08)', borderColor: 'rgba(111,168,220,0.28)' },
  utilities:     { color: '#5cc8d0', background: 'rgba(92,200,208,0.08)',  borderColor: 'rgba(92,200,208,0.28)'  },
  transport:     { color: '#78c87a', background: 'rgba(120,200,122,0.08)', borderColor: 'rgba(120,200,122,0.28)' },
  entertainment: { color: '#c8a96e', background: 'rgba(200,169,110,0.08)', borderColor: 'rgba(200,169,110,0.28)' },
  salary:        { color: '#b08ed4', background: 'rgba(176,142,212,0.08)', borderColor: 'rgba(176,142,212,0.28)' },
  other:         { color: '#7a7670', background: 'rgba(122,118,112,0.08)', borderColor: 'rgba(122,118,112,0.28)' },
};

export default function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  const fmt = (n) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <span className="section-title">Transactions</span>
          <span className="section-tag">{filtered.length} of {transactions.length}</span>
        </div>
        <div className="filters">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="transactions-empty">No transactions match the current filters</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'right', paddingRight: 0 }}>—</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const pillStyle = PILL_COLORS[t.category] || PILL_COLORS.other;
              return (
                <tr key={t.id} className={t.type === 'income' ? 'row-income' : 'row-expense'}>
                  <td className="td-date">{t.date}</td>
                  <td className="td-description">{t.description}</td>
                  <td>
                    <span className="category-pill" style={pillStyle}>
                      {t.category}
                    </span>
                  </td>
                  <td className={`td-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                    {t.type === 'income' ? '+' : '−'}${fmt(t.amount)}
                  </td>
                  <td className="td-actions">
                    <button className="delete-btn" onClick={() => onDelete(t.id)} title="Remove">×</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
