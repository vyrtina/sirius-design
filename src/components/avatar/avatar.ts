import {html, unsafeCSS} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {styleMap} from "lit-html/directives/style-map.js";
import {watch} from "../../utils/watch.js";
import SdElement from "../../utils/sd-element.js";
import styles from "./avatar.scss?inline";
import "../../icons/src/sd-icon-person.js";

const avatarColors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
] as const;
type avatarPossibleColors = (typeof avatarColors)[number];

/**
 * @summary A versatile avatar component for displaying user images, initials, or icons.
 *
 * @event sd-error - Emitted when the image fails to load.
 *
 * @slot icon - A fallback icon to display when no image or initials are provided.
 */
@customElement("sd-avatar")
export default class SdAvatar extends SdElement {
    static styles = unsafeCSS(styles);
    /** The image source to use for the avatar. */
    @property() image = "";
    /** A label to use to describe the avatar to assistive devices. */
    @property() label = "";
    /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
    @property() initials = ""; //TODO: add hasChanged to see if more than 2 characters
    /** the full name of the user */
    @property({attribute: "username"}) username = "";
    /** Indicates how the browser should load the image. */
    @property() loading: "eager" | "lazy" = "eager";
    /** the background color of the avatar, if initials are shown */
    @property() color: avatarPossibleColors | undefined;
    /** the size of the component. apply to both height and width */
    @property() size = "";
    /** render a link */
    @property() href = "";
    @state() private hasError = false;

    @watch("image")
    handleImageChange() {
        // Reset the error when a new image is provided
        this.hasError = false;
    }

    @watch("username")
    handleNameChange() {
        if (!this.getAttribute("initials")) {
            const match = this.username.match(/\s+(\S)/);
            this.initials = this.username.charAt(0) + (match ? match[1] : "");
        }
        if (!this.getAttribute("color")) {
            this.color = this.getRandomColor(this.username);
        }
    }

    render() {
        return html` ${this.href ? this.renderLink() : this.renderAvatar()} `;
    }

    private getRandomColor(str: String) {
        //use a hash function
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        hash = (Math.abs(hash) % 16) + 1;
        return avatarColors[hash]; // Ensure the number is between 1 and 16
    }

    private handleImageLoadError() {
        this.hasError = true;
        this.emit("sd-error");
    }

    private renderAvatar() {
        let style = {};
        if (this.size) {
            style = {
                height: this.size,
                width: this.size,
            };
        }
        return html`
            <div
                    part="base"
                    class="avatar"
                    role="img"
                    style="${styleMap(style)}"
                    aria-label=${this.label ? this.label : this.username}>
                ${this.renderContent()}
            </div>
        `;
    }

    private renderLink() {
        let style = {};
        if (this.size) {
            style = {
                height: this.size,
                width: this.size,
            };
        }
        return html`
            <a
                    href="${this.href}"
                    part="base"
                    class="avatar"
                    role="img"
                    style="${styleMap(style)}"
                    aria-label=${this.label ? this.label : this.username}>
                <div class="state-layer"></div>
                ${this.renderContent()}
            </a>
        `;
    }

    private renderContent() {
        if (this.image && !this.hasError) {
            return this.renderImage();
        } else if (this.initials) {
            return this.renderInitials();
        } else {
            return this.renderBlank();
        }
    }

    private renderImage() {
        return html`
            <img
                    part="image"
                    class="image"
                    src="${this.image}"
                    loading="${this.loading}"
                    alt=""
                    @error="${this.handleImageLoadError}"/>
        `;
    }

    private renderInitials() {
        return html`<span part="initials" class="initials ${this.color}"
        >${this.initials}</span
        >`;
    }

    private renderBlank() {
        return html`
            <div part="icon" class="icon" aria-hidden="true">
                <slot name="icon">
                    <sd-icon-person></sd-icon-person>
                </slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-avatar": SdAvatar;
    }
}
