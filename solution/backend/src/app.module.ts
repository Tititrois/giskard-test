import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Route } from "./entities/route.entity";
import * as fs from "fs";

const CONFIG_FILE_NAME= "millennium-falcon.json";
interface Config {
  "autonomy": number,
  "departure": string,
  "arrival": string,
  "routes_db": string
}

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        const config: Config = JSON.parse(fs.readFileSync(CONFIG_FILE_NAME, 'utf8'));

        return {
          entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
          dbName: config["routes_db"],
          type: 'better-sqlite',
          port: 5432
        }
      }
    }),
    MikroOrmModule.forFeature([Route])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
