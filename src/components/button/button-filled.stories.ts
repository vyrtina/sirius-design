import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./button-filled";

const meta: Meta = {
    title: "components/button/button-filled",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        invert: {
            type: "boolean",
        },
        label: {
            type: "string",
        },
        hasIcon: {
            type: "boolean",
        },
        size: {
            options: ["s", "m", "l", "xl"],
            control: { type: "select" },
        },
    },
    render: ({ label, hasIcon, disabled, invert, size }) =>
        html`
            <sd-button-filled
                ?hasIcon=${hasIcon}
                ?disabled=${disabled}
                ?invert=${invert}
                size=${size}>
                <sd-icon-edit slot="icon"></sd-icon-edit>${label}
            </sd-button-filled>
        `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        disabled: false,
        invert: false,
        hasIcon: true,
        label: "Button",
        size: "m",
    },
};
