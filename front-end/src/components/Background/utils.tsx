const internalColorOptions = {
  0: "var(--color-900)",
  1: "var(--color-900)",
  2: "var(--color-900)",
  3: "var(--color-900)",
  4: "var(--color-800)",
  5: "var(--color-700)",
  6: "var(--color-600)",
  7: "var(--color-500)",
  8: "var(--color-400)",
  9: "var(--color-300)",
  10: "var(--color-200)",
  11: "var(--color-100)",
  12: "var(--color-50)",
  13: "var(--color-50)",
  14: "var(--color-50)",
  15: "var(--color-100)",
  16: "var(--color-200)",
  17: "var(--color-300)",
  18: "var(--color-400)",
  19: "var(--color-500)",
  20: "var(--color-600)",
  21: "var(--color-700)",
  22: "var(--color-800)",
  23: "var(--color-900)",
};

const externalColorOptions = {
  0: "var(--color-950)",
  1: "var(--color-950)",
  2: "var(--color-950)",
  3: "var(--color-950)",
  4: "var(--color-950)",
  5: "var(--color-950)",
  6: "var(--color-900)",
  7: "var(--color-900)",
  8: "var(--color-900)",
  9: "var(--color-800)",
  10: "var(--color-800)",
  11: "var(--color-800)",
  12: "var(--color-700)",
  13: "var(--color-700)",
  14: "var(--color-700)",
  15: "var(--color-700)",
  16: "var(--color-800)",
  17: "var(--color-900)",
  18: "var(--color-900)",
  19: "var(--color-900)",
  20: "var(--color-950)",
  21: "var(--color-950)",
  22: "var(--color-950)",
  23: "var(--color-950)",
};

const internalIntensityOptions = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 1,
  5: 2,
  6: 3,
  7: 4,
  8: 5,
  9: 6,
  10: 7,
  11: 8,
  12: 9,
  13: 9,
  14: 9,
  15: 8,
  16: 7,
  17: 6,
  18: 5,
  19: 4,
  20: 3,
  21: 2,
  22: 1,
  23: 0,
};
const externalIntensityOptions = {
  0: 50,
  1: 50,
  2: 50,
  3: 50,
  4: 50,
  5: 50,
  6: 55,
  7: 60,
  8: 65,
  9: 70,
  10: 75,
  11: 80,
  12: 85,
  13: 85,
  14: 85,
  15: 80,
  16: 75,
  17: 70,
  18: 65,
  19: 60,
  20: 55,
  21: 50,
  22: 50,
  23: 50,
};

export type Hours = keyof typeof internalColorOptions;

export const calculateSunPositionForRadialGradient = (hour: number) => {
  const angleDeg = (hour / 24) * 360 + 90;

  // Ensure the angle wraps back to 0-360 range if it exceeds 360
  const normalizedAngle = angleDeg % 360;

  // Convert degrees to radians for trigonometric functions
  const angleRad = (normalizedAngle * Math.PI) / 180;

  // Calculate X and Y positions; assuming the center is at (50%, 50%)
  // X and Y positions move in a circle centered at (50%, 50%) with a radius of 50%
  const xPos = 50 + 50 * Math.cos(angleRad); // X position moves in a cosine wave pattern
  const yPos = 50 + 50 * Math.sin(angleRad); // Y position moves in a sine wave pattern

  // Return the position as a string in the format required for CSS (e.g., "50% 75%")
  return `${xPos}% ${yPos}%`;
};


export const calculateTheColorOfTheSkyForRadialGradient = (hour: Hours) => {



  return `${internalColorOptions[hour]} ${internalIntensityOptions[hour]}%, ${externalColorOptions[hour]} ${externalIntensityOptions[hour]}%`

};
