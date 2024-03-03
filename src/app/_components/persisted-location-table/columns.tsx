"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { SavedGeoJson, useLocationStore } from "@/store/locations";

export const columns: ColumnDef<SavedGeoJson>[] = [
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("city")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "forecastOutput",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Forecast Output" />
    ),
    cell: ({ row }) => {
      const { locations } = useLocationStore();
      const forecastOutput = locations
        ?.filter((location) => location.forecastOutput !== undefined)
        .find(
          (location) => location.forecastOutput === row.original.forecastOutput,
        )?.forecastOutput;

      return (
        <div className="flex space-x-2">
          {/* {forecastOutput && <Badge variant="outline">{forecastOutput}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("forecastOutput")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "batteryChargePercent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Charge Target" />
    ),
    cell: ({ row }) => {
      const { locations } = useLocationStore();
      const percent = locations.find(
        (location) =>
          location.batteryChargePercent ===
          row.getValue("batteryChargePercent"),
      )?.batteryChargePercent;

      if (!percent) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{percent}</span>
        </div>
      );
    },
    filterFn: (row, batteryChargePercent, value) => {
      return value.includes(row.getValue(batteryChargePercent));
    },
  },
  {
    accessorKey: "batteryChargingTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Charge Time" />
    ),
    cell: ({ row }) => {
      const { locations } = useLocationStore();
      const batteryChargingTime = locations.find(
        (location) =>
          location.batteryChargingTime === row.getValue("batteryChargingTime"),
      )?.batteryChargingTime;

      if (!batteryChargingTime) {
        return null;
      }

      return (
        <div className="flex items-center">
          {/* {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{batteryChargingTime}</span>
        </div>
      );
    },
    filterFn: (row, batteryChargingTime, value) => {
      return value.sort(row.getValue(batteryChargingTime));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
