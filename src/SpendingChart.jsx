import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  food: '#FF6B6B',
  housing: '#4ECDC4',
  utilities: '#45B7D1',
  transport: '#96CEB4',
  entertainment: '#FFEAA7',
  salary: '#DDA0DD',
  other: '#B0B0B0',
};

export default function SpendingChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="chart-section">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-section">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 13 }} tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#B0B0B0'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
