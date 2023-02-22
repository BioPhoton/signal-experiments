import {Directive, EmbeddedViewRef, inject, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {effect, Signal, Effect, SettableSignal} from "../signals/index";
import {RxStrategyProvider} from "@rx-angular/cdk/render-strategies";

type EmbeddedViewContext<T> = { $implicit: T, rxLet: T };

@Directive({
  selector: '[rxLet]',
  standalone: true
})
export class RxLetDirective<T> implements OnDestroy {

  static ngTemplateContextGuard<T>(
    dir: RxLetDirective<T>,
    ctx: unknown | null | undefined
  ): ctx is EmbeddedViewContext<T> {
    return true;
  }
  static ngTemplateGuard_rxLet: 'binding';

  private lastSignal!: Signal<T>;
  sub: Effect | undefined;
  embeddedView: EmbeddedViewRef<EmbeddedViewContext<T>> | undefined = undefined;
  private vCR: ViewContainerRef = inject(ViewContainerRef);
  private tR = inject<TemplateRef<EmbeddedViewContext<T>>>(TemplateRef);
  private strategyProvider = inject(RxStrategyProvider);

  @Input()
  set rxLet(s: SettableSignal<T> | Signal<T>) {
    if (this.lastSignal === s) {
      return;
    }
    this.lastSignal = s;
    if (this.sub) {
      this.sub.destroy();
      this.sub = undefined;
    }
    this.sub = effect(() => {
      // @NOTICE: this is needed to register the change
      const value = s();
      this.updateView(value).detectChanges();
    });
  }

  constructor() {
  }

  private updateView(value: T): EmbeddedViewRef<EmbeddedViewContext<T>> {
    if (!this.embeddedView) {
      this.embeddedView = this.vCR.createEmbeddedView(this.tR, {
        $implicit: value,
        rxLet: value
      });
    } else {
      this.embeddedView.context = {
        $implicit: value,
        rxLet: value
      };
    }
    return this.embeddedView;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.destroy();
    }
  }
}
