import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Route } from "./entities/route.entity";
import { ConfigurationManager } from "./config.singleton";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        const config = ConfigurationManager.getInstance().getConfig();

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
