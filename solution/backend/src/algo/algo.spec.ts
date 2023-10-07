import { Universe } from "./algo.structures";
import { ProbabilityCalculator } from "./algo";

describe('ProbabilityCalculator', () => {
  const universeData = [
    { origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },
    { origin: 'Dagobah', destination: 'Endor', travel_time: 4 },
    { origin: 'Dagobah', destination: 'Hoth', travel_time: 1 },
    { origin: 'Hoth', destination: 'Endor', travel_time: 1 },
    { origin: 'Tatooine', destination: 'Hoth', travel_time: 6 },
  ];

  const universe = new Universe(universeData);

  const falconData = {
    autonomy: 6,
    departure: 'Tatooine',
    arrival: 'Endor',
    routes_db: 'universe.db',
  };

  it('Scenario 1: should display 0% probability', () => {
    const empireData = {
      countdown: 7,
      bounty_hunters: [
        { planet: 'Hoth', day: 6 },
        { planet: 'Hoth', day: 7 },
        { planet: 'Hoth', day: 8 },
      ],
    };

    const calculator = new ProbabilityCalculator(
      falconData.departure,
      falconData.arrival,
      falconData.autonomy,
      empireData.countdown,
      empireData.bounty_hunters,
      universe
    );

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

    const calculator = new ProbabilityCalculator(
      falconData.departure,
      falconData.arrival,
      falconData.autonomy,
      empireData.countdown,
      empireData.bounty_hunters,
      universe
    );

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

    const calculator = new ProbabilityCalculator(
      falconData.departure,
      falconData.arrival,
      falconData.autonomy,
      empireData.countdown,
      empireData.bounty_hunters,
      universe
    );

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

    const calculator = new ProbabilityCalculator(
      falconData.departure,
      falconData.arrival,
      falconData.autonomy,
      empireData.countdown,
      empireData.bounty_hunters,
      universe
    );

    const probability = calculator.calculateProbability();
    expect(probability).toBe(100);
  });
});