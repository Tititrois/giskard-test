import { Universe } from "./algo/algo.structures";
import { MilleniumConfig } from "./configs/millenium.config";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Route } from "./entities/route.entity";
import { EntityRepository } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { EmpireConfig } from "./configs/empire.config";

@Injectable()
export class AppService {

  constructor(@InjectRepository(Route) private readonly routeRepository: EntityRepository<Route>) {
  }
  async calculateProbability(empireConfig: EmpireConfig, milleniumConfig: MilleniumConfig): Promise<number> {
    const allRoutes = await this.routeRepository.findAll();
    const universe = new Universe(allRoutes);


    return 0;
  }
}