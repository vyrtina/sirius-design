import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./search-bar.scss?inline";
import "../../icons/src/search";
import "../../icons/src/close";

@customElement("sd-search-bar")
export class SdSearchBar extends LitElement {
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
                <sd-icon-search class="icon" id="search-icon"></sd-icon-search>
                <input
                    type="search"
                    name="search"
                    id="search-input"
                    placeholder=${this.placeholder}
                    @input=${this._searchChanged}
                    ?disabled=${this.disabled}
                    value=${this.defaultValue} />
                <sd-icon-close
                    class="icon"
                    id="close-button"
                    size="s"
                    @click=${this._deleteSearch}></sd-icon-close>
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
        "sd-search-bar": SdSearchBar;
    }
}
