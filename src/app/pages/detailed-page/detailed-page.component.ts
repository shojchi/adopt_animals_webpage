import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AnimalsDataService } from '../../shared/services/data/animals-data.service';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';

@Component({
  standalone: true,
  selector: 'app-detailed-page',
  imports: [
    MatButton,
    TitleCasePipe
  ],
  templateUrl: './detailed-page.component.html',
  styleUrl: './detailed-page.component.scss'
})
export class DetailedPageComponent implements OnInit {
  private animalsDataService = inject(AnimalsDataService);
  private _notificationsService = inject(NotificationsService);
  private route = inject(ActivatedRoute);

  public animalData: any;
  public showAdoptButton: boolean = true;

  ngOnInit(): void {
    this.getPetData();
  }

  getPetData() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.animalsDataService.getAnimalDetailedData(id as string).subscribe(res => this.animalData = res);
    setTimeout(() => {
    }, 1000)
  }

  makeAdoption() {
    this.showAdoptButton = false;
    this._notificationsService.setSharedData(this.animalData.name);
  }
}

//TODO: add description for animalData and surface it on UI
