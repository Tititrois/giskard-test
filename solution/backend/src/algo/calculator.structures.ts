import { Route } from "../entities/route.entity";

export enum ActionEnum {
  Rest = "Rest",
  Refuel = "Refuel",
  TravelToPlanet = "TravelToPlanet",
}

export interface Action {
  action: ActionEnum;
  toPlanet: Planet;
  fuelAfterAction: number;
  countDownAfterAction: number
}

export class Travel {
  public currentPlanet: Planet;
  public currentFuel: number = 0;
  public fuelAutonomy: number = 0;
  public currentDay: number = 0;

  public paths: Array<{ action: ActionEnum, planet: Planet, countdown?: number }> = []
  public nbRiskedOccurrence: number = 0;

  public constructor(currentPlanet: Planet, fuelAutonomy: number) {
    this.currentPlanet = currentPlanet;
    this.fuelAutonomy = fuelAutonomy;
    this.currentFuel = fuelAutonomy;
  }

  public isTravelWithinCountdown(empireCountdown: number): boolean {
    return this.currentDay <= empireCountdown;
  }

  public isTravelReachedDestination(destinationPlanet: Planet): boolean {
    return this.currentPlanet === destinationPlanet;
  }

  public isFuelFull(): boolean {
    return this.currentFuel === this.fuelAutonomy;
  }
}

export class Universe {
  public planets: Map<string, Planet>;

  public constructor(routes: Route[]) {
    this.planets = new Map<string, Planet>();

    for (const route of routes) {
      if (!this.planets.has(route.origin)) {
        this.planets.set(route.origin, new Planet(route.origin, []));
      }
      if (!this.planets.has(route.destination)) {
        this.planets.set(route.destination, new Planet(route.destination, []));
      }
      this.planets.get(route.origin)?.children.push({planet: this.planets.get(route.destination)!, travelTime: route.travel_time});
    }
  }

  public getPlanet(planet: string): Planet {
    return this.planets.get(planet)!;
  }
}

export class Planet {
  constructor(public name: string, public children: Array<{ planet: Planet; travelTime: number }>) {
  }
}