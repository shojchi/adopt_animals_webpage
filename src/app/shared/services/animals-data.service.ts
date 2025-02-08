import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalsDataService {

  constructor(private http: HttpClient) {
  }

  getFilteredAnimalsData(page: number, species?: string, gender?: string, size?: string): any {
    const limit = 10;
    const start = (page - 1) * limit;

    let params = new HttpParams();
    if (species) params = params.set('species', species.toLowerCase());
    if (gender) params = params.set('gender', gender.toLowerCase());
    if (size) {
      let formattedSize = '';
      switch (size.toLowerCase()) {
        case 'small':
          formattedSize = 'S'
          break;
        case 'medium':
          formattedSize = 'M'
          break;
        case 'large':
          formattedSize = 'L'
          break;
      }
      params = params.set('size', formattedSize);
    }

    return this.http.get(`http://localhost:3000/animalsData?_start=${start}&_limit=${limit}`, { params });
  }

  getAnimalDetailedData(id: string) {
    return this.http.get(`http://localhost:3000/animalsData/${id}`);
  }
}
