import { GeoJsonFeature } from "@/server/api/types/geojson.types";
import { findNearestSavedLocation } from "../findNearestSavedLocation";

describe("findNearestSavedLocation", () => {
  it("should return the location that is closest to the clicked coordinate", () => {
    const locations: GeoJsonFeature[] = [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-73.985748, 40.748394],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-73.985138, 40.748584],
        },
      },
    ];
    const clickedCoordinate: number[] = [-73.985555, 40.748444];

    const nearestLocation = findNearestSavedLocation(
      locations,
      clickedCoordinate,
    );

    expect(nearestLocation).toBe(locations[1]);
  });
});
