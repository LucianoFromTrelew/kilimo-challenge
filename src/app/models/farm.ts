export interface Farm {
  name: string;
  acres: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  accumulatedPrecipitations: number
}
