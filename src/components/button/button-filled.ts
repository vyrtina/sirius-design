import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Button } from "./internal/button";
import styles from "./button-filled.scss?inline";

@customElement("sd-button-filled")
export class SdButtonFilled extends Button {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button-filled": SdButtonFilled;
    }
}
