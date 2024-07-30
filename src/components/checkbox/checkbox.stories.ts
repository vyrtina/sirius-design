import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./checkbox";

const meta: Meta = {
    title: "components/checkbox",
    component: "sd-checkbox",
    tags: ["autodocs"],
    args: {
        checked: true,
        label: "label",
    },
    render: ({ label, checked, indeterminate, disabled }) => html`
        <sd-checkbox
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            ?disabled=${disabled}>
            <p slot="label">${label}</p>
        </sd-checkbox>
    `,
};

export default meta;
type Story = StoryObj;

export const Checked: Story = {
    args: {
        indeterminate: true,
    },
};

export const Form: Story = {
    args: {
        name: "name",
        value: "value",
    },
    render: ({ label, checked, name, value }) => {
        return html`
            <form method="GET">
                <sd-checkbox ?checked=${checked} name=${name} value=${value}
                    ><p slot="label">${label}</p></sd-checkbox
                >
                <sd-button type="submit">Submit</sd-button>
            </form>
        `;
    },
};
