import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import EnergyPreviewCard from "@/app/_components/energy-overview-card";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FAF6F6] to-[#FFFFFF] text-primary">
      <EnergyPreviewCard />
    </main>
  );
}
