import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { IconButton } from "./internal/icon-button";
import styles from "./icon-button-filled.scss?inline";

@customElement("sd-icon-button-filled")
export class SdIconButtonFilled extends IconButton {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-button-filled": SdIconButtonFilled;
    }
}
