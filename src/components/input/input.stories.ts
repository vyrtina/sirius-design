import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./input";
import "../../icons/src/agriculture";
import "../../icons/src/photo_camera";
import { error } from "console";

const meta: Meta = {
    title: "components/input",
    component: "sd-input",
    tags: ["autodocs"],
    args: {
        label: "label",
        placeholder: "placeholder",
        type: "text",
        "help-text": "this is a help text",
        clearable: true,
    },
};

export default meta;
type Story = StoryObj;

export const Text: Story = {};

export const WithIcons: Story = {
    render: ({ label, placeholder, type, clearable }) => html`
        <sd-input
            label=${label}
            placeholder=${placeholder}
            type=${type}
            ?clearable=${clearable}>
            <sd-icon-agriculture slot="icon"></sd-icon-agriculture>
            <sd-icon-photo-camera slot="trailing-icon"></sd-icon-photo-camera>
        </sd-input>
    `,
};

export const Password: Story = {
    args: {
        type: "password",
        passwordToggle: true,
    },
};

export const Invalid: Story = {
    args: {
        value: "as68ka",
        error: true,
        "error-text": "string must only contains caracters",
        required: true,
    },
};

export const Form: Story = {
    render: ({ label, placeholder, type, clearable }) => html`
        <form>
            <sd-input
                label=${label}
                placeholder=${placeholder}
                type=${type}
                ?clearable=${clearable}>
            </sd-input>
            <button type="submit">Submit</button>
        </form>

        <output></output>

        <script>
            /** Get a reference to the form */
            const form = document.querySelector("form");

            /** Get the output element to display form data in */
            const output = document.querySelector("output");

            /** Prevent default on form submissions */
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                console.log(document.querySelector("sd-input").internals);

                const form = event.target;

                /** Get all of the form data */
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => (data[key] = value));
                output.innerHTML = JSON.stringify(data, null, 2);
            });
        </script>
    `,
};
