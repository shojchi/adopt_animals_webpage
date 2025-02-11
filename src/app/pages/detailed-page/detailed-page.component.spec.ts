import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPageComponent } from './detailed-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';

describe('DetailedPageComponent', () => {
  let component: DetailedPageComponent;
  let fixture: ComponentFixture<DetailedPageComponent>;
  let notificationsServiceMock: jasmine.SpyObj<NotificationsService>;

  beforeEach(async () => {
    notificationsServiceMock = jasmine.createSpyObj('NotificationsService', ['setSharedData']);

    await TestBed.configureTestingModule({
      imports: [DetailedPageComponent],
      providers: [
        { provide: NotificationsService, useValue: notificationsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                animalData: {
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
                }
              }
            },
            paramMap: of({ get: () => 'mock-id' })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call makeAdoption and update the state', () => {
    component.makeAdoption();

    expect(component.showAdoptButton).toBeFalse();

    expect(notificationsServiceMock.setSharedData).toHaveBeenCalledWith('Buddy');
  });
});
