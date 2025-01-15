import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { Transaction } from "../types/transaction";
import { formatDate } from "../utils/formatters";

interface TransactionTableProps {
  transactions: Transaction[];
}

const transactionColumns = [
  { key: "date", title: "Date", align: "left" },
  { key: "description", title: "Description", align: "left" },
  { key: "amount", title: "Amount(฿)", align: "right" },
  { key: "action", title: "Action", align: "center" },
];

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getAmountColor = (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600";
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50">
              {transactionColumns.map(({ key, title, align }) => (
                <th
                  className={`text-${align} px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  key={key}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y devide-gray-200">
            {transactions.map((transaction) => (
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-help">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${getAmountColor(
                    transaction.amount
                  )}`}
                >
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end space-x-2">
                    <>
                      <button className="text-blue-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
