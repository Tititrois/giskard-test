import * as fs from 'fs';
import { MilleniumConfig } from "./configs/millenium.config";

const CONFIG_FILE_NAME = 'millennium-falcon.json';


// Singleton class to manage configuration
export class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: MilleniumConfig | null = null;

  private constructor() {
    // Load the configuration when the instance is created
    this.loadConfig();
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  private loadConfig(): void {
    try {
      const data = fs.readFileSync(CONFIG_FILE_NAME, 'utf8');
      this.config = JSON.parse(data);
    } catch (error) {
      // Handle errors, e.g., invalid JSON or missing file
      console.error('Error loading configuration:', error);
    }
  }

  public getConfig(): MilleniumConfig | null {
    return this.config;
  }
}