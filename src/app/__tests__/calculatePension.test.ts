import calculatePension from "../utils/calculatePension";
import { PensionData, YEAR_OF_THE_INEVITABLE } from "../page";

describe("calculatePension", () => {
  test("correctly calculates balance with positive contributions and extra pots", () => {
    const result = calculatePension({
      employerContribution: 100,
      personalContribution: 100,
      extraPots: 10000,
      retirementAge: 65,
      desiredIncome: 20000,
    });

    expect(result[0].balance).toBeGreaterThan(0);
    expect(result[result.length - 1].year).toBe(YEAR_OF_THE_INEVITABLE);
  });

  test("correctly calculates balance without extra pots, but getting a final negative balance", () => {
    const result = calculatePension({
      employerContribution: 50,
      personalContribution: 50,
      retirementAge: 70,
      desiredIncome: 25000,
    });

    expect(result[0].balance).toBeGreaterThan(0);

    expect(result[result.length - 1].balance).toBeLessThan(0);
  });

  test("verifies that annual contributions are calculated correctly", () => {
    const result = calculatePension({
      employerContribution: 200,
      personalContribution: 200,
      extraPots: 0,
      retirementAge: 65,
      desiredIncome: 24000,
    });

    const annualContribution = (200 + 200) * 12;

    expect(result[1].balance).toBeGreaterThan(annualContribution);
  });

  it("should return an array of PensionData", () => {
    const result = calculatePension({
      employerContribution: 100,
      personalContribution: 100,
      extraPots: 10000,
      retirementAge: 65,
      desiredIncome: 20000,
    });

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toEqual(
      expect.objectContaining<PensionData>({
        year: expect.any(Number),
        balance: expect.any(Number),
        desiredIncome: expect.any(Number),
      })
    );
  });

  test("calculates 4.9% interest between the first and second year", () => {
    const result = calculatePension({
      employerContribution: 100,
      personalContribution: 100,
      extraPots: 10000,
      retirementAge: 65,
      desiredIncome: 20000,
    });

    const firstYearBalance = result[0].balance;
    const secondYearBalance = result[1].balance;

    const expectedInterest = firstYearBalance * 0.049;

    const actualInterest =
      secondYearBalance - (firstYearBalance + (100 + 100) * 12);

    expect(actualInterest).toBeCloseTo(expectedInterest, 2);
  });
});
