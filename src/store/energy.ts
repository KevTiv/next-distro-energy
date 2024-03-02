import { create } from "zustand";

export type MapAction = "setNewLocation" | "removeLocation" | "updateLocation";

export type BateryPercent = "25%" | "50%" | "75%" | "100%" | undefined;

export enum powerScale {
  W = 1,
  kW = 1000,
  MW = 1000000000,
  GW = 1000000000000,
}

type EnergyStore = {
  chargedTarget?: number;
  solarPanelArea?: number;
  batteryCapacity?: number;
  expectedChargingTime?: number;
  powerScale?: powerScale;

  setSelectedPercent: (percent: BateryPercent) => void;
  setChargedTarget: (power: number) => void;
  setPowerScale: (unit: keyof typeof powerScale) => void;
  setSolarPanelArea: (area?: number) => void;
  setExpectedChargingTime: (time?: number) => void;
};

export const useEnergyStateStore = create<EnergyStore>((set) => ({
  chargedTarget: undefined,
  batteryCapacity: undefined,
  solarPanelArea: undefined,
  powerScale: powerScale.W,

  setSelectedPercent: (percent) =>
    set({ chargedTarget: parseInt(percent ?? "100%", 10) / 100 }),
  setChargedTarget: (power) => set({ batteryCapacity: power }),
  setPowerScale: (unit) => set({ powerScale: powerScale[unit] }),
  setSolarPanelArea: (area) => set({ solarPanelArea: area }),
  setExpectedChargingTime: (time) => set({ expectedChargingTime: time }),
}));
