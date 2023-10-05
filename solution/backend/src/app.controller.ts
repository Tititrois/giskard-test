import { Controller, Get } from '@nestjs/common';
import { EntityRepository } from "@mikro-orm/sqlite";
import { Route } from "./entities/route.entity";
import { InjectRepository } from "@mikro-orm/nestjs";

@Controller()
export class AppController {
  constructor(@InjectRepository(Route) private readonly routeRepository: EntityRepository<Route>) {}

  @Get()
  getHello(): string {
    return "test";
  }

  @Get("routes")
  testDb(): any {
    return this.routeRepository.findAll();
  }
}
