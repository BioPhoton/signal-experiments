import {ChangeDetectionStrategy, Component} from '@angular/core';
import {computed, signal, effect} from "@preact/signals-core";
import {work} from "./work";
import {renderEffect} from "./render-effect";
import {rxRenderEffect} from "./rx-render-effect";

const createSignal = <T>(v: T) => {
  const s = signal(v);
  return {
    set: (v: T) => s.value = v,
    get: () => s.value
  }
}

@Component({
  selector: 'app-root',
  template: `
    <span>cont:{{count.value}}</span><br>
    <span>double:{{double.value}}</span><br>
    <button (click)="inc()">inc</button><br>
    <button (click)="inc()" [unpatch]>inc (zone-less)</button><br>
    <br><br>
    <button (click)="startEffect()">startEffect</button><br>

    <br><br>
    tmp is heavy: {{w()}}<br>
    tmp is heavy: {{w()}}<br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  count = signal(0);

  w = () => work(Math.random())
  double = computed(() => this.count.value * 2);
  inc() {
    this.count.value = this.count.value+1;
  }

  constructor() {
    console.log('init count', this.count.value);
  }

  startEffect() {
    const sub = effect(() => console.log('effect double:', this.count.value));
  }

  startRenderEffect() {
    const sub = renderEffect(this.count);
  }

  startRxRenderEffect() {
   const sub2 = rxRenderEffect(this.count)
  }

}

