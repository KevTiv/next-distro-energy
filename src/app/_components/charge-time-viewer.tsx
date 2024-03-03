import { BatteryCharging, Zap } from "lucide-react";
import { Progress } from "./ui/progress";

type ChargeTimeViewerProps = {
  batteryChargingTime?: string;
  chargedTarget?: number;
};

export function ChargeTimeViewer({
  batteryChargingTime,
  chargedTarget,
}: ChargeTimeViewerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 items-center gap-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <BatteryCharging className="text-secondary" size={32} />
          Charging time
        </h3>
        <div className="col-span-2 flex items-center gap-1">
          {batteryChargingTime && chargedTarget && (
            <p className=" flex w-full items-center gap-2">
              {batteryChargingTime} to {chargedTarget * 100} %
              <Zap
                size={16}
                className="font-thin text-primary text-yellow-400"
              />
            </p>
          )}
        </div>
      </div>
      <Progress
        value={(chargedTarget ?? 0) * 100}
        className="h-2 w-full rounded-full bg-gray-100"
      />
    </div>
  );
}
