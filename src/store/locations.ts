import {
  geoJsonFeature,
  type GeoJsonFeature,
} from "@/server/api/types/geojson.types";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { powerScale } from "./energy";

export type MapAction = "setNewLocation" | "removeLocation" | "updateLocation";
export const powerUnits = z.enum(["W", "kW", "MW", "GW"]);

export const savedGeoJson = geoJsonFeature.extend({
  city: z.string().optional(),
  date: z.string().optional(),
  forecastOutput: z.string().optional(),
  batteryChargePercent: z.string().optional(),
  batteryChargingTime: z.string().optional(),
});

export type SavedGeoJson = z.infer<typeof savedGeoJson>;

type LocationsStore = {
  selectedLocation: number[] | undefined;
  locations: SavedGeoJson[];
  mapAction: MapAction | undefined;
  setNewLocation: (location: GeoJsonFeature) => void;
  removeLocation: (coordinates: number[]) => void;
  updateLocation: (coordinates: number[], newLocation: SavedGeoJson) => void; // Updated function signature
  updateMapAction: (mapAction: MapAction | undefined) => void;
  setSelectedLocation: (location: number[] | undefined) => void;
};

export const useLocationStore = create(
  persist<LocationsStore>(
    (set, get) => ({
      selectedLocation: undefined,
      locations: [],
      mapAction: undefined,
      setNewLocation: (location) =>
        set((state) => ({
          ...state,
          locations: [...state.locations, location],
        })),
      removeLocation: (coordinates) =>
        set((state) => ({
          locations: state.locations.filter(
            (feature) =>
              String(feature.geometry.coordinates) !== String(coordinates),
          ),
        })),
      updateLocation: (coordinates, newLocation) =>
        set((state) => ({
          locations: state.locations.map((location) =>
            String(location.geometry.coordinates) === String(coordinates)
              ? newLocation
              : location,
          ),
        })),
      updateMapAction: (mapAction) => set({ mapAction }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
    }),
    {
      name: "location-storage", // Unique name for sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage for persistence
    },
  ),
);
