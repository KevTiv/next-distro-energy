import { WeatherData } from "@/server/api/types/wethaerbit.types";
import {
  CalendarDays,
  Flag,
  Infinity,
  Info,
  Save,
  SunDim,
  Sunrise,
  Sunset,
  Zap,
  ZapOff,
  MapPinOff,
  MapPin,
} from "lucide-react";
import { useMemo } from "react";
import { calculateDailyEnergyGeneration } from "@/lib/dailyEnergyGeneration";
import { useEnergyStateStore } from "@/store/energy";
import { calculateBatteryChargeTime } from "@/lib/calculateBatteryChargeTime";
import { Skeleton } from "./ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { useLocationStore } from "@/store/locations";
import { ChargeTimeViewer } from "./charge-time-viewer";

type EnergyOverviewProps = {
  weatherData?: WeatherData;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
};
export function EnergyOverview({
  weatherData,
  isError,
  isLoading,
  refetch,
}: EnergyOverviewProps) {
  const { solarPanelArea, batteryCapacity, powerScale, chargedTarget } =
    useEnergyStateStore();
  const { selectedLocation, updateLocation } = useLocationStore();
  const isLoaderShown = isLoading || isError;
  const energyPotential = useMemo(
    () =>
      weatherData && solarPanelArea
        ? calculateDailyEnergyGeneration({
            aqi: weatherData?.aqi,
            ghi: weatherData?.ghi,
            panelArea: solarPanelArea,
            panelEfficiency: 0.15,
          })
        : undefined,
    [weatherData, solarPanelArea],
  );

  const batteryChargingTime = useMemo(
    () =>
      String(energyPotential) !== "infinty" &&
      energyPotential?.[1] &&
      batteryCapacity &&
      batteryCapacity > 0 &&
      chargedTarget &&
      powerScale
        ? calculateBatteryChargeTime({
            dailyPowerGeneration: Number(energyPotential[1]), // in watt-hours
            batteryCapacity: batteryCapacity, // in watt-hours
            powerScale: powerScale,
            percentage: chargedTarget,
          })
        : undefined,
    [chargedTarget, energyPotential?.[1], batteryCapacity, powerScale],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full items-center justify-between gap-6 px-4">
        <div>
          <h3 className="text-md items-senter flex gap-3 font-semibold">
            Solar Energy Forcast
          </h3>
          {isLoading && (
            <p className="text-xs font-medium">Select a location on the map</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {selectedLocation ? (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <p className="text-xs font-medium">
                lon: {selectedLocation[0]?.toFixed(4)} lat:{" "}
                {selectedLocation[1]?.toFixed(4)}
              </p>
            </div>
          ) : (
            <MapPinOff size={16} />
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CalendarDays size={16} />
              </TooltipTrigger>
              {weatherData?.datetime && (
                <TooltipContent sideOffset={8}>
                  <p>{weatherData?.datetime}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button
            disabled={
              !weatherData ||
              !selectedLocation ||
              !energyPotential ||
              !chargedTarget
            }
            onClick={() =>
              weatherData &&
              selectedLocation &&
              energyPotential &&
              chargedTarget
                ? updateLocation(selectedLocation, {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: selectedLocation,
                    },
                    city: weatherData?.city_name,
                    date: weatherData?.datetime,
                    forecastOutput: energyPotential[0],
                    batteryChargePercent: `${chargedTarget * 100}%`,
                    batteryChargingTime,
                  })
                : undefined
            }
            className={`rounded-md p-4 text-secondary hover:bg-secondary hover:text-primary ${!weatherData || !selectedLocation || !energyPotential ? "bg-muted text-secondary shadow-none" : ""}`}
          >
            <Save size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-rows-2">
        <div className="flex items-center justify-center text-2xl font-semibold">
          {isLoaderShown && (
            <div className="relative h-full w-full space-y-1 px-3">
              <Skeleton className="duration-[6000] h-full w-full bg-muted" />
              {isLoading && (
                <Zap
                  size={22}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                />
              )}
              {isError && (
                <div className="flex w-full items-center justify-center gap-1">
                  <ZapOff
                    size={22}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                  />
                  <p
                    onClick={refetch}
                    className="cursor-pointer text-sm text-destructive underline-offset-1 hover:underline"
                  >
                    Oops... Try again
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={16} className="text-red-800" />
                      </TooltipTrigger>
                      <TooltipContent sideOffset={8}>
                        <p>
                          Data may not be available for the selected location
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          )}
          {energyPotential ? (
            <div className="flex items-center justify-center sm:grid-rows-2">
              {energyPotential?.[1] === "infinity" ? (
                <Infinity
                  size={32}
                  className=" animate-pulse text-primary duration-1000"
                />
              ) : (
                <SunDim
                  size={32}
                  className=" animate-pulse text-primary duration-1000"
                />
              )}
              <p className="overflow-clip text-sm font-medium">
                {energyPotential?.[0]}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className=" flex items-center justify-start gap-1">
            <Flag size={16} />
            {isLoading && <Skeleton className="h-8 w-32 rounded-xl bg-muted" />}
            {weatherData?.city_name && weatherData?.country_code && (
              <span>
                {weatherData.city_name} {weatherData.country_code}
              </span>
            )}
          </div>
          <div className="flex items-center justify-start gap-1">
            <Sunrise size={16} />
            {isLoading && <Skeleton className="h-8 w-32 rounded-xl bg-muted" />}
            {weatherData?.sunrise && <span>Sunrise {weatherData.sunrise}</span>}
          </div>
          <div className="flex items-center justify-start gap-1">
            <Sunset size={16} />
            {isLoading && <Skeleton className="h-8 w-32 rounded-xl bg-muted" />}
            {weatherData?.sunset && <span>Sunset {weatherData.sunset}</span>}
          </div>
        </div>
      </div>
      <ChargeTimeViewer
        batteryChargingTime={batteryChargingTime}
        chargedTarget={chargedTarget}
      />
    </div>
  );
}
