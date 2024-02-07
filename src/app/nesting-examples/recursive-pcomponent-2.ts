import {Component, input, Input} from '@angular/core';
import {work} from "../shared/work";
import {RendersComponent} from "../shared/renders.component";

@Component({
  selector: 'recursive-component-2',
  standalone: true,
  imports: [RendersComponent],
  template: `
    @if (level() > 0) {
      <div style="padding: 20px; border: 1px solid #ccc;">
        v1: <renders></renders>
        <recursive-component-2 [level]="level()" [value]="value()" [work]="work()"></recursive-component-2>
      </div>
    } @else {
      value: {{value()}}
    }
    `,
  styles: [`
    div { margin-top: 10px; }
  `]
})
export class RecursiveComponent2 {
  level = input(1);
  work = input(1);
  value = input('');
  w = () => work(1)
}
