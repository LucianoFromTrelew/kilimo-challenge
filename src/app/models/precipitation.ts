export interface PrecipitationFormValues {
  date: Date;
  millimeters: number;
}

export interface PrecipitationData extends PrecipitationFormValues {}

export interface Precipitation extends PrecipitationData {
  id: string;
}
