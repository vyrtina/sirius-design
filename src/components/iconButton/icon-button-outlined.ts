import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { IconButton } from "./internal/icon-button";
import styles from "./icon-button-outlined.scss?inline";

@customElement("sd-icon-button-outlined")
export class SdIconButtonOutlined extends IconButton {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-icon-button-outlined": SdIconButtonOutlined;
    }
}
