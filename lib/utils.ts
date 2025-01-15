import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateDate(date:String){
   return new Date(date).toLocaleDateString("en-US", { 
    day: "numeric", 
    month: "long", 
    year: "numeric"
  });
}


export function parseServerActionResponse<T>(response:T){
  return JSON.parse(JSON.stringify(response))
}