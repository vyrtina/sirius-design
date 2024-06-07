import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Button } from "./internal/button";
import styles from "./button-plain.scss?inline";

@customElement("sd-button-plain")
export class SdButtonPlain extends Button {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button-plain": SdButtonPlain;
    }
}
