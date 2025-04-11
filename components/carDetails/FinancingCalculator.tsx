import CarDetailsProps from "@/types/carDetails";
import React, { useState } from "react";
export default function FinancingCalculator({
  carPrice,
}: {
    carPrice: number;
}) {
  const [price, setPrice] = useState(carPrice.toString());
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleCalculate = () => {
    const principal = Number(price) - Number(downPayment);
    const monthlyInterest = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    if (principal <= 0 || monthlyInterest <= 0 || numberOfPayments <= 0) {
      setMonthlyPayment(null);
      return;
    }

    const monthly =
      (principal * monthlyInterest) /
      (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

    setMonthlyPayment(Number(monthly.toFixed(2)));
  };

  return (
    <div className="bg-white p-5 shadow-md mt-5 border rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Financing Calculator</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Loan Term (year)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6 px-6 py-2 rounded-md w-full"
      >
        Calculate ↗
      </button>

      {monthlyPayment !== null && (
        <div className="mt-6 text-lg font-semibold text-gray-700">
          Monthly Payment:{" "}
          <span className="text-blue-600">${monthlyPayment}</span>
        </div>
      )}
    </div>
  );
}
