import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./top-bar";
import "../searchBar/search-bar";
import "../button/button-plain";
import "../link/link";
import "../iconButton/icon-button-plain";
import "../../icons/src/account_circle";
import "../../icons/src/favorite_border";
import "../../icons/src/shopping_cart";

const meta: Meta = {
    title: "components/top-bar",
    component: "sd-top-bar",
    argTypes: {},

    render: ({}) =>
        html`
            <sd-top-bar>
                <h1 slot="logo">LOGO</h1>
                <sd-search-bar slot="search-bar" size="small"></sd-search-bar>
                <sd-button-plain slot="text-link">Home</sd-button-plain>
                <sd-button-plain slot="text-link">Discover</sd-button-plain>
                <sd-icon-button-plain slot="icon-link"
                    ><sd-icon-account-circle></sd-icon-account-circle
                ></sd-icon-button-plain>
                <sd-icon-button-plain slot="icon-link"
                    ><sd-icon-favorite-border></sd-icon-favorite-border
                ></sd-icon-button-plain>
                <sd-icon-button-plain slot="icon-link"
                    ><sd-icon-shopping-cart></sd-icon-shopping-cart
                ></sd-icon-button-plain>
                <sd-link slot="menu-link">Home</sd-link>
                <sd-link slot="menu-link">Discover</sd-link>
                <sd-link slot="menu-link">Account</sd-link>
                <sd-link slot="menu-link">Favorite</sd-link>
                <sd-link slot="menu-link">Cart</sd-link>
            </sd-top-bar>
        `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {},
};
