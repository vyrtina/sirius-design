import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./top-bar.scss?inline";
import "../search-bar/search-bar";
import "../button/button-plain";
import "../icon-button/icon-button-plain";

@customElement("sd-top-bar")
export class TopBar extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) expanded = false;

    render() {
        return html`
            <div class="logo headline">LOGO</div>
            <sd-search-bar size="small" invert></sd-search-bar>
            <div class=${"links body " + (this.expanded ? "expanded" : "")}>
                <ul class="text-links">
                    <li>
                        <sd-button-plain
                            icon="home"
                            label="Home"
                            invert
                            ?hideIcon=${!this.expanded}>
                        </sd-button-plain>
                    </li>
                    <li>
                        <sd-button-plain
                            icon="apps"
                            label="Discover"
                            invert
                            ?hideIcon=${!this.expanded}>
                        </sd-button-plain>
                    </li>
                </ul>
                <ul class="icons">
                    <li>
                        <sd-button-plain
                            icon="account_circle"
                            label="My account"
                            invert
                            ?hideText=${!this.expanded}>
                        </sd-button-plain>
                    </li>
                    <li>
                        <sd-button-plain
                            icon="favorite"
                            label="Wishlist"
                            invert
                            ?hideText=${!this.expanded}>
                        </sd-button-plain>
                    </li>
                    <li>
                        <sd-button-plain
                            icon="shopping_cart"
                            label="My cart"
                            invert
                            ?hideText=${!this.expanded}>
                        </sd-button-plain>
                    </li>
                </ul>
            </div>
            <sd-icon-button-plain
                icon="menu"
                class="nav-menu-btn"
                id="top-bar-menu-btn"
                .onClick="${this._sidebarControl}"
                @click=${this._navRender}
                invert>
            </sd-icon-button-plain>
        `;
    }

    _sidebarControl() {
        console.log("test");
        var sidebar = <HTMLElement>document.querySelector("sd-top-bar");
        if (sidebar.getAttribute("expanded") === null)
            sidebar.setAttribute("expanded", "expanded");
        else sidebar.removeAttribute("expanded");
        //if (sidebar.style.height === "0px") sidebar.style.height = "21rem";
        //else sidebar.style.height = "0px";
    }

    _navRender() {}
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-top-bar": TopBar;
    }
}
