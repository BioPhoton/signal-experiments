import {ChangeDetectionStrategy, Component} from '@angular/core';
import {computed, signal} from "../signals";
import {UnpatchModule} from '@rx-angular/template/unpatch';

@Component({
  selector: 'intro',
  standalone: true,
  imports: [UnpatchModule],
  template: `
    <span>cont:{{count()}}</span><br>
    <span>double:{{double()}}</span><br>
    <button (click)="inc()">inc</button><br>
    <button (click)="reset()">reset</button><br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  interval: (() => void) | undefined;

  inc() {
    this.count.set(this.count() + 1);
  }

  reset() {
    this.count.set(0);
  }

}

