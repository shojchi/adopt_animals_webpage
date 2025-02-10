import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimalFullInfo } from '../../interfaces/animaData';
import { AnimalsDataService } from '../../services/data/animals-data.service';

export const animalListResolver: ResolveFn<AnimalFullInfo[]> = (): Observable<AnimalFullInfo[]> => {
  const animalsDataService = inject(AnimalsDataService);
  return animalsDataService.getFilteredAnimalsData(1, 10);
};
