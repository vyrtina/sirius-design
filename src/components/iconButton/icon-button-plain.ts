import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { IconButton } from "./internal/icon-button";
import styles from "./icon-button-plain.scss?inline";

@customElement("sd-icon-button-plain")
export class SdIconButtonPlain extends IconButton {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-button-plain": SdIconButtonPlain;
    }
}
