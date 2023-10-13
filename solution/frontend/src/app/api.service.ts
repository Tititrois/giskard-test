import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  calculateProbability(data: any): Observable<any> {
    // Adjust the endpoint URL as needed
    const endpoint = `${this.apiUrl}/calculate-probability`;
    return this.http.patch(endpoint, data);
  }
}
