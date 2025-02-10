import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnimalsDataService } from './animals-data.service';
import { AnimalFullInfo } from '../../interfaces/animaData';

describe('AnimalsDataService', () => {
  let service: AnimalsDataService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/animalsData';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalsDataService]
    });
    service = TestBed.inject(AnimalsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilteredAnimalsData', () => {
    it('should make a GET request with correct parameters', () => {
      const mockResponse: AnimalFullInfo[] = [
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
          mainPhotoUrl: "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg"
        }
      ];

      service.getFilteredAnimalsData(1, 10, 'Dog', 'Male', 'Buddy').subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url.includes(apiUrl) &&
        req.params.has('species') &&
        req.params.has('gender') &&
        req.params.has('name_like')
      );
      req.flush(mockResponse);
    });

    it('should filter results manually when limit is not set but searchText is', () => {
      const mockResponse: AnimalFullInfo[] = [
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
          mainPhotoUrl: "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg"
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
          mainPhotoUrl: "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg"
        }
      ];

      service.getFilteredAnimalsData(1, undefined, undefined, undefined, 'max').subscribe(data => {
        expect(data).toEqual([{
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
          mainPhotoUrl: "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg"
        }]);
      });

      const req = httpMock.expectOne(apiUrl + '?name_like=max&breed_like=max');
      req.flush(mockResponse);
    });
  });

  describe('getAnimalDetailedData', () => {
    it('should fetch animal details by ID', () => {
      const mockAnimal: AnimalFullInfo = {
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
        mainPhotoUrl: "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/339c/live/f334f090-6393-11ef-b43e-6916dcba5cbf.jpg"
      };

      service.getAnimalDetailedData('1').subscribe(data => {
        expect(data).toEqual(mockAnimal);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockAnimal);
    });
  });
});
