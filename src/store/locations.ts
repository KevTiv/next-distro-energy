import {
  geoJsonFeature,
  type GeoJsonFeature,
} from "@/server/api/types/geojson.types";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type MapAction = "setNewLocation" | "removeLocation" | "updateLocation";

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
  updateMapAction: (mapAction: MapAction | undefined) => void;
  setSelectedLocation: (location: number[] | undefined) => void;
};

type PersistedStore = {
  locations: SavedGeoJson[];
  addPersistedLocation: (location: SavedGeoJson) => void;
  removePersistedLocation: (coordinates: number[]) => void;
};

export const useLocationStore = create<LocationsStore>((set, get) => ({
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
      ...state,
      locations: state.locations.filter(
        (feature) => feature.geometry.coordinates !== coordinates,
      ),
    })),
  updateMapAction: (mapAction) => set({ mapAction }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

// persisted store

export const usePersistedLocationStore = create(
  persist<PersistedStore>(
    (set) => ({
      locations: [],
      addPersistedLocation: (location) =>
        set((state) => ({
          locations: [...state.locations, location],
        })),
      removePersistedLocation: (coordinates) =>
        set((state) => ({
          ...state,
          locations: state.locations.filter(
            (feature) => feature.geometry.coordinates !== coordinates,
          ),
        })),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // uses sessionStorage
    },
  ),
);
