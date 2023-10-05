import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Route } from "./entities/route.entity";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'database/universe.db',
      type: 'better-sqlite',
      port: 5432
    }),
    MikroOrmModule.forFeature([Route])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
