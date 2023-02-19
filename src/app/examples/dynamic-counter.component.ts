import {Component} from '@angular/core';
import {computed, Signal, signal} from "../signals";
import {NgFor} from "@angular/common";
import {interval} from "rxjs";
import {RxEffects} from "@rx-angular/state/effects";
import {RxLetDirective} from "../shared/rx-let.directive";

@Component({
  selector: 'app-dynamic-counter',
  standalone: true,
  imports: [NgFor, RxLetDirective],
  template: `
    <div id="timer-display" class="countdownHolder" *rxLet="digits; let digits">
      <span class="position" *ngFor="let digit of digits">
            <span class="digit static">
              {{digit}}
            </span>
          </span>
    </div>

    <fieldset id="counter-panel">
      <button type="button" id="btn-reset" (click)="update()">
        Update
      </button>

      <button type="button" id="btn-start" (click)="startTick()">
        Start
      </button>

      <button type="button" id="$btn-pause" (click)="pauseTick()">
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
  `,
  providers: [RxEffects]
})
export class DynamicCounterComponent {

  tickActive: false | number = false;
  count = signal(200);
  countDiff = signal(1);
  countUp = signal(true);
  tickSpeed = signal(1000);

  calcCount(): number {
    return this.count() + this.countDiff() * (this.countUp() ? 1 : -1);
  }

  digits = computed(() => {
    console.log('digits of count: ', this.count())
    return this.count().toString().split('');
  })

  constructor(private effect: RxEffects) {
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

  startTick(): void {
    this.pauseTick();
    this.tickActive = this.effect.register(interval(this.tickSpeed()), () => this.count.set(this.calcCount()));
  }

  pauseTick(): void {
    if(this.tickActive !== false) {
      this.effect.unregister(this.tickActive);
      this.tickActive = false;
    }
  }

}
