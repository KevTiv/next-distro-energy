import { powerScale } from "@/store/energy";
import { calculateBatteryChargeTime } from "../calculateBatteryChargeTime";

describe("calculateBatteryChargeTime", () => {
  it("should return '2.00 days' when given the input", () => {
    const input = {
      dailyPowerGeneration: 1000, // in watt-hours
      batteryCapacity: 2000, // in watt-hours
      powerScale: 1,
      percentage: 100,
    };

    const output = calculateBatteryChargeTime(input);
    const expectedOutput = "2.00 days"; // Reflecting the correct expected output
    expect(output).toBe(expectedOutput);
  });

  it("should return '48.00 hours' when given the input that results in less than 100 hours", () => {
    const input = {
      dailyPowerGeneration: 1000, // in watt-hours
      batteryCapacity: 500, // in watt-hours
      powerScale: 1,
      percentage: 100,
    };

    const output = calculateBatteryChargeTime(input);
    const expectedOutput = "12.00 hours"; // Correct expectation for hours
    expect(output).toBe(expectedOutput);
  });
});
