export interface SolarInput {
  aqi: number;
  ghi: number;
  panelArea: number;
  panelEfficiency: number;
}
const AQI_IMPACT_FACTOR = 0.75;

/**
 * Calculates the daily energy generation from solar panels based on the input data.
 *
 * @param solarInput - The input data for the solar panel calculation.
 * @returns The daily energy generation from the solar panels.
 */

export const calculateDailyEnergyGeneration = ({
  aqi,
  ghi,
  panelArea,
  panelEfficiency,
}: SolarInput): [string, number | string] => {
  const effectiveGHI = ghi * (1 - (aqi / 500) * (1 - AQI_IMPACT_FACTOR));
  const hourlyEnergy = effectiveGHI * panelArea * panelEfficiency;
  const dailyEnergy = hourlyEnergy * 12; // Daily energy in watts

  if (dailyEnergy === Infinity) {
    return [`You solved energy!`, "infinity"];
  } else if (dailyEnergy >= 1e9) {
    return [`${(dailyEnergy / 1e9).toFixed(1)} GW/day`, dailyEnergy];
  } else if (dailyEnergy >= 1e6) {
    return [`${(dailyEnergy / 1e6).toFixed(1)} MW/day`, dailyEnergy];
  } else if (dailyEnergy >= 1e3) {
    return [`${(dailyEnergy / 1e3).toFixed(1)} kW/day`, dailyEnergy];
  } else {
    return [`${dailyEnergy.toFixed(0)} W/day`, dailyEnergy];
  }
};
