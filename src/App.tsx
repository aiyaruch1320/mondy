import React, { useState } from "react";
import { TransactionForm } from "./components/TransactionFrom";
import { TransactionTable } from "./components/TransactionTable";
import { Transaction } from "./types/transaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
