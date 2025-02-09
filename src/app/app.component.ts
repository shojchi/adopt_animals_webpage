import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from './shared/services/notifications/notifications.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MatToolbar, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _notificationsService = inject(NotificationsService);

  ngOnInit() {
    this._notificationsService.getSharedData().subscribe(sharedData => {
      this.openSnackBar(`You successfully adopted ${String(sharedData).charAt(0).toUpperCase() + String(sharedData).slice(1)}!`, 'Dismiss');
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  test() {
  }
}
