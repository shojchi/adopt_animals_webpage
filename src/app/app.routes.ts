import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'details', component: DetailedPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

