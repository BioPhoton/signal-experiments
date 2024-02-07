import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {work} from "../shared/work";
import {DirtyCheck} from "../shared/dirty-check.component";

@Component({
  selector: 'recursive-static',
  standalone: true,
  imports: [DirtyCheck],
  template: `
    @if (level > 0) {
      <div>
        <dirty-check/>
        <recursive-static [level]="level - 1" [value]="value" [work]="work"></recursive-static>
      </div>
    } @else {
      <div>Component Level: <dirty-check/> </div>
      <div class="value-level">
        <div>Value Level: <dirty-check/></div>
        <div>Value: {{ value }}</div>
      </div>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      outline: 2px solid hotpink;
      padding-top: 5px;
      padding-left: 5px;
    }
    .value-level {
      margin: 5px;
      border: 2px dotted green;
    }
  `]
})
export class RecursiveStatic {
  @Input()
  set depth(d: number) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input() total = 0;

  @Input() level = 0;

  @Input() work = 0;

  @Input() value: string = '';

  w = () => work(1)
}
