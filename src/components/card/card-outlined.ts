import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Card } from "./internal/card";
import styles from "./card-outlined.scss?inline";

@customElement("sd-card-outlined")
export class SdCardOutlined extends Card {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card-outlined": SdCardOutlined;
    }
}
