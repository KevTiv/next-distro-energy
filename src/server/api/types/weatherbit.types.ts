import { z } from "zod";

export const getCurrentWeatherParams = z.object({
  lat: z.number(),
  lon: z.number(),
});
export type ParamsKey = keyof z.infer<typeof getCurrentWeatherParams>;

export const WeatherDescription = z.object({
  description: z.string(),
  code: z.number(),
  icon: z.string(),
});

export const weatherData = z.object({
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

export const currentWeatherResponse = z.object({
  count: z.number(),
  data: z.array(weatherData),
});

export type CurrentWeatherResponse = z.infer<typeof currentWeatherResponse>;
