import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "../../icons/src/favorite";
import "../../icons/src/more_vert";
import "./dropdown";
import "../menu/menu";
import "../menu/menu-item";

const meta: Meta = {
    title: "components/dropdown",
    component: "sd-dropdown",
    tags: ["autodocs"],
    render: () => {
        return html`
            <sd-dropdown>
                <sd-icon-button slot="trigger"
                    ><sd-icon-more-vert></sd-icon-more-vert
                ></sd-icon-button>
                <sd-menu>
                    <sd-menu-item>Dropdown Item 1</sd-menu-item>
                    <sd-menu-item>Dropdown Item 2</sd-menu-item>
                    <sd-menu-item>Dropdown Item 3</sd-menu-item>
                    <sd-divider></sd-divider>
                    <sd-menu-item type="checkbox" checked>Checkbox</sd-menu-item>
                    <sd-menu-item disabled>Disabled</sd-menu-item>
                    <sd-divider></sd-divider>
                    <sd-menu-item>
                        Prefix
                        <sd-icon-edit slot="prefix"></sd-icon-edit>
                    </sd-menu-item>
                    <sd-menu-item>
                        Suffix Icon
                        <sd-icon-favorite slot="suffix"></sd-icon-favorite>
                    </sd-menu-item>
                </sd-menu>
            </sd-dropdown>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};
