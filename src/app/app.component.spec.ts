import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { NotificationsService } from './shared/services/notifications/notifications.service';
import { AppComponent } from './app.component';

class MockNotificationsService {
  private sharedDataSubject = new Subject<string>();

  getSharedData() {
    return this.sharedDataSubject.asObservable();
  }

  emitData(value: string) {
    this.sharedDataSubject.next(value);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockNotificationsService: MockNotificationsService;

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockNotificationsService = new MockNotificationsService();

    await TestBed.configureTestingModule({
      imports: [RouterModule, AppComponent],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: ActivatedRoute, useValue: { paramMap: of({}) } }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should open snack bar when receiving shared data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spyOn(component, 'openSnackBar').and.callThrough();

    fixture.detectChanges();

    mockNotificationsService.emitData('test message');

    fixture.whenStable().then(() => {
      expect(component.openSnackBar).toHaveBeenCalledWith(
        'You successfully adopted Test message!',
        'Dismiss'
      );
    });
  });

  it('should call MatSnackBar.open when openSnackBar is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const message = 'Test Message';
    const action = 'Close';

    component.openSnackBar(message, action);

    expect(mockSnackBar.open).toHaveBeenCalledWith(message, action);
  });
});
