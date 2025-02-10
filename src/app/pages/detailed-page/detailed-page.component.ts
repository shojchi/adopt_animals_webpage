import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { AnimalFullInfo } from '../../shared/interfaces/animaData';
import { UnsubscribeOnDestroy } from '../../shared/unsubscribeOnDestroy';

@Component({
  standalone: true,
  selector: 'app-detailed-page',
  imports: [
    MatButton,
    TitleCasePipe
  ],
  templateUrl: './detailed-page.component.html',
  styleUrl: './detailed-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedPageComponent extends UnsubscribeOnDestroy {
  private _notificationsService = inject(NotificationsService);
  private route = inject(ActivatedRoute);

  public animalData: Partial<AnimalFullInfo> = {};
  public showAdoptButton: boolean = true;

  constructor() {
    super();
    this.animalData = this.route.snapshot.data['animalData'];
  }

  makeAdoption(): void {
    this.showAdoptButton = false;
    this._notificationsService.setSharedData(this.animalData!.name);
  }
}
