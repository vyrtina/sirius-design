import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./button";

const meta: Meta = {
    title: "components/button",
    component: "sd-button",
    tags: ["autodocs"],
    args: {
        label: "button",
    },
    render: ({ label, variant }) => {
        return html` <sd-button variant=${variant}>${label}</sd-button> `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        variant: "filled",
    },
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
    },
};

export const Plain: Story = {
    args: {
        variant: "plain",
    },
};

export const IconOnly: Story = {
    args: {
        variant: "outlined",
        IconOnly: true,
    },
    render: ({ variant, IconOnly }) => {
        return html`
            <sd-button id="button" variant=${variant} ?iconOnly=${IconOnly}>
                <sd-icon-edit></sd-icon-edit>
            </sd-button>
        `;
    },
};
