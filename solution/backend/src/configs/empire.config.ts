import { IsArray, IsEmail, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class BountiesDto {
  @IsEmail()
  planet: string;

  @IsNumber()
  day: number;
}

export class EmpireConfig {
  @IsEmail()
  countdown: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BountiesDto)
  bounty_hunters: Array<BountiesDto>;
}