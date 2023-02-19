import {ChangeDetectionStrategy, Component} from '@angular/core';
import {computed, signal} from "../signals/index";
import {UnpatchModule} from '@rx-angular/template/unpatch';
import {work} from "../shared/work";
import {NgFor, NgIf} from "@angular/common";
import {PushPipe} from "../shared/push.pipe";
import {CounterService} from "../shared/counter.service";

@Component({
  selector: 'cd-component',
  standalone: true,
  imports: [NgFor, NgIf, UnpatchModule, PushPipe],
  template: `
    <h2>Counter Example</h2>
    <div id="container">
      <div id="timer-display" class="countdownHolder">
      <span class="position" *ngFor="let digit of digits | push">
            <span class="digit static">
              {{digit}}
            </span>
          </span>
      </div>

      <fieldset id="counter-panel">
        <button type="button" id="btn-reset" (click)="update()">
          Update
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
          <li>- a change of [count-diff-input].value does not interfere with the running timer</li>
        </ul>
      </details>
    </div>
    tmp is heavy: {{w()}}<br/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdComponent {

  tickActive: false | number = false;
  isTicking = signal(false);
  count = signal(0);
  countDiff = signal(0);
  countUp = signal(false);
  tickSpeed = signal(0);

  calcCount(): number {
    return this.count() + this.countDiff() * (this.countUp() ? 1 : -1);
  }

  digits = computed(() => {
    console.log('digits of count: ', this.count())
    return this.count().toString().split('');
  })

  constructor(private counterService: CounterService) {
    const {tickSpeed, isTicking, count, countDiff, countUp} = this.counterService.getInitialCount;
    this.isTicking.set(isTicking);
    this.count.set(count);
    this.countDiff.set(countDiff);
    this.countUp.set(countUp);
    this.tickSpeed.set(tickSpeed);
  }

  update(): void {
    this.count.set(this.calcCount());
  }

  setTo(val: string): void {
    this.count.set(parseInt(val));
  }

  reset(): void {
    this.count.set(0);
  }

  w = () => work(Math.random())
}

