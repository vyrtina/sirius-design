import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./icon";

const meta: Meta = {
    title: "components/icon",
    component: "sd-icon",
    argTypes: {
        icon: {
            type: "string",
        },
        shape: {
            options: ["outlined", "rounded", "sharp"],
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large", "extra-large"],
            control: { type: "select" },
        },
    },
    render: ({}) => html`
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="edit" viewBox="0 0 24 24">
                <path
                    d="m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
            </symbol>
        </svg>
        <sd-icon></sd-icon>
    `,
};

export default meta;
type Story = StoryObj;

export const Icon: Story = {
    args: {
        name: "edit",
        fill: false,
        size: "medium",
    },
};
