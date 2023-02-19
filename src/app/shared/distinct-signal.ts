import {SettableSignal, signal} from "../signals/index";

/**
 * @description
 *
 * a signal that only notifies about distinct updates
 */
export function distinctSignal<T>(initialValue: T): SettableSignal<T> {
    let value = initialValue;
    const _signal = signal(initialValue);
    const _set = _signal.set;
    _signal.set = (newValue: T) => {
        if (newValue !== value) {
            value = newValue;
            _set.call(_signal, newValue);
        }
    };

    _signal.update = (mutatorFn?: (value: T) => T) => {
        if (mutatorFn !== undefined) {
            _signal.set(mutatorFn(value));
        }
    };

    return _signal;
}
