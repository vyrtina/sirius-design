import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./autocomplete";
import "../select/select-option";
import { ifDefined } from "lit/directives/if-defined.js";
import SdAutocomplete from "./autocomplete";
import SdOption from "../select/select-option";

const meta: Meta = {
    title: "components/autocomplete",
    component: "sd-autocomplete",
    tags: ["autodocs"],
    render: function Render(args) {
        function addValues() {
            let autocomplete = document.querySelector(
                "sd-autocomplete"
            ) as SdAutocomplete;
            let options: SdOption[] = [];
            for (let i = 0; i <= 10; i++) {
                let option: SdOption = new SdOption();
                option.label = "test number " + i;
                option.value = "value_" + i;
                options.push(option);
            }
            autocomplete.options = options;
        }

        function printValue() {
            const autocomplete = document.querySelector(
                "sd-autocomplete"
            ) as SdAutocomplete;
            console.log("value is: %s", autocomplete.value);
        }

        function onSubmit(event: Event) {
            event.preventDefault(); // Prevent form from actually submitting

            const formData = new FormData(event.target as HTMLFormElement);
            const selectedOptions = formData.getAll("autocomplete");

            console.log("Selected options:", selectedOptions);
        }
        return html`
            <form @submit=${onSubmit}>
                <sd-autocomplete
                    name="autocomplete"
                    ?multiple=${args["multiple"]}
                    placeholder=${ifDefined(args["placeholder"])}
                    label=${ifDefined(args["label"])}
                    help-text=${ifDefined(args["help-text"])}
                    ?loading=${args["loading"]}
                    loading-text=${ifDefined(args["loading-text"])}
                    ?required=${args["required"]}
                    ?hoist=${args["hoist"]}>
                </sd-autocomplete>
                <button @click=${addValues}>Add options</button>
                <button @click=${printValue}>Autocomplete value</button>
                <button type="submit">Submit</button>
            </form>
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
        required: true,
    },
};

export const AsynchronousRequests: Story = {
    args: {
        placeholder: "--option--",
        label: "label",
        "help-text": "help text",
        multiple: false,
        required: true,
    },
    render: (args) => {
        async function onInputChange(e: Event) {
            //fetch api data
            const el = e.target as SdAutocomplete;
            const currentInput = el.getInputValue();
            el.loading = true;
            fetch(`https://swapi.py4e.com/api/people/?search=${currentInput}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    const options: SdOption[] = [];
                    data.results.forEach((el: Object) => {
                        const option: SdOption = new SdOption();
                        option.label = el["name"];
                        option.value = el["name"].replace(/ /g, "_");
                        options.push(option);
                    });
                    el.loading = false;
                    el.options = options;
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
        function onChange(e: Event) {
            console.log("changed value to: ", (e.target as SdAutocomplete).value);
        }
        function onSubmit(event: Event) {
            event.preventDefault(); // Prevent form from actually submitting

            const formData = new FormData(event.target as HTMLFormElement);
            const selectedOptions = formData.getAll("autocomplete");

            console.log("Selected options:", selectedOptions);
        }
        return html`
            <form @submit=${onSubmit}>
                <sd-autocomplete
                    name="autocomplete"
                    ?multiple=${args["multiple"]}
                    placeholder=${ifDefined(args["placeholder"])}
                    label=${ifDefined(args["label"])}
                    help-text=${ifDefined(args["help-text"])}
                    ?loading=${args["loading"]}
                    loading-text=${ifDefined(args["loading-text"])}
                    ?required=${args["required"]}
                    ?hoist=${args["hoist"]}
                    @sd-change=${onChange}
                    @sd-input-change="${onInputChange}">
                </sd-autocomplete>
                <button type="submit">Submit</button>
            </form>
        `;
    },
};
