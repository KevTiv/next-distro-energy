import "@/styles/globals.css";

import { DM_Sans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const dm_sns = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NextJs Distro App",
  description: "Created by Kevin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${dm_sns.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
