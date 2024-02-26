/// <reference types="vite-plugin-svgr/client" />

import DaySunny from '@/assets/conditionIcons/day/sunny.svg?react';
import DayCloudy from '@/assets/conditionIcons/day/cloudy.svg?react';
import DayRainy from '@/assets/conditionIcons/day/rainy.svg?react';
import DaySnowy from '@/assets/conditionIcons/day/snowy.svg?react';
import DayStormy from '@/assets/conditionIcons/day/stormy.svg?react';
import DayWindy from '@/assets/conditionIcons/day/windy.svg?react';
import NightSunny from '@/assets/conditionIcons/night/sunny.svg?react';
import NightCloudy from '@/assets/conditionIcons/night/cloudy.svg?react';
import NightRainy from '@/assets/conditionIcons/night/rainy.svg?react';
import NightSnowy from '@/assets/conditionIcons/night/snowy.svg?react';
import NightStormy from '@/assets/conditionIcons/night/stormy.svg?react';
import NightWindy from '@/assets/conditionIcons/night/windy.svg?react';
import logo from '@/assets/logo.svg?react';
import navigation from '@/assets/navigation.svg?react';
import sunrise from '@/assets/sun/sunrise.svg?react';
import sunset from '@/assets/sun/sunset.svg?react';
import pressure from '@/assets/measurements/pressure.svg?react';
import humidity from '@/assets/measurements/humidity.svg?react';
import wind from '@/assets/measurements/wind.svg?react';
import uv from '@/assets/measurements/uv.svg?react';
import close from '@/assets/close.svg?react';

const dayConditions = {
  sunny: DaySunny,
  cloudy: DayCloudy,
  rainy: DayRainy,
  snowy: DaySnowy,
  stormy: DayStormy,
  windy: DayWindy,
};

const nightConditions = {
  sunny: NightSunny,
  cloudy: NightCloudy,
  rainy: NightRainy,
  snowy: NightSnowy,
  stormy: NightStormy,
  windy: NightWindy,
};


const ConditionIcon = {
  day: dayConditions,
  night: nightConditions,
};

const sun = {
  rise: sunrise,
  set: sunset,
}

const measurements = {
  pressure,
  humidity,
  wind,
  uv,
}

export const Icons = {
  condition: ConditionIcon,
  logo,
  navigation,
  sun,
  measurements,
  close,
}
