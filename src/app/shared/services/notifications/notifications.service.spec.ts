import { TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';
import { Subject } from 'rxjs';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get shared data', (done) => {
    const testData = { message: 'Test Notification' };

    service.getSharedData().subscribe((data) => {
      expect(data).toEqual(testData);
      done();
    });

    service.setSharedData(testData);
  });

  it('should return an instance of Subject', () => {
    const subject = service.getSharedData();
    expect(subject).toBeInstanceOf(Subject);
  });
});
