import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { effect, Signal } from '@preact/signals-core';

/**
 * @description
 * Executes naive CD on a component whenever the passed Signal notifies
 */
export function renderEffect<T>(renderSignal: Signal<T>) {
  const cdRef = inject(ChangeDetectorRef);
  // @TODO explain the problem this line solves
  Promise.resolve().then(() => {
    const renderEffect = effect(() => {
      const v = renderSignal.value;
      console.log('detectChanges for: ', v);
      cdRef.detectChanges();
    });
    (cdRef as ViewRef).onDestroy(() => {
      renderEffect();
    });
  });
}

/**
 * @description
 * Executes naive CD on a component whenever the passed Signal notifies
 */
export function renderEffect2<T>() {
  const cdRef = inject(ChangeDetectorRef);
  // @TODO explain the problem this line solves
  return (renderSignal: Signal<T>) => Promise.resolve().then(() => {
    const renderEffect = effect(() => {
      const v = renderSignal.value;
      console.log('detectChanges for: ', v);
      cdRef.detectChanges();
    });
    (cdRef as ViewRef).onDestroy(() => {
      renderEffect();
    });
  });
}
