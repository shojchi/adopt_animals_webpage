import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public sharedSubject = new Subject();

  constructor() {
  }

  setSharedData<T>(sharedData: T): void {
    this.sharedSubject.next(sharedData);
  }

  getSharedData<T>(): Subject<T> {
    return this.sharedSubject as Subject<T>;
  }
}
