import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/sqlite";
import { Route } from "./entities/route.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EmpireConfig } from "./configs/empire.config";
import { AppService } from "./app.service";
import { ConfigurationManager } from "./config.singleton";
import { MilleniumConfig } from "./configs/millenium.config";

@Controller()
export class AppController {
  constructor(private appService: AppService, @InjectRepository(Route) private routeRepository: EntityRepository<Route>) {}

  @Get("routes")
  testDb(): any {
    return this.routeRepository.findAll();
  }

  @Patch("calculate-probability")
  async calculateProbabilityWithLocalBackend(@Body() empire: EmpireConfig): Promise<number> {
    return this.appService.calculateProbability(empire, ConfigurationManager.getInstance().getConfig());
  }

  @Patch("calculate-probability-with-millenium-config")
  async calculateProbabilityWithConfig(@Body("empire") empire: EmpireConfig, @Body("millenium") millenium: MilleniumConfig): Promise<number> {
    return this.appService.calculateProbability(empire, millenium);
  }
}
