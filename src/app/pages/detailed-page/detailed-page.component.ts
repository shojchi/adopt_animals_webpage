import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AnimalsDataService } from '../../shared/services/data/animals-data.service';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { AnimalFullInfo } from '../../shared/interfaces/animaData';
import { takeUntil } from 'rxjs';
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
export class DetailedPageComponent extends UnsubscribeOnDestroy implements OnInit {
  private animalsDataService = inject(AnimalsDataService);
  private _notificationsService = inject(NotificationsService);
  private route = inject(ActivatedRoute);

  public animalData: Partial<AnimalFullInfo> = {};
  public showAdoptButton: boolean = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getAnimalDetailedData();
  }

  getAnimalDetailedData(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.animalsDataService.getAnimalDetailedData(id as string)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: AnimalFullInfo) => {
      this.animalData = res
    });
  }

  makeAdoption(): void {
    this.showAdoptButton = false;
    this._notificationsService.setSharedData(this.animalData!.name);
  }
}
