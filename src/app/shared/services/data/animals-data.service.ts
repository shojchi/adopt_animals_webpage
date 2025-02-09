import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalsDataService {

  constructor(private http: HttpClient) {
  }

  getFilteredAnimalsData(page: number, limit?: number, species?: string, gender?: string, searchText?: string): any {
    let paginatedParams = '';
    if (limit) {
      const start = (page - 1) * limit;
      paginatedParams = `?_start=${start}&_limit=${limit}`;
    }

    let params = new HttpParams();
    if (species) params = params.set('species', species.toLowerCase());
    if (gender) params = params.set('gender', gender.toLowerCase());

    if (searchText && searchText.trim() !== '') {
      params = params.set('name_like', searchText.trim().toLowerCase());
      params = params.set('breed_like', searchText.trim().toLowerCase());
    }

    if (!limit) {
      return this.http.get(`http://localhost:3000/animalsData${paginatedParams}`, { params }).pipe(map((res: any) => {
        return res.filter((animal: any) => animal.breed.startsWith(searchText) || animal.name.startsWith(searchText));
      }));
    }

    return this.http.get(`http://localhost:3000/animalsData${paginatedParams}`, { params });
  }

  getAnimalDetailedData(id: string) {
    return this.http.get(`http://localhost:3000/animalsData/${id}`);
  }
}
