import { Body, Controller, Get, Post } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/sqlite";
import { Route } from "./entities/route.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EmpireConfig } from "./configs/empire.config";

@Controller()
export class AppController {
  constructor(@InjectRepository(Route) private readonly routeRepository: EntityRepository<Route>) {}

  @Get("routes")
  testDb(): any {
    return this.routeRepository.findAll();
  }

  @Post()
  calculateProbabilityWithLocalBackend(@Body() empire: EmpireConfig): string {
    return "test";
  }
}
