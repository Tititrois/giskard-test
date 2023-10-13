import { Universe } from "./algo/calculator.structures";
import { MilleniumConfig } from "./configs/millenium.config";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Route } from "./entities/route.entity";
import { EntityRepository } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { EmpireConfig } from "./configs/empire.config";
import { ProbabilityCalculator } from "./algo/probability.calculator";
import { ConfigurationManager } from "./config.singleton";
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

@Injectable()
export class AppService {

  constructor(@InjectRepository(Route) private readonly routeRepository: EntityRepository<Route>) {
  }
  async calculateProbability(empireConfig: EmpireConfig, milleniumConfig: MilleniumConfig): Promise<number> {
    let allRoutes: Route[] = [];
    if (milleniumConfig.routes_db !== ConfigurationManager.getInstance().getConfig().routes_db) {
      allRoutes = await this.getRoutesFromAnotherDb(milleniumConfig.routes_db);
    } else {
      allRoutes = await this.routeRepository.findAll();
    }

    const probabilityCalculator = new ProbabilityCalculator({
      startPlanet: milleniumConfig.departure,
      destinationPlanet: milleniumConfig.arrival,
      bounties: empireConfig.bounty_hunters,
      milleniumAutonomy: milleniumConfig.autonomy,
      empireCountdown: empireConfig.countdown,
      routes: allRoutes,
    })

    return probabilityCalculator.calculateProbability();
  }

  public async getRoutesFromAnotherDb(dbUrl: string): Promise<Array<Route>> {
    const universeDb = await open({
      filename: dbUrl,
      driver: sqlite3.Database
    });

    const query = "SELECT * FROM routes"
    return universeDb.all(query);
  }
}