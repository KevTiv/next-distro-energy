"use client";
// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples/tasks

import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type SavedGeoJson, useLocationStore } from "@/store/locations";

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
      return (
        <div className="flex space-x-2">
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
      return (
        <div className="flex w-[100px] items-center">
          {row.getValue("batteryChargePercent")}
        </div>
      );
    },
  },
  {
    accessorKey: "batteryChargingTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Charge Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("batteryChargingTime")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
