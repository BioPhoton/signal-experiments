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
      <span class="position" *ngFor="let digit of digits()">
            <span class="digit static">
            {{digit}}
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


