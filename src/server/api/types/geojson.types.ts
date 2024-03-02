import { z } from "zod";

// Define GeoJSON basic structures
const geoJsonPoint = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()),
});

const geoJsonPolygon = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.number()),
});

const geoJsonLineString = z.object({
  type: z.literal("LineString"),
  coordinates: z.array(z.number()),
});

// Union schema for GeoJsonGeometry. Extend this to include other geometry types as needed
const geoJsonGeometry = z.union([
  geoJsonPoint,
  geoJsonPolygon,
  geoJsonLineString,
]);

const geoJsonFeature = z.object({
  type: z.literal("Feature"),
  geometry: geoJsonGeometry,
});

type GeoJsonFeature = z.infer<typeof geoJsonFeature>;

const geoJsonFeatureCollection = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(geoJsonFeature),
});

type GeoJsonFeatureCollection = z.infer<typeof geoJsonFeatureCollection>;

// Export the schemas
export {
  geoJsonFeature,
  geoJsonFeatureCollection,
  type GeoJsonFeature,
  type GeoJsonFeatureCollection,
};
