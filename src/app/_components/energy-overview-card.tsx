"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { BatteryLocationsMap } from "./map";
import { LocationInstallationDetailForm } from "@/app/_components/solar-installation-detail";

import { useLocationStore, usePersistedLocationStore } from "@/store/locations";
import { api } from "@/trpc/react";
import { EnergyOverview } from "./energy-overview";
import { SavedLocationTable } from "./SavedLocationTable";
import { DataTable } from "./persisted-location-table/data-table";

import { columns } from "./persisted-location-table/columns";

export function EnergyPreviewCard() {
  const { selectedLocation } = useLocationStore();
  const { locations } = usePersistedLocationStore();
  const { data, isError, isLoading, refetch } =
    api.weather.getCurrentWeather.useQuery(
      {
        lat: selectedLocation?.[1] ?? 0,
        lon: selectedLocation?.[0] ?? 0,
      },
      {
        enabled: !!selectedLocation,
        retry: false,
      },
    );

  return (
    <Card className="mx-12 w-3/4 max-w-screen-xl">
      <CardHeader className="px-6 pb-4 pt-6">
        <CardTitle className="text-lg">Hybrid Energy Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 p-6 sm:flex-col">
        <div className="grid gap-6 md:grid-cols-2">
          <LocationInstallationDetailForm />
          <EnergyOverview
            weatherData={data}
            isLoading={isLoading}
            isError={isError}
            refetch={() => refetch()}
          />
        </div>
        <div className="w-full py-8">
          <CardTitle className="text-lg">Map</CardTitle>
          <BatteryLocationsMap />
        </div>
        <div>
          <CardTitle className="text-lg">Saved Locations Forecast</CardTitle>
          {/* <SavedLocationTable /> */}
          <DataTable data={locations} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
}

export default EnergyPreviewCard;
