import {html, LitElement, unsafeCSS} from "lit";
import {customElement, state} from "lit/decorators.js";
import styles from "./top-bar.scss?inline";
import "../../icons/src/sd-icon-menu";

@customElement("sd-top-bar")
export default class SdTopBar extends LitElement {
    static styles = unsafeCSS(styles);

    @state()
    private expanded = false;

    render() {
        return html`
            <div class="background"></div>
            <div class="content sd-body-max-width">
                <slot name="logo" class="logo headline"></slot>
                <slot name="search-bar" class="search-bar"></slot>
                <div class="links body">
                    <span class="text-links">
                        <slot name="text-link"> </slot>
                    </span>
                    <span class="icons">
                        <slot name="icon-link"> </slot>
                    </span>
                </div>
                <div
                        id="menu-links"
                        class=${"menu-links " + (this.expanded ? "expanded" : "")}>
                    <slot name="menu-link">
                        <slot name="text-links"></slot>
                    </slot>
                </div>
                <sd-icon-button-plain
                        class="nav-menu-btn"
                        id="top-bar-menu-btn"
                        @click="${this._sidebarControl}"
                        invert>
                    <sd-icon-menu></sd-icon-menu>
                </sd-icon-button-plain>
            </div>
        `;
    }

    private _sidebarControl() {
        const menu = <HTMLElement>this.shadowRoot?.getElementById("menu-links");

        if (menu.classList.contains("display")) {
            menu.classList.remove("display");
            console.log("no display");
        } else menu.classList.add("display");
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-top-bar": SdTopBar;
    }
}
