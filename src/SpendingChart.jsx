import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  food: '#00ff88',
  housing: '#60a5fa',
  utilities: '#f59e0b',
  transport: '#a78bfa',
  entertainment: '#fb923c',
  salary: '#34d399',
  other: '#64748b',
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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#4a6285', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}
            tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
            axisLine={{ stroke: '#172540' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 11, fill: '#4a6285', fontFamily: 'Roboto Mono, monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={{
              background: '#0b1526',
              border: '1px solid #1e3155',
              borderRadius: 0,
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: '#b8cce8',
              letterSpacing: '0.04em',
            }}
            itemStyle={{ color: '#00ff88' }}
            labelStyle={{ color: '#4a6285', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            cursor={{ fill: 'rgba(0,255,136,0.04)' }}
          />
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
