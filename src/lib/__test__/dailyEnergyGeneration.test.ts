import { calculateDailyEnergyGeneration } from "../dailyEnergyGeneration";

describe("calculateDailyEnergyGeneration", () => {
  it("should return energy generation in watts (W) for small values", () => {
    const solarInput = {
      aqi: 10,
      ghi: 100,
      panelArea: 1,
      panelEfficiency: 0.1,
    };

    const expectedEnergyGeneration = ["119 W/day", 119.4];
    const calculatedEnergy = calculateDailyEnergyGeneration(solarInput);
    expect(String(calculatedEnergy)).toBe(String(expectedEnergyGeneration));
  });

  it("should return energy generation in kilowatts (kW) for medium values", () => {
    const solarInput = {
      aqi: 20,
      ghi: 300,
      panelArea: 5,
      panelEfficiency: 0.15,
    };

    const expectedEnergyGeneration = ["2.7 kW/day", 2673];
    const calculatedEnergy = calculateDailyEnergyGeneration(solarInput);
    expect(String(calculatedEnergy)).toBe(String(expectedEnergyGeneration));
  });

  it("should return energy generation in megawatts (MW) for large values", () => {
    const solarInput = {
      aqi: 30,
      ghi: 5000,
      panelArea: 100,
      panelEfficiency: 0.2,
    };

    const expectedEnergyGeneration = ["1.2 MW/day", 1182000];
    const calculatedEnergy = calculateDailyEnergyGeneration(solarInput);
    expect(String(calculatedEnergy)).toBe(String(expectedEnergyGeneration));
  });

  it("should return energy generation in gigawatts (GW) for very large values", () => {
    const solarInput = {
      aqi: 50,
      ghi: 10000,
      panelArea: 100000,
      panelEfficiency: 0.25,
    };

    const expectedEnergyGeneration = ["2.9 GW/day", 2925000000];
    const calculatedEnergy = calculateDailyEnergyGeneration(solarInput);
    expect(String(calculatedEnergy)).toBe(String(expectedEnergyGeneration));
  });
});
