import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./search-bar.scss?inline";
import "../icon/icon";

@customElement("sd-search-bar")
export class SearchBar extends LitElement {
    static styles = unsafeCSS(styles);

    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) invert = false;
    @property({ type: String }) placeholder = "Search ...";
    @property({ type: String }) defaultValue = "";
    @property({ type: String }) size: "small" | "default" = "default";

    render() {
        return html`
            <form
                id="content"
                class=${"search-div " + (this.invert ? "invert " : "") + this.size}>
                <sd-icon icon="search" id="search-icon"></sd-icon>
                <input
                    type="search"
                    name="search"
                    id="search-input"
                    placeholder=${this.placeholder}
                    @input=${this._searchChanged}
                    ?disabled=${this.disabled}
                    value=${this.defaultValue} />
                <sd-icon
                    id="close-button"
                    icon="close"
                    size="small"
                    @click=${this._deleteSearch}></sd-icon>
            </form>
        `;
    }

    _searchChanged(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.value != "") {
            (<HTMLBaseElement>(
                this.shadowRoot!.getElementById("close-button")
            )).style.cssText = "display: inline-flex;";
        } else {
            (<HTMLBaseElement>(
                this.shadowRoot!.getElementById("close-button")
            )).style.cssText = "display: none;";
        }
    }

    _deleteSearch(e: Event) {
        (<HTMLInputElement>this.shadowRoot!.getElementById("search-input")).value = "";
        const icon = e.target as HTMLBaseElement;
        icon.style.cssText = "display: none;";
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-search-bar": SearchBar;
    }
}
