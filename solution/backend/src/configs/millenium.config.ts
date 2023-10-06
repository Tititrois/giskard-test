import { IsNumber, IsString } from "class-validator";

export class MilleniumConfig {
  @IsNumber()
  autonomy: number;

  @IsString()
  departure: string;

  @IsString()
  arrival: string;

  @IsString()
  routes_db: string;
}