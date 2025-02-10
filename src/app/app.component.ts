import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from './shared/services/notifications/notifications.service';
import { takeUntil } from 'rxjs';
import { UnsubscribeOnDestroy } from './shared/unsubscribeOnDestroy';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MatToolbar, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends UnsubscribeOnDestroy implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _notificationsService = inject(NotificationsService);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._notificationsService.getSharedData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(sharedData => {
      this.openSnackBar(`You successfully adopted ${String(sharedData).charAt(0).toUpperCase() + String(sharedData).slice(1)}!`, 'Dismiss');
    })
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }
}
