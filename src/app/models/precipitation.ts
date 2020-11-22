export interface PrecipitationData {
  date: Date;
  millimiters: number;
}

export interface Precipitation extends PrecipitationData {
  id: string;
}
