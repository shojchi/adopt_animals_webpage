import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { animalListResolver } from './animal-list.resolver';

describe('animalListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => animalListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
