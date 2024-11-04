import type { Meta, StoryObj } from "@storybook/web-components";
import "./dropzone";
import { html } from "lit";

const meta: Meta = {
    title: "components/dropzone",
    component: "sd-dropzone",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        label: "label",
        "help-text": "Drop Images, Videos ... Max size 2MB",
    },
    render: () => {
        function handleSubmit(e: Event) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            console.log(formData.getAll("dropzone"));
        }
        return html`
            <form method="GET" @submit=${handleSubmit}>
                <sd-dropzone name="dropzone"></sd-dropzone>
                <button type="submit">Submit</button>
            </form>
        `;
    },
};
