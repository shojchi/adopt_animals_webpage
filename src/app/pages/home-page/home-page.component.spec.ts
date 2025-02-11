import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { AnimalsDataService } from '../../shared/services/data/animals-data.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ElementRef } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// Mock Data
const mockAnimals = [
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

// Mock Services
const mockAnimalsDataService = {
  getFilteredAnimalsData: jasmine.createSpy('getFilteredAnimalsData').and.returnValue(of(mockAnimals))
};

const mockActivatedRoute = {
  snapshot: { data: { animalsData: mockAnimals } }
};

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        { provide: AnimalsDataService, useValue: mockAnimalsDataService },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideAnimations()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    component.scrollAnchor = new ElementRef(document.createElement('div'));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize animals with route data', () => {
    expect(component.animals()).toEqual(mockAnimals);
  });

  it('should call getFilteredAnimalsData when form changes', fakeAsync(() => {
    component.filtersForm.setValue({ species: 'Dog', gender: 'Male', searchForNameAndBreed: '' });
    tick(500);
    expect(mockAnimalsDataService.getFilteredAnimalsData).toHaveBeenCalledWith(1, 10, 'Dog', 'Male', '');
  }));

  // xit('should load more animals on scroll', fakeAsync(() => {
  //   spyOn(component, 'getFilteredAnimalsData');
  //   component.page = 1;
  //   component.setupInfiniteScroll();
  //   component.getFilteredAnimalsData(component.page + 1);
  //   tick(500);
  //   expect(component.getFilteredAnimalsData).toHaveBeenCalled();
  // }));
});
