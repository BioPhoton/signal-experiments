import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RecursiveRxLet} from "./recursive-let";
import {rxActions, eventValue} from "@rx-angular/state/actions";
import {RxLet} from "@rx-angular/template/let";
import {rxState} from "@rx-angular/state";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RecursiveSignal} from "./recursive-signal";
import { RecursiveStatic } from './recursive-static';

@Component({
  selector: 'nesting-comparison-component',
  standalone: true,
  styles: ``,
  imports: [RecursiveRxLet, RecursiveSignal, RxLet, AsyncPipe, RecursiveStatic],
  template: `
    <h2>Comparison</h2>
    <div>
      <input #levelInput (input)="ui.level(levelInput.valueAsNumber)" type="number" min="1" [value]="level()"><br/>
      <input #workInput (input)="ui.work(workInput.valueAsNumber)" type="number" min="1" [value]="work()"><br/>
      <input #valueInput (input)="ui.value(valueInput.value)" type="text" [value]="value()"><br/>
    </div>

    <div class="row">
      <div class="column">
        <h3>RxLet</h3>
        <recursive-let [depth]="level()" [work]="work()" [value]="value$"/>
      </div>
      <div class="column">
        <h3>Static Values</h3>
        <recursive-static [depth]="level()" [work]="work()" [value]="value()"/>
      </div>
      <div class="column">
        <h3>Signal Inputs</h3>
        <recursive-signal [depth]="level()" [work]="work()" [value]="value()"/>
      </div>
    </div>



  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestingComparisonComponent {
  ui = rxActions<{
    level: number,
    work: number,
    value: string
  }>();

  state = rxState<{
    level: number,
    work: number,
    value: string
  }>(({connect, set}) => {
    set({level: 1, work: 1, value: 'test'});
    connect('level', this.ui.level$ as unknown as Observable<number>);
    connect('work', this.ui.work$ as unknown as Observable<number>);
    connect('value', this.ui.value$ as unknown as Observable<string>);
  });

  level = this.state.signal('level');
  work = this.state.signal('work');
  value = this.state.signal('value');

  value$ = this.state.select('value');
}

