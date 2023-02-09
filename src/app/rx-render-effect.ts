import {ChangeDetectorRef, inject, ViewRef} from '@angular/core';
import {RxStrategyNames, RxStrategyProvider} from '@rx-angular/cdk/render-strategies';
import {effect, Signal} from '@preact/signals-core';


/**
 * @description
 * Executes CD scheduled on a configurable Scheduler on a component whenever the passed Signal notifies
 *
 */
export function rxRenderEffect<T>(renderSignal: Signal<T>, config?: {
  strategy?: RxStrategyNames<string>;
  renderCallback?: (state: T) => void
}) {

  const strategyProvider = inject(RxStrategyProvider);
  const cdRef = inject(ChangeDetectorRef);
  // @TODO explain the problem this line solves
  Promise.resolve().then(() => {
    const abortCtrl = new AbortController();
    // cdRef.detach();
    const renderEffect = effect(() => {
      const value = renderSignal.value;
      strategyProvider.scheduleCD(cdRef, {
        strategy: config?.strategy || 'normal',
        scope: (cdRef as any).context,
        abortCtrl,
        afterCD: () => config?.renderCallback?.(value)
      })
    });
    (cdRef as ViewRef).onDestroy(() => {
      abortCtrl.abort();
      renderEffect();
    })
  })
}


export function rxRenderEffect2<T>(config?: {
  strategy?: RxStrategyNames<string>;
  renderCallback?: (state: T) => void
}): (renderSignal: Signal<T>) => void {

  const strategyProvider = inject(RxStrategyProvider);
  const cdRef = inject(ChangeDetectorRef);
  return (renderSignal: Signal<T>) => {
    // @TODO explain the problem this line solves
    Promise.resolve().then(() => {
      const abortCtrl = new AbortController();
      // cdRef.detach();
      const renderEffect = effect(() => {
        const value = renderSignal.value;
        strategyProvider.scheduleCD(cdRef, {
          strategy: config?.strategy || 'normal',
          scope: (cdRef as any).context,
          abortCtrl,
          afterCD: () => config?.renderCallback?.(value)
        })
      });
      (cdRef as ViewRef).onDestroy(() => {
        abortCtrl.abort();
        renderEffect();
      })
    })
  }
}
