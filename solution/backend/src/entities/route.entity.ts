import { Entity, OptionalProps, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

@Entity({tableName: "routes"})
export class Route extends BaseEntity {
  @Property()
  origin: string;

  @Property()
  destination: string;

  @Property()
  travel_time: number;

  constructor() {
    super();
  }
}