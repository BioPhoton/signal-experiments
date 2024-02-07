import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { Observable } from 'rxjs';
import { DirtyCheck } from '../shared/dirty-check.component';
import { work } from '../shared/work';

@Component({
  selector: 'recursive-let',
  standalone: true,
  imports: [DirtyCheck, RxLet],
  template: `
    @if (level > 0) {
      <div>
        <dirty-check/>
        <recursive-let [level]="level - 1" [value]="value$" [work]="work" />
      </div>
    } @else {
      <div>Component Level: <dirty-check/> </div>
      <div class="value-level" *rxLet="value$; let v; parent: false">
        <div>Value Level: <dirty-check/></div>
        <div>Value: {{ v }}</div>
      </div>
    }
    `,
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveRxLet {
  @Input()
  set depth(d: number) {
    this.level = d - 1;
  }

  @Input() level = 0;

  @Input() work = 0;

  @Input('value') value$!: Observable<string>;

  w = () => work(1)
}
