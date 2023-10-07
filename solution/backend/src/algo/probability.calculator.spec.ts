import { ProbabilityCalculator } from "./probability.calculator";

describe('ProbabilityCalculator', () => {
  const routes = [
    { origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },
    { origin: 'Dagobah', destination: 'Endor', travel_time: 4 },
    { origin: 'Dagobah', destination: 'Hoth', travel_time: 1 },
    { origin: 'Hoth', destination: 'Endor', travel_time: 1 },
    { origin: 'Tatooine', destination: 'Hoth', travel_time: 6 },
  ];

  const falconData = {
    autonomy: 6,
    departure: 'Tatooine',
    arrival: 'Endor',
    routes_db: 'universe.db',
  };

  it('should throw an error when start planet is not found', () => {
    const invalidStartPlanet = 'NonExistentStartPlanet';
    const calculator = new ProbabilityCalculator({
      startNodeName: invalidStartPlanet,
      objectiveNodeName: falconData.arrival,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: 7,
      bounties: [],
      routes: routes,
    });

    expect(() => calculator.calculateProbability()).toThrow(`Start planet not found: ${invalidStartPlanet}`);
  });

  it('should throw an error when objective planet is not found', () => {
    const invalidObjectivePlanet = 'NonExistentObjectivePlanet';
    const calculator = new ProbabilityCalculator({
      startNodeName: falconData.departure,
      objectiveNodeName: invalidObjectivePlanet,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: 7,
      bounties: [],
      routes: routes,
    });

    expect(() => calculator.calculateProbability()).toThrow(`Objective planet not found: ${invalidObjectivePlanet}`);
  });

  it('Scenario 1: should display 0% probability', () => {
    const empireData = {
      countdown: 7,
      bounty_hunters: [
        { planet: 'Hoth', day: 6 },
        { planet: 'Hoth', day: 7 },
        { planet: 'Hoth', day: 8 },
      ],
    };

    const calculator = new ProbabilityCalculator({
      startNodeName: falconData.departure,
      objectiveNodeName: falconData.arrival,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: empireData.countdown,
      bounties: empireData.bounty_hunters,
      routes: routes,
    });

    const probability = calculator.calculateProbability();
    expect(probability).toBe(0);
  });

  it('Scenario 2: should display 81% probability', () => {
    const empireData = {
      countdown: 8,
      bounty_hunters: [
        { planet: 'Hoth', day: 6 },
        { planet: 'Hoth', day: 7 },
        { planet: 'Hoth', day: 8 },
      ],
    };

    const calculator = new ProbabilityCalculator({
      startNodeName: falconData.departure,
      objectiveNodeName: falconData.arrival,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: empireData.countdown,
      bounties: empireData.bounty_hunters,
      routes: routes,
    });

    const probability = calculator.calculateProbability();
    expect(probability).toBe(81);
  });

  it('Scenario 3: should display 90% probability', () => {
    const empireData = {
      countdown: 9,
      bounty_hunters: [
        { planet: 'Hoth', day: 6 },
        { planet: 'Hoth', day: 7 },
        { planet: 'Hoth', day: 8 },
      ],
    };

    const calculator = new ProbabilityCalculator({
      startNodeName: falconData.departure,
      objectiveNodeName: falconData.arrival,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: empireData.countdown,
      bounties: empireData.bounty_hunters,
      routes: routes,
    });

    const probability = calculator.calculateProbability();
    expect(probability).toBe(90);
  });

  it('Scenario 4: should display 100% probability', () => {
    const empireData = {
      countdown: 10,
      bounty_hunters: [
        { planet: 'Hoth', day: 6 },
        { planet: 'Hoth', day: 7 },
        { planet: 'Hoth', day: 8 },
      ],
    };

    const calculator = new ProbabilityCalculator({
      startNodeName: falconData.departure,
      objectiveNodeName: falconData.arrival,
      milleniumAutonomy: falconData.autonomy,
      empireCountdown: empireData.countdown,
      bounties: empireData.bounty_hunters,
      routes: routes,
    });

    const probability = calculator.calculateProbability();
    expect(probability).toBe(100);
  });
});
