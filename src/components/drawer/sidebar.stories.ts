import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./sidebar";
import "./sidebar-item";
import "../button/button";

const meta: Meta = {
    title: "components/sidebar",
    component: "sd-sidebar",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Overlay: Story = {
    render: () => {
        return html`
            <sd-sidebar variant="overlay" label="side bar" class="sidebar-overview">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <sd-button>Close</sd-button>
            </sd-sidebar>

            <sd-button>Open sidebar</sd-button>

            <script>
                const sidebar = document.querySelector(".sidebar-overview");
                const openButton = sidebar.nextElementSibling;
                const closeButton = sidebar.querySelector("sd-button");

                openButton.addEventListener("click", () => sidebar.show());
                closeButton.addEventListener("click", () => sidebar.hide());
            </script>
        `;
    },
};

export const PushContent: Story = {
    render: () => {
        return html`
            <sd-sidebar variant="push" label="sidebar" class="sidebar-overview" visible>
                <sd-sidebar-item>Text</sd-sidebar-item>
                <sd-sidebar-item>Menu</sd-sidebar-item>
                <sd-sidebar-item>Help</sd-sidebar-item>
            </sd-sidebar>
            <div class="content">
                <sd-button>expand Sidebar</sd-button>
            </div>

            <style>
                .content {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            </style>

            <script>
                const sidebar = document.querySelector(".sidebar-overview");
                const openButton = sidebar.nextElementSibling;
                const closeButton = sidebar.querySelector("sd-button");

                openButton.addEventListener("click", () => sidebar.toggleExpansion());
                closeButton.addEventListener("click", () => sidebar.collapse());
            </script>
        `;
    },
};
