export interface FarmFormValues {
  name: string;
  acres: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FarmData extends FarmFormValues {
  accumulatedPrecipitations: number;
}

export interface Farm extends FarmData {
  id: string;
}
