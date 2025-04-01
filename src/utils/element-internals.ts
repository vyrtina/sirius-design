import {LitElement} from "lit";

const Internals = Symbol("Internals");

type Constructor<T = {}> = new (...args: any[]) => T;

export function MixinElementInternals<TBase extends Constructor<LitElement>>(
    Base: TBase
) {
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
