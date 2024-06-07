import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../icons/src/edit";
import "./icon-button-filled";
import "./icon-button-outlined";
import "./icon-button-plain";
import { SdIconButtonFilled } from "./icon-button-filled";

//import DocumentationTemplate from "./icon-button.stories.mdx";

const meta: Meta = {
    title: "components/icon-button",
    component: "sd-icon-button-filled",
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            type: "boolean",
            description: "make it disabled",
        },
        href: {
            type: "string",
        },
        invert: {
            type: "boolean",
        },
        size: {
            options: ["s", "m", "l", "xl"],
            control: { type: "select" },
        },
    },
};

export default meta;
type Story = StoryObj;

export const Filled: Story = {
    render: ({ disabled, invert, size, href }) => html`
        <sd-icon-button-filled
            ?disabled=${disabled}
            ?invert=${invert}
            size=${size}
            href=${href}
            aria-label="an icon button">
            <sd-icon-edit></sd-icon-edit>
        </sd-icon-button-filled>
    `,
    args: {
        disabled: false,
        invert: false,
        size: "m",
        href: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication",
    },
};

export const Outlined: Story = {
    render: ({ disabled, invert, size, href }) => html`
        <sd-icon-button-outlined
            ?disabled=${disabled}
            ?invert=${invert}
            size=${size}
            href=${href}
            aria-label="an icon button">
            <sd-icon-edit></sd-icon-edit>
        </sd-icon-button-outlined>
    `,
    args: {
        disabled: false,
        invert: false,
        size: "m",
    },
};

export const Plain: Story = {
    render: ({ disabled, invert, size, href }) => html`
        <sd-icon-button-plain
            ?disabled=${disabled}
            ?invert=${invert}
            size=${size}
            href=${href}
            aria-label="an icon button">
            <sd-icon-edit></sd-icon-edit>
        </sd-icon-button-plain>
    `,
    args: {
        disabled: false,
        invert: false,
        size: "m",
    },
};
