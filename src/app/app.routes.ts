import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'en', component: HomeComponent },
  { path: 'me', component: HomeComponent },
  { path: 'ru', component: HomeComponent },
  { path: 'no', component: HomeComponent }
];
