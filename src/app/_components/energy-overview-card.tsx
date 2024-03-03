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

import { useLocationStore } from "@/store/locations";
import { api } from "@/trpc/react";
import { EnergyOverview } from "./energy-overview";
import { DataTable } from "./persisted-location-table/data-table";

import { columns } from "./persisted-location-table/columns";

export function EnergyPreviewCard() {
  const { selectedLocation, locations } = useLocationStore();
  const tableData = locations.filter(
    (location) =>
      location.city !== undefined && location.forecastOutput !== undefined,
  );
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
    <Card className="mx-12 max-w-screen-xl">
      <CardHeader className="px-6 pb-4 pt-6">
        <CardTitle className="text-lg">Hybrid Energy Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-6">
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

          <p className=" text-xs font-semibold">
            Select a location on the map to see the energy forecast
          </p>

          <BatteryLocationsMap />
        </div>
        <div>
          <CardTitle className="text-lg">Saved Locations Forecast</CardTitle>
          <DataTable data={tableData} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
}

export default EnergyPreviewCard;
