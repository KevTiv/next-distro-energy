import { Button } from "./ui/button";
import { InputWithErrorMsg } from "./ui/input";
import { SelectWithHover } from "./ui/select";
import {
  type BateryPercent,
  powerScale,
  useEnergyStateStore,
} from "@/store/energy";

const BATTERY_LEVEL: BateryPercent[] = ["25%", "50%", "75%", "100%"];

export function LocationInstallationDetailForm() {
  const {
    chargedTarget,
    solarPanelArea,
    batteryCapacity,
    setSolarPanelArea,
    setChargedTarget,
    setSelectedPercent,
    setPowerScale,
  } = useEnergyStateStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col px-2 font-semibold">
        Solar panel surfaces
        <p className="text-xs">
          Note: project assume solar panel efficiency of 15%
        </p>
      </label>
      <InputWithErrorMsg
        type="string"
        placeholder="Solar panel surfaces (m^2)"
        value={solarPanelArea}
        onChange={(e) => setSolarPanelArea(Number(e.target.value))}
        className="min-h-14 w-full rounded-full px-4 py-2 text-black"
        isError={!!chargedTarget && !solarPanelArea}
        errorMsg="This field cannot remain empty"
      />
      <label className="px-2 font-semibold">
        Battery Installation capacity
      </label>
      <div className="flex w-full gap-2">
        <InputWithErrorMsg
          type="string"
          placeholder="Battery Installation Capacity"
          value={batteryCapacity}
          onChange={(e) => setChargedTarget(Number(e.target.value))}
          className="min-h-14 w-full rounded-full px-4 py-2 text-black"
          isError={!!chargedTarget && !batteryCapacity}
          errorMsg="This field cannot remain empty"
        />

        <SelectWithHover
          selectOptions={
            Object.keys(powerScale).filter((key) =>
              isNaN(Number(key)),
            ) as (keyof typeof powerScale)[]
          }
          tooltip="Select unit of power"
          label="P"
          selectionLabel="Power Unit"
          setPowerScale={setPowerScale}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="px-2 font-semibold">Battery Target Level </label>
        <div className="flex w-full justify-between gap-2">
          {BATTERY_LEVEL.map((level) => (
            <Button
              key={level}
              type="submit"
              className={`min-h-14 w-full rounded-full px-6 py-2 font-semibold
              ${chargedTarget === parseInt(level ?? "100%") / 100 ? "bg-primary text-secondary hover:bg-primary" : "bg-secondary text-primary hover:bg-primary hover:text-secondary"}
            `}
              onClick={() => setSelectedPercent(level)}
              disabled={chargedTarget === level}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
