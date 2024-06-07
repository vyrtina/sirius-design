import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./radio";

const meta: Meta = {
    title: "components/radio",
    component: "sd-radio",
    argTypes: {
        disabled: {
            type: "boolean",
        },
        checked: {
            type: "boolean",
        },
        name: {
            type: "string",
        },
        label: {
            type: "string",
        },
    },
};

export default meta;
type Story = StoryObj;

export const WithoutLabel: Story = {
    render: ({ disabled, checked }) => html`
        <sd-radio name="radiogroup" id="0" ?checked=${checked} ?disabled=${disabled}>
        </sd-radio>
        <sd-radio name="radiogroup" id="1" ?disabled=${disabled}> </sd-radio>
        <sd-radio name="radiogroup" id="2" ?disabled=${disabled}> </sd-radio>
    `,
    args: {
        disabled: false,
        checked: true,
        name: "radio",
    },
};

export const WithLabel: Story = {
    render: ({ label, disabled, checked }) => html`
        <sd-radio name="radiogroup" id="1" ?checked=${checked} ?disabled=${disabled}>
        </sd-radio>
        <label for="1">${label} 1</label>
        <sd-radio name="radiogroup" id="2" ?disabled=${disabled}> </sd-radio>
        <label for="2">${label} 2</label>
        <sd-radio name="radiogroup" id="3" ?disabled=${disabled}> </sd-radio>
        <label for="3">${label} 3</label>
    `,
    args: {
        disabled: false,
        checked: false,
        name: "radio",
        label: "radio",
    },
};
