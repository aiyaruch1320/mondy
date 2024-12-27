import React, { useState } from "react";
import "./App.css";

interface Transaction {
  id: number;
  detail: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const App: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      detail: "Salary",
      amount: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addTransaction = (amount: number, type: "income" | "expenses") => {
    const netAmount = type === "income" ? amount : -amount;
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      detail: "New Transaction",
      amount: netAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === "" || isNaN(numberValue) || numberValue < 1) {
      setAmount("");
      return;
    }
    setAmount(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input
          type="text"
          name="amount"
          min={1}
          onChange={onAmountChange}
          value={amount}
          data-testid="amount-input"
          placeholder="Enter amount"
        />
        <button
          style={{ background: "green" }}
          data-testid="plus-button"
          onClick={() => !!amount && addTransaction(Number(amount), "income")}
        >
          +
        </button>
        <button
          style={{ background: "red" }}
          data-testid="minus-button"
          onClick={() => !!amount && addTransaction(Number(amount), "expenses")}
        >
          -
        </button>
      </div>
      {transactions.map((transaction) => (
        <div key={transaction.id} data-testid={`transaction-${transaction.id}`}>
          <span>{transaction.detail}</span>
          <span>{transaction.amount}</span>
        </div>
      ))}
    </>
  );
};

export default App;
