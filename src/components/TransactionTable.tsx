import React from "react";
import { Transaction } from "../types/transaction";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  transactions: Transaction[];
}

const transactionColumns = [
  { key: "date", title: "Date", align: "left" },
  { key: "description", title: "Description", align: "left" },
  { key: "amount", title: "Amount(฿)", align: "right" },
  { key: "action", title: "Action", align: "center" },
];

function TransactionTable({ transactions }: TransactionTableProps) {
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
              <TransactionRow transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionTable;
