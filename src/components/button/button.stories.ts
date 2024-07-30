import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./button";

const meta: Meta = {
    title: "components/button",
    component: "sd-button",
    tags: ["autodocs"],
    args: {
        textLabel: "button",
    },
    render: ({ textLabel, variant, disabled }) => {
        return html`
            <sd-button variant=${variant} ?disabled=${disabled}>${textLabel}</sd-button>
        `;
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
