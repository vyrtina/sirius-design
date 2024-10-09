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
    render: (args) => html`
        <form>
            <sd-checkbox
                ?checked=${args["checked"]}
                ?indeterminate=${args["indeterminate"]}
                ?disabled=${args["disabled"]}
                name=${args["name"]}>
                <p slot="label">${args["label"]}</p>
            </sd-checkbox>
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

                console.log(document.querySelector("sd-checkbox").value);

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

export default meta;
type Story = StoryObj;

export const Checked: Story = {
    args: {
        name: "checkbox name",
        checked: false
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
