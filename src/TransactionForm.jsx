import { useState } from 'react';

export default function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field form-field--full">
            <label htmlFor="tf-description">Description</label>
            <input
              id="tf-description"
              type="text"
              placeholder="e.g. Monthly rent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="tf-amount">Amount</label>
            <input
              id="tf-amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="tf-category">Category</label>
            <select id="tf-category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="form-field form-field--full">
            <label>Type</label>
            <div className="form-type-row">
              <button
                type="button"
                className={`type-btn ${type === 'expense' ? 'type-btn--active-expense' : ''}`}
                onClick={() => setType('expense')}
              >
                Expense
              </button>
              <button
                type="button"
                className={`type-btn ${type === 'income' ? 'type-btn--active-income' : ''}`}
                onClick={() => setType('income')}
              >
                Income
              </button>
            </div>
          </div>

          <div className="form-field form-field--full form-submit-row">
            <button type="submit" className="btn-add">Record Transaction</button>
          </div>
        </div>
      </form>
    </div>
  );
}
