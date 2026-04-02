import { Routes } from '@angular/router';
import HomePage from './home-page/home-page';
import {NotezView} from './notez/notez-view/notez-view';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'note/:id', component: NotezView}
];
