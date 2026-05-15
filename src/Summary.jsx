export default function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const expenseRatio = totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;
  const savingsRate = totalIncome > 0 ? Math.max(100 - expenseRatio, 0) : 0;

  const fmt = (n) =>
    Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const incomeCount  = transactions.filter(t => t.type === "income").length;
  const expenseCount = transactions.filter(t => t.type === "expense").length;

  return (
    <div className="summary">
      <div className="summary-stats">
        <div className="summary-card summary-card--income">
          <span className="summary-label">Total Income</span>
          <p className="summary-amount income-amount">${fmt(totalIncome)}</p>
          <span className="summary-footer">{incomeCount} {incomeCount === 1 ? 'entry' : 'entries'}</span>
        </div>
        <div className="summary-card summary-card--expense">
          <span className="summary-label">Total Expenses</span>
          <p className="summary-amount expense-amount">${fmt(totalExpenses)}</p>
          <span className="summary-footer">{expenseCount} {expenseCount === 1 ? 'entry' : 'entries'}</span>
        </div>
      </div>

      <div className="summary-card summary-card--hero">
        <span className="summary-label">Net Balance</span>
        <p className={`summary-amount ${balance >= 0 ? 'balance-amount' : 'expense-amount'}`}>
          {balance < 0 ? '−' : ''}${fmt(balance)}
        </p>

        <div className="ratio-track">
          <div className="ratio-fill" style={{ width: `${expenseRatio}%` }} />
        </div>
        <div className="ratio-labels">
          <span style={{ color: 'var(--green)', opacity: 0.8 }}>{savingsRate.toFixed(0)}% saved</span>
          <span style={{ color: 'var(--red)', opacity: 0.8 }}>{expenseRatio.toFixed(0)}% spent</span>
        </div>
      </div>
    </div>
  );
}
