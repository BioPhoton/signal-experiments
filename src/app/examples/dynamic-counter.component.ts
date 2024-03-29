import {Component} from '@angular/core';
import {computed, effect, signal} from "../signals";

import {interval, Subscription} from "rxjs";
import {RxLetDirective} from "../shared/rx-let.directive";
import {CounterService} from "../shared/counter.service";

@Component({
  selector: 'app-dynamic-counter',
  standalone: true,
  imports: [RxLetDirective],
  template: `
    <div id="container" *rxLet="loaded; let showCounter">
      @if (showCounter) {
        <div>
          <div id="timer-display" class="countdownHolder" *rxLet="digits; let dis">
            @for (digit of dis; track digit) {
              <span class="position">
                <span class="digit static">
                  {{digit}}
                </span>
              </span>
            }
          </div>
          <fieldset id="counter-panel">
            <button type="button" id="btn-reset" (click)="update()">
              Update
            </button>
            <button type="button" id="btn-start" (click)="isTicking.set(true)">
              Start
            </button>
            <button type="button" id="$btn-pause" (click)="isTicking.set(false)">
              Pause
            </button>
            <br/>
            <button type="button" id="btn-set-to" (click)="setTo($any(setToInput).value)">
              Set To
            </button>
            <input id="set-to-input" style="width:100px" type="number" min=0 value="42" #setToInput/>
            <button type="button" id="btn-reset" (click)="reset()">
              Reset
            </button>
            <br/>
            <button type="button" id="btn-up"
              (click)="countUp.set(true)">
              Count Up
            </button>
            <button type="button" id="btn-down"
              (click)="countUp.set(false)">
              Count Down
            </button>
            <br/>
            <label style="width:100px">
              Tick Speed
              <input id="tick-speed-input" type="number" min=0 value="1000"
                #inputTickSpeed (input)="tickSpeed.set($any(inputTickSpeed).value)"/>
            </label>
            <label style="width:100px">
              Count Diff
              <input id="count-diff-input" type="number" min=0 value="1"
                #inputDiffCount (input)="countDiff.set($any(inputDiffCount).value)"/>
            </label>
          </fieldset>
          <details>
            <summary>
              Features:
            </summary>
            <br/>
            <p>
              Initialy the diaply shows <b>count: 0, tickSpeed: 1000, countDiff: 1</b>,
              a count update would increment, and the timer is not ticking.
            </p>
            <ul>
              <li>- a click on [reset] sets the component into its initial state. Details see above</li>
              <li>- a click on [setTo] sets the [count] to the value of the [set-to-input]</li>
              <li>- a click on [update] updates the [count] with the new setting of the form</li>
              <li>- a click on [count up] increments the [count] on the next tick</li>
              <li>- a click on [count down] decrement the [count] on the next tick</li>
              <li>- a click on [start timer] updates the [count] with the new setting of the form every
                [tick-speed-input].value ms
              </li>
              <li>- a click on [pause timer] stops the updates immediately</li>
              <li>- a change of [count-diff-input].value does not interfere with the running timer</li>
              <li>- a change of [tick-speed-input].value immediately starts a new timer with [tick-speed-input].value ms
              </li>
            </ul>
          </details>
        </div>
      } @else {
        <h1>Loading...</h1>
      }
    
    </div>
    `
})
export class DynamicCounterComponent {

  loaded = signal(false);
  tickActive: false | Subscription = false;
  isTicking = signal(false);
  count = signal(0);
  countDiff = signal(1);
  countUp = signal(true);
  tickSpeed = signal(1000);

  calcCount(): number {
    return this.count() + this.countDiff() * (this.countUp() ? 1 : -1);
  }

  digits = computed(() => this.count().toString().split(''))

  constructor(
    private counterService: CounterService
  ) {
    this.counterService.getInitialCount$.subscribe(({tickSpeed, isTicking, count, countDiff, countUp}) => {
      this.isTicking.set(isTicking);
      this.count.set(count);
      this.countDiff.set(countDiff);
      this.countUp.set(countUp);
      this.tickSpeed.set(tickSpeed);
      this.loaded.set(true);
    });

    effect(() => {
      if (this.isTicking()) this.startTick()
      else this.pauseTick();
    })

    effect(() => {
      if (this.tickSpeed() && this.isTicking()) this.startTick()
    })
  }

  update(): void {
    this.count.set(this.calcCount());
  }

  setTo(val: string): void {
    this.count.set(parseInt(val));
  }

  reset(): void {
    this.isTicking.set(false);
    this.count.set(0);
  }

  startTick(): void {
    this.pauseTick();
    this.tickActive = interval(this.tickSpeed())
      .subscribe(() => this.count.set(this.calcCount()))
  }

  pauseTick(): void {
    if (this.tickActive !== false) {
      this.tickActive.unsubscribe();
      this.tickActive = false;
    }
  }

}

