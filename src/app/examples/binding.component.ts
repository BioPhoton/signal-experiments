import {ChangeDetectionStrategy, Component} from '@angular/core';
import {computed, signal} from "../signals/index";
import {UnpatchModule} from '@rx-angular/template/unpatch';
import {work} from "../shared/work";
import {renderEffect} from "../shared/render-effect";
import {RxLetDirective} from "../shared/rx-let.directive";

@Component({
  selector: 'binding-component',
  standalone: true,
  imports: [UnpatchModule, RxLetDirective],
  template: `
    <span *rxLet="count; let c">cont:{{c}}</span><br>
    <span *rxLet="double; let d">double:{{d}}</span><br>
    <button (click)="inc()" [unpatch]>inc (zone-less)</button><br>
    <button (click)="startTick()">start tick</button><br>
    <button (click)="stopTick()">stop tick</button><br>
    <br><br>
    tmp is heavy: {{w()}}<br>
    tmp is heavy: {{w()}}<br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindingComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  interval: (() => void) | undefined;

  inc() {
    this.count.set(this.count() + 1);
  }

  reset() {
    this.count.set(0);
  }

  startTick() {
    const asyncId = setInterval(() => this.inc(), 1000);
    this.interval = () => clearInterval(asyncId);
  }

  stopTick() {
    if(this.interval) {
      this.interval();
      this.interval = undefined;
    }
  }

  constructor() {
    console.log('init count', this.count());
    renderEffect(this.count);
  }

  w = () => work(Math.random())
}

