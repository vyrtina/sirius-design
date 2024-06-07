import { unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Card } from "./internal/card";
import styles from "./internal/card.scss?inline";

@customElement("sd-card-filled")
export class SdCardFilled extends Card {
    static override styles = unsafeCSS(styles);
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-card-filled": SdCardFilled;
    }
}
