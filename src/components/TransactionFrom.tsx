import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { Transaction } from "../types/transaction";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    const numAmount = Math.abs(parseFloat(amount));

    onSubmit({
      amount: type === "expense" ? -numAmount : numAmount,
      description,
      date: new Date().toISOString(),
      type,
    });

    setAmount("");
    setDescription("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
            step={0.01}
            min={0}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter description"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          onClick={() => setType("income")}
          className="
            flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-green-500
          "
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Income
        </button>
        <button
          type="submit"
          onClick={() => setType("expense")}
          className="
            flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-red-500
          "
        >
          <MinusCircle className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </div>
    </form>
  );
}
