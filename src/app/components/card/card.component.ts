import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TitleCasePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() petData: any;
  private router = inject(Router);

  ngOnInit(): void {
  }

  goToDetailsPage(id: number) {
    this.router.navigate(['/details'], { queryParams: { id } });
  }
}
