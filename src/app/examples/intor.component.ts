import { RxUnpatch } from "@rx-angular/template/unpatch";
import {ChangeDetectionStrategy, Component} from '@angular/core';

import {RendersComponent} from "../shared/renders.component";
import {PushPipe} from "../shared/push.pipe";
import {RxLetDirective} from "../shared/rx-let.directive";
import {computed, effect, signal} from "../signals";

@Component({
  selector: 'intro',
  standalone: true,
  imports: [RendersComponent, RxUnpatch, PushPipe, RxLetDirective],
  template: `
    <renders></renders>
    <div id="timer-display" class="countdownHolder">
      @for (digit of digits(); track digit) {
        <span class="position">
          <span class="digit static">
            {{digit}}
          </span>
        </span>
      }
    </div>
    <button (click)="update()">update</button><br>
    <button (click)="reset()">reset</button><br>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent {

  count = 0;
  digits = () => this.count.toString().split('');
  constructor() {

  }

  update() {
    this.count = this.count +1;
  }

  reset() {
    this.count = 0;
  }

}


