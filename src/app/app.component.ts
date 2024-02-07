import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
    <h1>
      Angular Signals Demo
      <span class="renders">{{renders()}}</span>
    </h1>
    <nav id="main">
      <a [routerLink]="'intro'">Intro</a>
      <a [routerLink]="'cd-component'">CD on Component</a>
      <a [routerLink]="'cd-binding'">CD on Binding</a>
      <a [routerLink]="'counter'">Counter</a>
    </nav>
    <nav id="secondary">
      <a [routerLink]="'nesting-comparison-component'">Comparison</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  _renders = 0;

  constructor() {

  }

  renders() {
    return this._renders++;
  }
}

