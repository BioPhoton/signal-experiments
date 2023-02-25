import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {RendersComponent} from "../shared/renders.component";
import {UnpatchModule} from "@rx-angular/template/unpatch";
import {PushPipe} from "../shared/push.pipe";
import {RxLetDirective} from "../shared/rx-let.directive";
import {computed, effect, signal} from "../signals";

@Component({
  selector: 'intro',
  standalone: true,
  imports: [RendersComponent, NgFor, UnpatchModule, PushPipe, RxLetDirective],
  template: `
    <renders></renders>
    <div id="timer-display" class="countdownHolder">
      <span class="position">
            <span class="digit static">
            {{count}}
            </span>
          </span>
    </div>
    <button (click)="update()">update</button><br>
    <button (click)="reset()">reset</button><br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent {

  count = 0;

  constructor() {
  }

  update() {
    this.count =  this.count + 1;
  }

  reset() {
    this.count = 0;
  }

}


