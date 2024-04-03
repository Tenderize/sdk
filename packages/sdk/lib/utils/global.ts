import type { Address, Hex } from "viem";

const maxBits = 96n;
const maxValue = 2n ** maxBits - 1n;
export const getUnlockID = (unlock: Hex) => {
  const id = BigInt(unlock);
  // Extract the address (first 20 bytes) and uint96 (next 12 bytes)
  id >> maxBits;
  return id & maxValue;
};

export const formatMaturity = (maturity: number) => {
  if (maturity >= 604800) {
    const weeks = Math.floor(maturity / 604800);
    return `~ ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }
  if (maturity >= 86400) {
    const days = Math.floor(maturity / 86400);
    return `~ ${days} ${days === 1 ? "day" : "days"}`;
  }
  if (maturity >= 3600) {
    const hours = Math.floor(maturity / 3600);
    return `~ ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  if (maturity >= 60) {
    const minutes = Math.floor(maturity / 60);
    return `~ ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
  maturity = Math.floor(maturity);
  return `~ ${maturity} ${maturity === 1 ? "second" : "seconds"}`;
};

export const isMutationPending = (status: string) => {
  return status === "pending";
};

export const formatAddress = (address: Address): string => {
  if (address?.length < 10) {
    return address; // If the length is less than 10, return the original address
  }
  const start = address?.substring(0, 6);
  const end = address?.substring(address.length - 4);
  return `${start}....${end}`;
};
export const colorToHSL = (color: string): string => {
  let r = 0,
    g = 0,
    b = 0;

  // Check if the color is in HEX format
  if (color.startsWith("#")) {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else if (color.length === 7) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
  }

  // Check if the color is in RGB format
  if (color.startsWith("rgb")) {
    const match = color.match(/\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }
  }

  // Normalize RGB values
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // Find the maximum and minimum values to calculate the hue
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red:
        h = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        h = (blue - red) / d + 2;
        break;
      case blue:
        h = (red - green) / d + 4;
        break;
    }
    h *= 60;
  }

  // Convert hue to degrees and saturation and lightness to percentage
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};

export const applyColorsToRoot = (colors: {
  [key: string]: string | { [subKey: string]: string };
}) => {
  const root = document.documentElement;
  for (const key in colors) {
    if (Object.prototype.hasOwnProperty.call(colors, key)) {
      const value = colors[key];
      if (typeof value === "string") {
        // If the value is a string, directly set the property
        root.style.setProperty(`--${key}`, colorToHSL(value));
      } else if (typeof value === "object") {
        // If the value is an object, loop through its properties
        for (const subKey in value) {
          if (Object.prototype.hasOwnProperty.call(value, subKey)) {
            const subValue = value[subKey];
            // Use DEFAULT only for the main property
            const propertyName =
              subKey === "DEFAULT" ? key : `${key}-${subKey}`;
            root.style.setProperty(`--${propertyName}`, colorToHSL(subValue));
          }
        }
      }
    }
    console.log("root.style", root.style);
  }
};
