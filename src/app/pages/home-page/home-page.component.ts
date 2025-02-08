import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AnimalsDataService } from "../../shared/services/animals-data.service";
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [
    CardComponent,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule
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
  public genderOptions = ['Male', 'Female'];
  public kindOptions = ['Cat', 'Dog'];
  public sizeOptions = ['Small', 'Medium', 'Large'];
  public filtersForm: any;
  private filterRecentlyApplied: boolean = false;


  ngOnInit(): void {
    this.getFilteredAnimalsData(this.page);
    this.filtersForm = this.fb.group({
      species: [''],
      gender: [''],
      size: ['']
    });

    this.filtersForm.valueChanges.subscribe((formValues: any) => {
      this.page = 1;
      this.filterRecentlyApplied = !!(formValues.species || formValues.gender || formValues.size);
      this.getFilteredAnimalsData(this.page, formValues.species, formValues.gender, formValues.size);
    });
    //TODO: need to fix problem with calling intersection right after init uploading data / loading val??
    setTimeout(() => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.page++;
          this.getFilteredAnimalsData(this.page, this.filtersForm.value.species, this.filtersForm.value.gender, this.filtersForm.value.size);
        }
      });

      observer.observe(this.scrollAnchor.nativeElement);
    }, 1000)
  }

  getFilteredAnimalsData(page: number = 1, species?: string, gender?: string, size?: string) {
    this.animalsDataService.getFilteredAnimalsData(page, species, gender, size).subscribe((res: any) => {
      if (this.filterRecentlyApplied) {
        this.allAnimalsData = [];
        this.filterRecentlyApplied = false;
      }
      this.allAnimalsData = [...this.allAnimalsData, ...res];
    })
  }
}
