import {Routes} from '@angular/router';
import {IntroComponent} from "./examples/intor.component";
import {CdComponent} from "./examples/cd.component";
import {DynamicCounterComponent} from "./examples/dynamic-counter.component";

export const ROUTES: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'intro'
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: 'cd-component',
    component: CdComponent
  },
  {
    path: 'cd-binding',
    component: CdComponent
  },
  {
    path: 'counter',
    component: DynamicCounterComponent
  }
];
