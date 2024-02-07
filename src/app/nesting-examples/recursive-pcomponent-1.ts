import { Component, Input } from '@angular/core';
import {work} from "../shared/work";
import {RendersComponent} from "../shared/renders.component";

@Component({
  selector: 'recursive-component-1',
  standalone: true,
  imports: [RendersComponent],
  template: `
    @if (level > 0) {
      <div style="padding: 20px; border: 1px solid #ccc;">
        v1: <renders></renders>
        <recursive-component-1 [level]="level - 1" [value]="value" [work]="work"></recursive-component-1>
      </div>
    } @else {
      value: {{value}}
    }
    `,
  styles: [`
    div { margin-top: 10px; }
  `]
})
export class RecursiveComponent1 {
  @Input() level: number = 0;
  @Input() work: number = 1;
  @Input() value: string = '';
  w = () => work(1)
}
