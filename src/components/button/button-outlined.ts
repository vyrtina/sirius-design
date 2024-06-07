import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Button } from "./internal/button";
import styles from "./button-outlined.scss?inline";

@customElement("sd-button-outlined")
export class SdButtonOutlined extends Button {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-button-outlined": SdButtonOutlined;
    }
}
