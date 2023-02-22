import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RendersComponent} from "../shared/renders.component";
import {UnpatchModule} from "@rx-angular/template/unpatch";
import {PushPipe} from "../shared/push.pipe";
import {RxLetDirective} from "../shared/rx-let.directive";

@Component({
  selector: 'intro',
  standalone: true,
  imports: [RendersComponent, UnpatchModule, PushPipe, RxLetDirective],
  template: `
    <renders></renders>

    <div id="timer-display" class="countdownHolder">
      <span class="position">
            <span class="digit static">
            {{count()}}
            </span>
          </span>
    </div>
    <button [unpatch] (click)="update()">update</button><br>
    <button [unpatch] (click)="reset()">reset</button><br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent {
  count: any = 0;
  // double = computed(() => this.count() * 2); // new signal with computation result

  constructor() {

  }

  update() {
    this.count.set(this.count() + 1);
  }

  reset() {
    this.count.set(0);
  }

}


