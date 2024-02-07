import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RecursiveComponent1} from "./recursive-pcomponent-1";
import {rxActions, eventValue} from "@rx-angular/state/actions";
import {RxLet} from "@rx-angular/template/let";
import {rxState} from "@rx-angular/state";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RecursiveComponent2} from "./recursive-pcomponent-2";

@Component({
  selector: 'nesting-comparison-component',
  standalone: true,
  styles: ``,
  imports: [RecursiveComponent1, RecursiveComponent2, RxLet,  AsyncPipe],
  template: `
    <h2>Comparison</h2>
    {{state.select('value') | async}}
    <input (input)="ui.level($event)" type="number" min="1" [value]="level" *rxLet="state.select('level'); let level"><br/>
    <input (input)="ui.work($event)" type="number" min="1" [value]="work" *rxLet="state.select('work'); let work"><br/>
    <input (input)="ui.value($event)" type="text" [value]="value" *rxLet="state.select('value'); let value"><br/>

    <div class="row">
      <div class="column">
        <recursive-component-1 *rxLet="state.select(); let s" [level]="s.level" [work]="s.work" [value]="s.value"></recursive-component-1>
      </div>
      <div class="column">
        <recursive-component-2 *rxLet="state.select(); let s" [level]="s.level" [work]="s.work" [value]="s.value"></recursive-component-2>
      </div>
    </div>



  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestingComparisonComponent {
  ui = rxActions<{
    level: number | Event,
    work: number | Event,
    value: string | Event
  }>(({transforms}) => transforms({
    level: eventValue,
    work: eventValue,
    value: eventValue}));

  state = rxState<{
    level: number,
    work: number,
    value: string }>(({connect, set}) => {
    set({level: 1, work: 1, value: 'test'});
    connect('level', this.ui.level$ as unknown as Observable<number>);
    connect('work', this.ui.work$ as unknown as Observable<number>);
    connect('value', this.ui.value$ as unknown as Observable<string>);
  })
}

