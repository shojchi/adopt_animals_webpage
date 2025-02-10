import { ResolveFn } from '@angular/router';
import { AnimalFullInfo } from '../../interfaces/animaData';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AnimalsDataService } from '../../services/data/animals-data.service';

export const animalDetailedResolver: ResolveFn<AnimalFullInfo> = (route): Observable<AnimalFullInfo> => {
  const animalsDataService = inject(AnimalsDataService);

  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Animal ID is required');
  }

  return animalsDataService.getAnimalDetailedData(id);
};
