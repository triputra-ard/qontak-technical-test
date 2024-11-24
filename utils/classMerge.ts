import { type ClassValue, clsx } from "clsx";
export function cM(...inputs: ClassValue[]) {
  return clsx(inputs);
}
