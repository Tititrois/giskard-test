import { IsArray, IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class Bounty {
  @IsString()
  planet: string;

  @IsNumber()
  day: number;
}

export class EmpireConfig {
  @IsNumber()
  countdown: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Bounty)
  bounty_hunters: Array<Bounty>;
}