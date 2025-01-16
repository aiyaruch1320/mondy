import { Check, Edit2, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Transaction } from "../types/transaction";
import { formatDate } from "../utils/formatters";

interface TransactionRowProps {
  transaction: Transaction;
  onUpdate: (id: string, transaction: Partial<Transaction>) => void;
}

function TransactionRow({ transaction, onUpdate }: TransactionRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    transaction.description
  );

  const handleSave = () => {
    onUpdate(transaction.id, { description: editedDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(transaction.description);
    setIsEditing(false);
  };

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600";
  };
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-help">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </>
        ) : (
          transaction.description
        )}
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
          {isEditing ? (
            <>
              <button className="text-green-600 hover:text-green-600 p-2 rounded-full hover:bg-green-100">
                <Check onClick={handleSave} className="w-5 h-5" />
              </button>
              <button className="text-red-600 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                <X onClick={handleCancel} className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button className="text-blue-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100">
                <Edit2 onClick={() => setIsEditing(true)} className="w-5 h-5" />
              </button>
              <button className="text-red-600 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default TransactionRow;
