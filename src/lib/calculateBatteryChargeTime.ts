interface BatteryChargeTimeInput {
  dailyPowerGeneration: number; // in watt-hours
  batteryCapacity: number; // in watt-hours
  powerScale: number; // in watt-hours
  percentage: number;
}

export const calculateBatteryChargeTime = ({
  dailyPowerGeneration,
  batteryCapacity,
  powerScale,
  percentage,
}: BatteryChargeTimeInput): string => {
  const energyNeeded = batteryCapacity * powerScale * (percentage / 100); // Ensure percentage is correctly applied
  const batteryChargingTimeInDays = energyNeeded / dailyPowerGeneration; // This is already in days

  // Check if the time to charge in hours is greater than 100
  const batteryChargingTimeInHours = batteryChargingTimeInDays * 24;
  if (batteryChargingTimeInHours > 24) {
    // Return the time in days with 'days' unit if more than 100 hours
    return `${batteryChargingTimeInDays.toFixed(2)} days`;
  } else {
    // Otherwise, return the time in hours with 'hours' unit
    return `${batteryChargingTimeInHours.toFixed(2)} hours`;
  }
};
