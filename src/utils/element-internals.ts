import {LitElement} from "lit";

const Internals = Symbol("Internals");

/**
 * An instance with an `internals` symbol property for the component's
 * `ElementInternals`.
 */
export interface WithElementInternals {
    readonly internals: ElementInternals;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function MixinElementInternals<TBase extends Constructor<LitElement>>(
    Base: TBase
): (abstract new(...args: any[]) => WithElementInternals) & TBase {
    return class extends Base {
        [Internals]?: ElementInternals;

        get internals() {
            if (!this[Internals]) {
                this[Internals] = (this as HTMLElement).attachInternals();
            }
            return this[Internals];
        }
    };
}
