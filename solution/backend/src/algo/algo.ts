import { Bounty } from "../configs/empire.config";
import { Path, Universe } from "./algo.structures";


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
      throw new Error("Start planet not found");
    }

    // get end node, throw error is not found
    const objectivePlanet = this.universe.getPlanet(this.objectiveNodeName);
    if (objectivePlanet === undefined) {
      throw new Error("Objective planet not found");
    }

    const ongoingPaths: Array<Path> = [new Path(startPlanet, this.milleniumAutonomy)];
    const validPaths: Array<Path> = [];

    while (ongoingPaths.length > 0) {
      for (const path of ongoingPaths) {
        // Do all possible actions (rest, refuel, travel). Rest and refules as value 0

        // If action TravelToPlanet, check if we have enough autonomy to travel
        // If we have enough autonomy, add the travel to the path
        // check if bounty is on the planet
        // if yes, add one to the nbRiskedOccurrence
        // if autonomy too long, do not add the travel to the path
        // if not any ongoing path, remove the path from the list

      }
    }

    return 0;
  }
}



