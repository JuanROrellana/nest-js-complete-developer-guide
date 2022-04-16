import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
export class CreateReportDto {
  @IsString()
  make: string;

  @IsNumber()
  price: number;

  @IsString()
  model: string;

  @Min(1950)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  miles: number;
}
