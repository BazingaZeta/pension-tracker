"use client";

import { useState, useEffect } from "react";
import PensionChart from "@components/PensionChart";
import PensionForm from "@components/PensionForm";

interface PensionData {
  year: number;
  balance: number;
  desiredIncome: number;
}

const YEAR_OF_THE_INEVITABLE = 81;
const ANNUAL_INTEREST_RATE = 0.049; // 4.9%

const Home = () => {
  const [pensionData, setPensionData] = useState<PensionData[] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormSubmit = (values: {
    desiredIncome: number;
    employerContribution: number;
    personalContribution: number;
    retirementAge: number;
    extraPots?: number;
  }) => {
    const {
      desiredIncome,
      employerContribution,
      personalContribution,
      retirementAge,
      extraPots,
    } = values;

    const data: PensionData[] = [];

    // Total annual contribution
    const annualContribution =
      (employerContribution + personalContribution) * 12;

    // Start with initial balance
    let balance = extraPots ? extraPots : 0;

    for (let year = 25; year <= retirementAge; year++) {
      // First apply interest to existing balance
      balance *= 1 + ANNUAL_INTEREST_RATE;

      // Then add annual contribution
      balance += annualContribution;

      data.push({
        year,
        balance: Math.round(balance),
        desiredIncome: desiredIncome,
      });
    }

    for (let year = retirementAge; year <= YEAR_OF_THE_INEVITABLE; year++) {
      balance *= 1 + ANNUAL_INTEREST_RATE;

      // Subtract desired income after retirement
      if (year >= retirementAge) {
        balance -= desiredIncome;
      }

      data.push({
        year,
        balance: Math.round(balance),
        desiredIncome: desiredIncome,
      });
    }

    console.log(data);

    setPensionData(data);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <PensionForm onSubmit={handleFormSubmit} />
        {pensionData && (
          <PensionChart
            data={pensionData}
            desiredIncome={pensionData[0]?.desiredIncome}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
