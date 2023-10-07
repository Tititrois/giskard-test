import { Component } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private millenniumFalconData: any; // Store JSON data
  public probability: number | null = null;

  constructor(private apiService: ApiService) {}

  // Function to handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.millenniumFalconData = JSON.parse(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  }

  // Function to calculate probability
  calculateProbability() {
    if (!this.millenniumFalconData) {
      alert('Please upload a JSON file first.');
      return;
    }

    // Send the data to the backend API
    this.apiService.calculateProbability(this.millenniumFalconData)
      .subscribe((response) => {
        this.probability = response;
      });
  }

  // Function to get probability message
  getProbabilityMessage(probability: number): string {
    if (probability === 100) {
      return 'The Millennium Falcon can reach Endor without encountering bounty hunters.';
    } else if (probability > 0) {
      return 'The Millennium Falcon can reach Endor but might be captured by bounty hunters.';
    } else {
      return 'The Millennium Falcon cannot reach Endor before the Death Star annihilates it.';
    }
  }
}
