import {ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {effect, Effect, Signal} from "../signals";
import {RxStrategyProvider} from "@rx-angular/cdk/render-strategies";

@Pipe({
  name: 'push',
  pure: false,
  standalone: true
})
export class PushPipe<T> implements PipeTransform, OnDestroy {
  private sub: Effect | undefined;
  private lastSignal!: Signal<T>;
  private lastValue!: T;
  private cdRef = inject(ChangeDetectorRef);
  private strategyProvider = inject(RxStrategyProvider);

  constructor() {
  }

  transform(s: Signal<T>, ...args: string[]): T {
    if(this.lastSignal === s) {
      return this.lastValue;
    }
    if(this.sub) {
      this.sub.destroy();
      this.sub = undefined;
    }
    this.sub = effect(() => {
      // @NOTICE: this is needed to register the change as effect
      const value = s();
      this.strategyProvider.schedule(() => {
        this.updateView(value)?.detectChanges();
      }, {
        scope: this
      }).subscribe();
    });
    return this.lastValue;
  }

  private updateView(value: T): ChangeDetectorRef | undefined {
    let r: ChangeDetectorRef | undefined = this.cdRef
    if(this.lastValue === value) {
      r = undefined;
    }
    this.lastValue = value;
    return r;
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.destroy();
    }
  }

}
