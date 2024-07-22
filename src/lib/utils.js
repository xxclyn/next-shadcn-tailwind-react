import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isEmptyValue(value) {
  return !(value !== "" && value !== undefined && value !== null);
}
