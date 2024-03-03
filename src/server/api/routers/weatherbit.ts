import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import {
  getCurrentWeatherParams,
  type ParamsKey,
  type CurrentWeatherResponse,
  currentWeatherResponse,
} from "../types/wethaerbit.types";

export const weatherBitRouter = createTRPCRouter({
  getCurrentWeather: publicProcedure
    .input(getCurrentWeatherParams)
    .query(async ({ input }) => {
      if (!input.lat || !input.lon) {
        throw new Error("Missing valid coordinates parameter");
      }

      let queryParams = "";
      let apiUrl = `${env.WEATHERBIT_API_URL}/current/?key=${env.WEATHERBIT_API_TOKEN}`;

      Object.keys(input).forEach((key) => {
        if (input[key as ParamsKey]) {
          queryParams += `&${key}=${input[key as ParamsKey]}`;
        }
      });

      const weatherResult = await axios.get<CurrentWeatherResponse>(
        `${apiUrl}${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      switch (weatherResult.status) {
        case 200:
          return currentWeatherResponse.parse(weatherResult.data).data[0];
        case 400:
          throw new Error(
            `${weatherResult.status} - ${weatherResult.statusText}`,
          );
        default:
          throw new Error(`Unknown error - ${weatherResult.status}`);
      }
    }),
});
