/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {effect, Signal} from '../signals';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

/**
 * Exposes the value of an Angular `Signal` as an RxJS `Observable`.
 *
 * The returned `Observable` has `shareReplay` semantics. When subscribed, the current value will
 * begin to propagate to subscribers with the same timing as an `effect` watching that value. New
 * subscribers beyond the first will receive the current value immediately.
 *
 * When no more subscribers are subscribed, the internal `effect` will be cleaned up.
 *
 * @developerPreview
 */
export function fromSignal<T>(source: Signal<T>): Observable<T> {
  // Creating a new `Observable` allows the creation of the effect to be lazy. This allows for all
  // references to `source` to be dropped if the `Observable` is fully unsubscribed and thrown away.
  const signal$ = new Observable<T>(observer => {
    const watcher = effect(() => {
      try {
        observer.next(source());
      } catch (err) {
        observer.error(err);
      }
    });
    return () => {
      watcher.destroy();
    };
  });

  // Pipe via `shareReplay` to share the single backing `effect` across all interested subscribers.
  // This of course has timing implications for when new subscribers show up. We turn on `refCount`
  // so that once all subscribers are unsubscribed, the underlying `effect` can be cleaned up.
  return signal$.pipe(shareReplay({refCount: true}));
}
