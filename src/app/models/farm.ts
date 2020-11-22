export interface FarmData {
  name: string;
  acres: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  accumulatedPrecipitations: number;
}
export interface Farm extends FarmData {
  id: string;
}
