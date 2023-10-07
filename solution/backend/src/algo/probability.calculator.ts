import { Bounty } from "../configs/empire.config";
import { ActionEnum, Travel, Planet, Universe, Action } from "./calculator.structures";
import { Route } from "../entities/route.entity";


export class ProbabilityCalculator {
  public startNodeName: string;
  public objectiveNodeName: string;
  public milleniumAutonomy: number;
  public empireCountdown: number;
  public bounties: Array<Bounty>
  public universe: Universe;

  public constructor(startNodeName: string, objectiveNodeName: string, milleniumAutonomy: number, empireCountdown: number, bounties: Array<Bounty>, routes: Array<Route>) {
    this.startNodeName = startNodeName;
    this.objectiveNodeName = objectiveNodeName;
    this.milleniumAutonomy = milleniumAutonomy;
    this.empireCountdown = empireCountdown;
    this.bounties = bounties;
    this.universe = new Universe(routes);
  }

  public calculateProbability(): number {
    const [startPlanet, objectivePlanet] = this.checkAndGetStartAndObjectivePlanets();

    let ongoingTravels: Array<Travel> = [new Travel(startPlanet, this.milleniumAutonomy)];
    const validTravels: Array<Travel> = [];

    let isTravelToExplore = ongoingTravels.length > 0;

    while (isTravelToExplore) {
      const newOngoingTravels: Array<Travel> = [];

      for (const ongoingTravel of ongoingTravels) {
        const possibleActions = this.getPossibleActions(ongoingTravel);

        for (const possibleAction of possibleActions) {
          const updatedTravel = this.updateTravel(ongoingTravel, possibleAction);

          this.updateTravelRisk(updatedTravel);

          if (updatedTravel.isTravelWithinCountdown(this.empireCountdown)) {
            if (updatedTravel.isTravelReachedDestination(objectivePlanet)) {
              validTravels.push(updatedTravel);
            } else {
              newOngoingTravels.push(updatedTravel);
            }
          }
        }
      }

      ongoingTravels = newOngoingTravels;
      isTravelToExplore = ongoingTravels.length > 0;
    }

    const isAnyValidTravel = validTravels.length > 0;
    if (isAnyValidTravel) {
      const safestTravel = this.safestTravel(validTravels);
      return this.calculateProbabilityWithBounties(safestTravel.nbRiskedOccurrence);
    }

    return 0;
  }

  private getPossibleActions(travel: Travel): Array<Action> {
    const possibleActions: Array<Action> = [];

    if (travel.isFuelFull()) {
      possibleActions.push({
        action: ActionEnum.Rest,
        toPlanet: travel.currentPlanet,
        fuelAfterAction: travel.currentFuel,
        countDownAfterAction: travel.currentDay + 1,
      });
    } else {
      possibleActions.push({
        action: ActionEnum.Refuel,
        toPlanet: travel.currentPlanet,
        fuelAfterAction: this.milleniumAutonomy,
        countDownAfterAction: travel.currentDay + 1,
      });
      possibleActions.push({
        action: ActionEnum.Rest,
        toPlanet: travel.currentPlanet,
        fuelAfterAction: travel.currentFuel,
        countDownAfterAction: travel.currentDay + 1,
      });
    }

    travel.currentPlanet.children.forEach((child) => {
      if (child.travelTime <= travel.currentFuel) {
        possibleActions.push({
          action: ActionEnum.TravelToPlanet,
          toPlanet: child.planet,
          fuelAfterAction: travel.currentFuel - child.travelTime,
          countDownAfterAction: travel.currentDay + child.travelTime,
        })
      }
    });

    return possibleActions;
  }

  private calculateProbabilityWithBounties(riskExposure: number): number {
    if (riskExposure === 0) {
      return 100;
    }

    let probability = 0

    for (let i = 0; i < riskExposure; i++) {
      probability += (9 ** i) / 10 ** (i + 1);
    }

    return (1 - probability) * 100;
  }

  private checkAndGetStartAndObjectivePlanets(): [startPlanet: Planet, objectivePlanet: Planet] {
    // get start planet, throw error is not found
    const startPlanet = this.universe.getPlanet(this.startNodeName);
    if (startPlanet === undefined) {
      throw new Error(`Start planet not found: ${this.startNodeName}`);
    }

    // get end node, throw error is not found
    const objectivePlanet = this.universe.getPlanet(this.objectiveNodeName);
    if (objectivePlanet === undefined) {
      throw new Error(`Objective planet not found: ${this.objectiveNodeName}`);
    }

    return [startPlanet, objectivePlanet];
  }

  private updateTravelRisk(travel: Travel): void {
    const isBountyAtCurrentPlanet = this.bounties.some((bounty) => bounty.day === travel.currentDay && bounty.planet === travel.currentPlanet.name);
    if (isBountyAtCurrentPlanet) {
      travel.nbRiskedOccurrence++;
    }
  }

  private safestTravel(travels: Array<Travel>): Travel {
    return travels.reduce((previousTravel, currentTravel) => {
      return previousTravel.nbRiskedOccurrence < currentTravel.nbRiskedOccurrence ? previousTravel : currentTravel
    });
  }

  private updateTravel(currentTravel: Travel, action: Action): Travel {
    const updatedTravel = new Travel(action.toPlanet, action.fuelAfterAction);
    updatedTravel.currentDay = action.countDownAfterAction;
    updatedTravel.paths = [...currentTravel.paths, {action: action.action, planet: action.toPlanet, countdown: action.countDownAfterAction}];
    updatedTravel.currentDay = action.countDownAfterAction;
    updatedTravel.nbRiskedOccurrence = currentTravel.nbRiskedOccurrence;
    updatedTravel.currentFuel = action.fuelAfterAction;
    return updatedTravel;
  }
}



