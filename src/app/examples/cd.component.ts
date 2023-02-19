import {ChangeDetectionStrategy, Component} from '@angular/core';
import {computed, signal} from "../signals/index";
import {UnpatchModule} from '@rx-angular/template/unpatch';
import {work} from "../shared/work";
import {renderEffect} from "../shared/render-effect";
import {RxLetDirective} from "../shared/rx-let.directive";
import {NgIf} from "@angular/common";

@Component({
  selector: 'cd-component',
  standalone: true,
  imports: [NgIf, UnpatchModule, RxLetDirective],
  template: `
    <h2>Counter Example</h2>
    <fieldset>
      <input type="number" (input)="setInc($event)" [value]="incrementBy()" >
    </fieldset>
    <button (click)="inc()" [unpatch]>increment by {{incrementBy()}}</button>
    <details (click)="toggleOpen()" [open]="open">
      <summary>Count Details</summary>
      <section *ngIf="true">
        <br/>
        <ng-template let-c="count()">
          count:{{c}}<br/>
          even:{{c % 2 === 0}}<br/>
          odd:{{c % 2 !== 0}}<br/>
          3*N:{{c % 3 === 0}}<br/>
          7*N:{{c % 7 === 0}}<br/>
        </ng-template>
        <span>isMultipleOf4:{{isMultipleOf4()}}</span><br/>
        <br/>
      </section>
    </details>
    <button (click)="startTick()">start tick</button>
    <br/>
    <button (click)="stopTick()">stop tick</button>
    tmp is heavy: {{w()}}<br/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdComponent {
  open = false;
  count = signal(0);
  incrementBy = signal(10);
  isMultipleOf4 = computed(() => this.count()%4);
  interval: (() => void) | undefined;

  setInc(event: any) {
    this.incrementBy.set(parseInt(event.target.value));
  }

  inc() {
    this.count.set(this.count() + this.incrementBy());
  }

  reset() {
    this.count.set(0);
  }

  startTick() {
    this.stopTick();
    const asyncId = setInterval(() => this.inc(), 1000);
    this.interval = () => clearInterval(asyncId);
  }

  stopTick() {
    if (this.interval) {
      this.interval();
      this.interval = undefined;
    }
  }

  toggleOpen() {
    this.open = !this.open;
  }

  constructor() {
    console.log('init count', this.count());
    renderEffect(this.count);
  }

  w = () => work(Math.random())
}

