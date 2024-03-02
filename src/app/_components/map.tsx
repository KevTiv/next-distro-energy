"use client";
import { ReactElement, useMemo } from "react";
import { Map } from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { env } from "@/env";
import { Button } from "./ui/button";
import { MapPin, Trash2 } from "lucide-react";
import {
  MapAction,
  useLocationStore,
  usePersistedLocationStore,
} from "@/store/locations";
import { findNearestSavedLocation } from "@/lib/findNearestSavedLocation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  latitude: 52.5,
  longitude: 5.75,
  zoom: 6,
  bearing: 0,
  pitch: 30,
};

type LocationActions = {
  icon: ReactElement;
  tooltip: string;
  onClick: () => void;
  selected: boolean;
};

export function BatteryLocationsMap() {
  const {
    updateMapAction,
    mapAction,
    setNewLocation,
    removeLocation,
    locations: currentLocations,
    setSelectedLocation,
  } = useLocationStore();
  const { locations: savedLocations } = usePersistedLocationStore();
  const locations = [...currentLocations, ...savedLocations];

  const handleAddLocation = ({
    coordinate,
  }: {
    coordinate: number[] | undefined;
  }) => {
    if (coordinate && mapAction === "setNewLocation") {
      setNewLocation({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinate,
        },
      });
    }
  };

  const mapActionOnclick = (newMapAction: MapAction) =>
    mapAction === newMapAction
      ? updateMapAction(undefined)
      : updateMapAction(newMapAction);

  const locationActions: LocationActions[] = [
    {
      icon: <MapPin />,
      tooltip: "Click to add a location",
      onClick: () => mapActionOnclick("setNewLocation"),
      selected: mapAction === "setNewLocation",
    },
    {
      icon: <Trash2 />,
      tooltip: "Click to remove a location",
      onClick: () => mapActionOnclick("removeLocation"),
      selected: mapAction === "removeLocation",
    },
  ];

  const layers = useMemo(
    () => [
      new GeoJsonLayer({
        id: "battery-locations-layer",
        data: locations,
        filled: true,
        pointRadiusMinPixels: 2.5,
        pointRadiusScale: 2000,
        getPointRadius: (f) => 2.5,
        getFillColor:
          mapAction === "removeLocation" ? [155, 155, 155] : [0, 0, 0],

        pickable: true,
        autoHighlight: true,
        onClick: (e) => {
          if (!e.coordinate) {
            return;
          }

          if (!mapAction) {
            const closestLocation = findNearestSavedLocation(
              locations,
              e.coordinate ?? [0, 0],
            );
            setSelectedLocation(closestLocation?.geometry?.coordinates);
          } else if (mapAction === "removeLocation") {
            const closestLocation = findNearestSavedLocation(
              locations,
              e.coordinate ?? [0, 0],
            );

            if (closestLocation) {
              removeLocation(closestLocation.geometry.coordinates);
            }
          }
        },
      }),
    ],
    [mapAction, locations],
  );

  return (
    <div className="relative flex flex-col gap-2">
      <div className="absolute -top-16 right-0 m-4 flex gap-2">
        {locationActions.map(({ icon, tooltip, selected, onClick }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={onClick}
                  className={`${selected ? "" : "bg-secondary text-primary hover:text-secondary"} w-12`}
                >
                  {icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className=" h-60 overflow-hidden rounded-lg bg-gray-200">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          onClick={(e) => handleAddLocation({ coordinate: e.coordinate })}
          layers={locations ? layers : undefined}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          />
        </DeckGL>
      </div>
    </div>
  );
}
