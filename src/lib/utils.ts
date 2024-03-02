import { GeoJsonFeature } from "@/server/api/types/geojson.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findNearestSavedLocation = (
  locations: GeoJsonFeature[],
  coordinate: number[],
) =>
  locations.reduce((closest, location) => {
    const [savedLon, savedLat] = location.geometry.coordinates;
    const [clickedLon, clickedLat] = coordinate ?? [0, 0];

    const distance = Math.sqrt(
      (savedLon! - clickedLon!) ** 2 + (savedLat! - clickedLat!) ** 2,
    );

    if (distance < 0.2) {
      return location;
    }
    return closest;
  });
