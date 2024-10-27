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
        return html`
            <sd-autocomplete
                ?multiple=${args["multiple"]}
                placeholder=${ifDefined(args["placeholder"])}
                label=${ifDefined(args["label"])}
                help-text=${ifDefined(args["help-text"])}
                ?loading=${args["loading"]}
                loading-text=${ifDefined(args["loading-text"])}
                ?hoist=${args["hoist"]}>
                <sd-option value="option-1">abba test</sd-option>
                <sd-option value="option-2">abbaba</sd-option>
                <sd-option value="option-3">Option 3</sd-option>
                <sd-option value="option-4">Option 4</sd-option>
                <sd-option value="option-5">abba</sd-option>
                <sd-option value="option-6">Option 6</sd-option>
            </sd-autocomplete>
            <button onclick="printValue()">Autocomplete value</button>
            <script>
                function printValue() {
                    const autocomplete = document.querySelector("sd-autocomplete");
                    console.log("value is: %s", autocomplete.value);
                    console.log(autocomplete.value);
                }
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
        multiple: true,
    },
};

export const AsynchronousRequests: Story = {
    args: {
        placeholder: "--option--",
        label: "label",
        "help-text": "help text",
        multiple: false,
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
        return html`
            <sd-autocomplete
                ?multiple=${args["multiple"]}
                placeholder=${ifDefined(args["placeholder"])}
                label=${ifDefined(args["label"])}
                help-text=${ifDefined(args["help-text"])}
                ?loading=${args["loading"]}
                loading-text=${ifDefined(args["loading-text"])}
                ?hoist=${args["hoist"]}
                @sd-change=${onChange}
                @sd-input-change="${onInputChange}">
            </sd-autocomplete>
        `;
    },
};
