import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      Angular Signals Demo
    </header>
    <nav>
      <a [routerLink]="'intro'">Intro</a>
      <a [routerLink]="'cd-component'">CD on Component</a>
      <a [routerLink]="'cd-binding'">CD on Binding</a>
      <a [routerLink]="'counter'">Counter</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}

