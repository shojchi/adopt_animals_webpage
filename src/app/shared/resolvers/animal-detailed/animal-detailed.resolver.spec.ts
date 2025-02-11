import { TestBed } from '@angular/core/testing';
import { animalDetailedResolver } from './animal-detailed.resolver';
import { AnimalsDataService } from '../../services/data/animals-data.service';
import { Observable, of } from 'rxjs';
import { AnimalFullInfo } from '../../interfaces/animaData';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { runInInjectionContext } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('animalDetailedResolver', () => {
  let mockAnimalsDataService: jasmine.SpyObj<AnimalsDataService>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    mockAnimalsDataService = jasmine.createSpyObj('AnimalsDataService', ['getAnimalDetailedData']);
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AnimalsDataService, useValue: mockAnimalsDataService }
      ]
    });
  });

  it('should resolve animal details using AnimalsDataService', (done) => {
    const mockData: AnimalFullInfo = {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      gender: "male",
      species: "dog",
      animalId: "123",
      age: "2 years",
      size: "L",
      intakeDate: "10/01/2023",
      onHold: false,
      spayedOrNeutered: true,
      mainPhotoUrl: "https://example.com/dog.jpg"
    };

    mockRoute = { paramMap: convertToParamMap({ id: "123" }) } as ActivatedRouteSnapshot;
    mockAnimalsDataService.getAnimalDetailedData.and.returnValue(of(mockData));

    runInInjectionContext(TestBed, () => {
      const result = animalDetailedResolver(mockRoute, mockState);

      (result as Observable<AnimalFullInfo>).subscribe((data: any) => {
        expect(mockAnimalsDataService.getAnimalDetailedData).toHaveBeenCalledWith("123");
        expect(data).toEqual(mockData);
        done();
      });
    });
  });

  it('should throw an error if no ID is provided', () => {
    mockRoute = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;

    runInInjectionContext(TestBed, () => {
      expect(() => animalDetailedResolver(mockRoute, mockState)).toThrowError('Animal ID is required');
    });
  });
});
