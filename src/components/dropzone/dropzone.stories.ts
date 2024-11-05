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
            console.log(formData.getAll("upload"));
        }
        return html`
            <form method="get" @submit=${handleSubmit} enctype="multipart/form-data">
                <sd-dropzone name="dropzone"></sd-dropzone>
                <input type="file" name="upload" multiple></input>
                <button type="submit">Submit</button>
            </form>
        `;
    },
};
