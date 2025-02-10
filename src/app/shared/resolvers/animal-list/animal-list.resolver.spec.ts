import { TestBed } from '@angular/core/testing';
import { animalListResolver } from './animal-list.resolver';
import { AnimalsDataService } from '../../services/data/animals-data.service';
import { of } from 'rxjs';
import { AnimalFullInfo } from '../../interfaces/animaData';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { runInInjectionContext } from '@angular/core';

describe('animalListResolver', () => {
  let mockAnimalsDataService: jasmine.SpyObj<AnimalsDataService>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    mockAnimalsDataService = jasmine.createSpyObj('AnimalsDataService', ['getFilteredAnimalsData']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AnimalsDataService, useValue: mockAnimalsDataService }
      ]
    });

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
  });

  it('should resolve animal data using AnimalsDataService', (done) => {
    const mockData: AnimalFullInfo[] = [
      {
        id: 1,
        name: "max",
        breed: "labrador retriever",
        gender: "male",
        species: "dog",
        animalId: "test",
        age: "1 year",
        size: "M",
        intakeDate: "10/01/2020",
        onHold: false,
        spayedOrNeutered: false,
        mainPhotoUrl: "https://example.com/dog.jpg"
      },
      {
        id: 2,
        name: "charlie",
        breed: "bulldog",
        gender: "female",
        species: "cat",
        animalId: "test",
        age: "1 year",
        size: "M",
        intakeDate: "10/01/2020",
        onHold: false,
        spayedOrNeutered: false,
        mainPhotoUrl: "https://example.com/cat.jpg"
      }
    ];

    mockAnimalsDataService.getFilteredAnimalsData.and.returnValue(of(mockData));

    runInInjectionContext(TestBed, () => {
      const result = animalListResolver(mockRoute, mockState); // Викликаємо resolver у контексті

      if (result instanceof Promise) {
        result.then((data) => {
          expect(mockAnimalsDataService.getFilteredAnimalsData).toHaveBeenCalledWith(1, 10);
          expect(data).toEqual(mockData);
          done();
        });
      } else if ('subscribe' in result) {
        result.subscribe((data) => {
          expect(mockAnimalsDataService.getFilteredAnimalsData).toHaveBeenCalledWith(1, 10);
          expect(data).toEqual(mockData);
          done();
        });
      } else {
        fail('Expected an Observable or Promise but got something else');
      }
    });
  });
});
