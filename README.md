# Next Distro app

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.



- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Get started
#### nvm version: v20.6.0

### step 1
```sh
    git clone https://github.com/KevTiv/next-distro-energy.git
```
### step 2
```shell
  cd next-distro-energy && yarn
```

### step 3
```shell
  yarn dev
```

then open [localhost](http://localhost:3000/) in your browser

## How to use this component
This component assume you would like to know the potential solar energy output 
your solar panel installation would take to charge a battery setup this battery
setup unit can be adjusted from W to GW.

Once you've inputed the necessarry value, add a location on the map and click on a location 
to have it selected. A query to the [weatherbit api](https://www.weatherbit.io/) will then be 
made and cached about weather data about the location based on it's geo-coordinates.

From [weatherbit api](https://www.weatherbit.io/) **aqi**: Air Quality Index and 
**ghi**: Global horizontal solar irradiance (W/m^2) is used to calculate the energy 
production your installation would have and how long it would take to charge your 
battery installation to 25%, 50%, 75%, 100%.

If all the rquired value are present you can then save the calculation value into a 
dedicated paginated table table, inspired by [shadcn task example](https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples/tasks).
Table data can filtered through using search input and sorted through using table headers.

