import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";

const getCurrentWeatherParams = z.object({
  lat: z.number(),
  lon: z.number(),
});
type ParamsKey = keyof z.infer<typeof getCurrentWeatherParams>;

const WeatherDescription = z.object({
  description: z.string(),
  code: z.number(),
  icon: z.string(),
});

const weatherData = z.object({
  app_temp: z.number(),
  aqi: z.number(),
  city_name: z.string(),
  clouds: z.number(),
  country_code: z.string(),
  datetime: z.string(),
  dewpt: z.number(),
  dhi: z.number(),
  dni: z.number(),
  elev_angle: z.number(),
  ghi: z.number(),
  gust: z.number().optional(),
  h_angle: z.number(),
  lat: z.number(),
  lon: z.number(),
  ob_time: z.string(),
  pod: z.string(),
  precip: z.number(),
  pres: z.number(),
  rh: z.number(),
  slp: z.number(),
  snow: z.number(),
  solar_rad: z.number(),
  sources: z.array(z.string()),
  state_code: z.string(),
  station: z.string(),
  sunrise: z.string(),
  sunset: z.string(),
  temp: z.number(),
  timezone: z.string(),
  ts: z.number(),
  uv: z.number(),
  vis: z.number(),
  weather: WeatherDescription,
  wind_cdir: z.string(),
  wind_cdir_full: z.string(),
  wind_dir: z.number(),
  wind_spd: z.number(),
});
export type WeatherData = z.infer<typeof weatherData>;
const currentWeatherResponse = z.object({
  count: z.number(),
  data: z.array(weatherData),
});

type CurrentWeatherResponse = z.infer<typeof currentWeatherResponse>;

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
