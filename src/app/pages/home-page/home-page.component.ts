import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AnimalsDataService } from "../../shared/services/data/animals-data.service";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalFullInfo } from '../../shared/interfaces/animaData';
import { FiltersForm } from '../../shared/interfaces/filtersForm';
import { UnsubscribeOnDestroy } from '../../shared/unsubscribeOnDestroy';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [
    CardComponent,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MatProgressSpinner
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('scrollAnchor', { static: true }) scrollAnchor!: ElementRef;

  private animalsDataService = inject(AnimalsDataService);
  private fb: FormBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private page = 1;

  public filtersForm: FormGroup;
  animals: WritableSignal<AnimalFullInfo[]> = signal<AnimalFullInfo[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    super();
    this.filtersForm = this.fb.group({
      species: [''],
      gender: [''],
      searchForNameAndBreed: ['']
    });

    this.animals.set(this.route.snapshot.data['animalsData'] || []);
  }

  ngOnInit(): void {
    this.setupFormListener();
    this.setupInfiniteScroll();
  }

  private setupFormListener(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValues: FiltersForm) => {
        this.page = 1;
        this.animals.set([]);
        this.getFilteredAnimalsData(this.page, 10, formValues.species, formValues.gender, formValues.searchForNameAndBreed);
      });
  }

  private setupInfiniteScroll(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.page++;
        this.getFilteredAnimalsData(this.page, 10, this.filtersForm.value.species, this.filtersForm.value.gender, this.filtersForm.value.searchForNameAndBreed);
      }
    });

    observer.observe(this.scrollAnchor.nativeElement);
  }

  getFilteredAnimalsData(page: number = 1, limit: number = 10, species?: string, gender?: string, searchText?: string): void {
    this.isLoading.set(true);
    this.animalsDataService.getFilteredAnimalsData(page, limit, species, gender, searchText)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: AnimalFullInfo[]) => {
        this.animals.set([...this.animals(), ...res]);
        this.isLoading.set(false);
      })
  }
}
