"use client";

import { useState, useEffect } from "react";
import PensionChart from "./components/PensionChart";
import PensionForm from "./components/PensionForm";
import calculatePension from "./utils/calculatePension";
import React from "react";

export interface PensionData {
  year: number;
  balance: number;
  desiredIncome: number;
}

export const YEAR_OF_THE_INEVITABLE = 81;
export const ANNUAL_INTEREST_RATE = 0.049; // 4.9%
export const START_WORK_YEAR = 25;

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

    const pensionData = calculatePension({
      employerContribution,
      personalContribution,
      extraPots,
      retirementAge,
      desiredIncome,
    });

    setPensionData(pensionData);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-300 text-gray-800">
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
