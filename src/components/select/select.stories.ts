import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./select";
import "./select-option";
import { ifDefined } from "lit/directives/if-defined.js";

const meta: Meta = {
    title: "components/select",
    component: "sd-select",
    tags: ["autodocs"],
    render: function Render(args) {
        return html`
            <form>
                <sd-select
                    name="select"
                    value="option-4"
                    ?multiple=${args["multiple"]}
                    placeholder=${ifDefined(args["placeholder"])}
                    label=${ifDefined(args["label"])}
                    help-text=${ifDefined(args["help-text"])}
                    ?hoist=${args["hoist"]}>
                    <sd-option value="option-1">Option 1</sd-option>
                    <sd-option value="option-2">Option 2</sd-option>
                    <sd-option value="option-3">Option 3</sd-option>
                    <sd-option value="option-4">Option 4</sd-option>
                    <sd-option value="option-5">Option 5</sd-option>
                    <sd-option value="option-6">Option 6</sd-option>
                </sd-select>
                <button type="reset">Submit</button>
            </form>
            <script>
                document
                    .querySelector("form")
                    .addEventListener("submit", function (event) {
                        event.preventDefault(); // Prevent form from actually submitting

                        const formData = new FormData(event.target);
                        const selectedOptions = formData.getAll("select");

                        console.log("Selected options:", selectedOptions);
                    });
                document
                    .querySelector("sd-select")
                    .addEventListener("sd-change", () => console.log("sd-change fired"));
                document
                    .querySelector("sd-select")
                    .addEventListener("sd-input", () => console.log("sd-input fired"));
            </script>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
    args: {
        placeholder: "--option--",
        label: "label",
        "help-text": "help text",
        multiple: false,
    },
};
