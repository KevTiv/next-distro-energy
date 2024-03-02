import { GeoJsonFeature } from "@/server/api/types/geojson.types";

export const findNearestSavedLocation = (
  locations: GeoJsonFeature[],
  coordinate: number[],
) =>
  locations.reduce((closest, location) => {
    const savedCoord = location.geometry.coordinates;

    const distance = Math.sqrt(
      ((savedCoord[0] ?? 0) - (coordinate[0] ?? 0)) ** 2 +
        ((savedCoord[1] ?? 0) - (coordinate[1] ?? 0)) ** 2,
    );

    if (distance < 0.2) {
      return location;
    }
    return closest;
  }, locations[0]);
