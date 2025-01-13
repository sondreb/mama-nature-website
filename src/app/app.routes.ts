import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'en', component: AppComponent },
  { path: 'me', component: AppComponent },
  { path: 'ru', component: AppComponent },
  { path: 'no', component: AppComponent }
];
