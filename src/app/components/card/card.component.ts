import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AnimalFullInfo } from '../../shared/interfaces/animaData';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() petData: Partial<AnimalFullInfo> = {};
}
