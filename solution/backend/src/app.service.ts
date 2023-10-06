import { Injectable } from '@nestjs/common';
import { EmpireConfig } from "./configs/empire.config";

@Injectable()
export class AppService {
  calculateProbability(empireConfig: EmpireConfig, milleniumConfig): number {
    return 0;
  }
}

