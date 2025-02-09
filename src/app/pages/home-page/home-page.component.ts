import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AnimalsDataService } from "../../shared/services/data/animals-data.service";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private animalsDataService = inject(AnimalsDataService);
  private fb = inject(FormBuilder)
  @ViewChild('scrollAnchor', { static: true }) scrollAnchor!: ElementRef;
  public allAnimalsData: any = [];
  private page = 1;
  // public genderOptions = ['All', 'Male', 'Female'];
  // public kindOptions = ['All', 'Cat', 'Dog'];
  public searchForNameAndBreed = '';
  public filtersForm: any;
  animals = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getFilteredAnimalsData(this.page);
    this.filtersForm = this.fb.group({
      species: [''],
      gender: [''],
      searchForNameAndBreed: ['']
    });

    this.filtersForm.valueChanges.subscribe((formValues: any) => {
      let limit: number | undefined = undefined;
      this.page = 1;
      this.allAnimalsData = [];

      if (formValues.searchForNameAndBreed) {
        limit = 0;
      }
      this.animals.set([]);

      this.getFilteredAnimalsData(this.page, limit, formValues.species, formValues.gender, formValues.searchForNameAndBreed);
    });
    //TODO: need to fix problem with calling intersection right after init uploading data / loading val??
    setTimeout(() => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.page++;
          this.getFilteredAnimalsData(this.page, 10, this.filtersForm.value.species, this.filtersForm.value.gender, this.filtersForm.value.searchForNameAndBreed);
        }
      });

      observer.observe(this.scrollAnchor.nativeElement);
    }, 1000)
  }

  getFilteredAnimalsData(page: number = 1, limit: number = 10, species?: string, gender?: string, searchText?: string) {
    this.isLoading.set(true);
    this.animalsDataService.getFilteredAnimalsData(page, limit, species, gender, searchText).subscribe((res: any) => {
      this.animals.set([...this.animals(), ...res]);
      this.isLoading.set(false);
    })
  }
}
