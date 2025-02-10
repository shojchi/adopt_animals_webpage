import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { animalDetailedResolver } from './shared/resolvers/animal-detailed/animal-detailed.resolver';
import { animalListResolver } from './shared/resolvers/animal-list/animal-list.resolver';

export const routes: Routes = [
  { path: '', component: HomePageComponent, resolve: { animalsData: animalListResolver } },
  { path: 'animal-details/:id', component: DetailedPageComponent, resolve: { animalData: animalDetailedResolver } },
  { path: '**', component: NotFoundPageComponent },
];

