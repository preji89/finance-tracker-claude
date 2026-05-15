import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from 'recharts';

const PALETTE = {
  food:          { base: '#e07878', dim: '#7a3030' },
  housing:       { base: '#6fa8dc', dim: '#2a4a6a' },
  utilities:     { base: '#5cc8d0', dim: '#1e5a60' },
  transport:     { base: '#78c87a', dim: '#2a5a2c' },
  entertainment: { base: '#c8a96e', dim: '#6a5020' },
  salary:        { base: '#b08ed4', dim: '#4e3070' },
  other:         { base: '#7a7670', dim: '#3a3830' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const color = PALETTE[label]?.base || '#7a7670';
  return (
    <div style={{
      background: '#1a1916',
      border: `1px solid ${color}40`,
      padding: '12px 16px',
      fontFamily: "'IBM Plex Mono', monospace",
      boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px ${color}20`,
    }}>
      <p style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5650', marginBottom: 6 }}>
        {label}
      </p>
      <p style={{ fontSize: 18, fontWeight: 300, color, letterSpacing: '-0.03em' }}>
        ${payload[0].value.toFixed(2)}
      </p>
    </div>
  );
};

export default function SpendingChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="chart-section">
        <div className="section-header">
          <span className="section-title">Spending</span>
          <span className="section-tag">By Category</span>
        </div>
        <p className="chart-empty">No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="chart-section">
      <div className="section-header">
        <span className="section-title">Spending</span>
        <span className="section-tag">{data.length} {data.length === 1 ? 'category' : 'categories'} · ${total.toFixed(0)} total</span>
      </div>
      <ResponsiveContainer width="100%" height={248}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }} barSize={30}>
          <defs>
            {data.map(entry => {
              const p = PALETTE[entry.name] || PALETTE.other;
              return (
                <linearGradient key={`lg-${entry.name}`} id={`lg-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={p.base} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={p.base} stopOpacity={0.35} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid vertical={false} stroke="#1e1c17" strokeDasharray="0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: '#5a5650', fontFamily: "'IBM Plex Mono'", letterSpacing: '0.09em' }}
            tickLine={false}
            axisLine={{ stroke: '#29261f' }}
            tickFormatter={(v) => v.toUpperCase()}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 9, fill: '#5a5650', fontFamily: "'IBM Plex Mono'" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200,169,110,0.04)' }} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {data.map(entry => (
              <Cell key={entry.name} fill={`url(#lg-${entry.name})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
