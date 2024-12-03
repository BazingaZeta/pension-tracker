import {
  ANNUAL_INTEREST_RATE,
  PensionData,
  START_WORK_YEAR,
  YEAR_OF_THE_INEVITABLE,
} from "../page";

interface CalculatePensionProps {
  employerContribution: number;
  personalContribution: number;
  extraPots?: number;
  retirementAge: number;
  desiredIncome: number;
}

const calculatePension = ({
  employerContribution,
  personalContribution,
  extraPots = 0,
  retirementAge,
  desiredIncome,
}: CalculatePensionProps): PensionData[] => {
  const data: PensionData[] = [];

  const annualContribution = (employerContribution + personalContribution) * 12;
  let balance = extraPots;

  for (let year = START_WORK_YEAR; year <= retirementAge; year++) {
    balance *= 1 + ANNUAL_INTEREST_RATE;
    balance += annualContribution;

    data.push({
      year,
      balance: parseFloat(balance.toFixed(2)),
      desiredIncome,
    });
  }

  for (let year = retirementAge; year <= YEAR_OF_THE_INEVITABLE; year++) {
    balance *= 1 + ANNUAL_INTEREST_RATE;
    balance -= desiredIncome;

    data.push({
      year,
      balance: parseFloat(balance.toFixed(2)),
      desiredIncome,
    });
  }

  return data;
};

export default calculatePension;
