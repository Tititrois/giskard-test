import { Bounty } from "../configs/empire.config";
import { Action, Path, Planet, Universe } from "./algo.structures";
import { Min } from "class-validator";


export class ProbabilityCalculator {
  public startNodeName: string;
  public objectiveNodeName: string;
  public milleniumAutonomy: number;
  public empireCountdown: number;
  public bounties: Array<Bounty>
  public universe: Universe;

  public constructor(startNodeName: string, objectiveNodeName: string, milleniumAutonomy: number, empireCountdown: number, bounties: Array<Bounty>, universe: Universe) {
    this.startNodeName = startNodeName;
    this.objectiveNodeName = objectiveNodeName;
    this.milleniumAutonomy = milleniumAutonomy;
    this.empireCountdown = empireCountdown;
    this.bounties = bounties;
    this.universe = universe;
  }

  public calculateProbability(): number {
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

    let ongoingPaths: Array<Path> = [new Path(startPlanet, this.milleniumAutonomy)];
    const validPaths: Array<Path> = [];

    while (ongoingPaths.length > 0) {
      const newOngoingPaths: Array<Path> = [];

      for (const path of ongoingPaths) {
        const possibleActions = this.getPossibleActions(path);

        for (const possibleAction of possibleActions) {

          // create new path
          const newPath = new Path(possibleAction.toPlanet, possibleAction.fuelAfterAction);
          newPath.currentDay = possibleAction.countDownAfterAction;
          newPath.list = [...path.list, {action: possibleAction.action, planet: possibleAction.toPlanet, countdown: possibleAction.countDownAfterAction }];
          newPath.currentDay = possibleAction.countDownAfterAction;
          newPath.nbRiskedOccurrence = path.nbRiskedOccurrence;

          const isActionAtRisked = this.bounties.some((bounty) => bounty.day === newPath.currentDay && bounty.planet === newPath.currentPlanet.name);
          if (isActionAtRisked) {
            newPath.nbRiskedOccurrence++;
          }

          if (newPath.currentDay <= this.empireCountdown) {
            if (possibleAction.toPlanet === objectivePlanet) {
              validPaths.push(newPath);
            } else {
              newOngoingPaths.push(newPath);
            }
          }
        }
      }

      ongoingPaths = newOngoingPaths;
    }

    // return valid path with lowest risked occurrence
    if (validPaths.length > 0) {
      const safestPath = validPaths.reduce((previousPath, currentPath) => {
        return previousPath.nbRiskedOccurrence < currentPath.nbRiskedOccurrence ? previousPath : currentPath
      });
      return this.calculateProbabilityWithBounties(safestPath.nbRiskedOccurrence);
    }

    return 0;
  }

  private getPossibleActions(path: Path): Array<{ action: Action; toPlanet: Planet; fuelAfterAction: number; countDownAfterAction: number }> {
    const possibleActions: Array<{ action: Action; toPlanet: Planet; fuelAfterAction: number; countDownAfterAction: number }> = [];

    if (path.currentFuel === this.milleniumAutonomy) {
      possibleActions.push({action: Action.Rest, toPlanet: path.currentPlanet, fuelAfterAction: path.currentFuel, countDownAfterAction: path.currentDay + 1});
    } else {
      possibleActions.push({
        action: Action.Refuel,
        toPlanet: path.currentPlanet,
        fuelAfterAction: this.milleniumAutonomy,
        countDownAfterAction: path.currentDay + 1,
      });
      possibleActions.push({action: Action.Rest, toPlanet: path.currentPlanet, fuelAfterAction: path.currentFuel, countDownAfterAction: path.currentDay + 1});
    }

    path.currentPlanet.children.forEach((child) => {
      if (child.travelTime <= path.currentFuel) {
        possibleActions.push({
          action: Action.TravelToPlanet,
          toPlanet: child.planet,
          fuelAfterAction: path.currentFuel - child.travelTime,
          countDownAfterAction: path.currentDay + child.travelTime,
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
}



