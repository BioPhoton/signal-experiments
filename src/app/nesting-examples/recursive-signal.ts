import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DirtyCheck } from '../shared/dirty-check.component';
import { work } from '../shared/work';

@Component({
  selector: 'recursive-signal',
  standalone: true,
  imports: [DirtyCheck],
  template: `
    @if (_level() > 0) {
      <div>
        <dirty-check/>
        <recursive-signal [level]="_level() - 1" [value]="value()" [work]="work()" />
      </div>
    } @else {
      <div>Component Level: <dirty-check/> </div>
      <div class="value-level">
        <div>Value Level: <dirty-check/></div>
        <div>Value: {{ value() }}</div>
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
export class RecursiveSignal {
  depth = input<number>(0);
  level = input<number>(0);
  work = input.required<number>();
  value = input.required<string>();

  _level = computed(() => {
    return this.depth() > 0 ? this.depth() - 1 : this.level()
  });

  w = () => work(1)
}
