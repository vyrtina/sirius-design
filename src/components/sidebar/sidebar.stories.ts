import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./sidebar";
import "./sidebar-item";
import "../button/button";
import "../../icons/src/browse_gallery";

const meta: Meta = {
    title: "components/sidebar",
    component: "sd-sidebar",
    tags: ["autodocs"],
    render: (args) => {
        return html`
            <div class="page">
                <sd-sidebar
                    variant=${args["variant"]}
                    label="sidebar"
                    class="sidebar-overview"
                    visible>
                    <sd-sidebar-item
                        ><sd-icon-browse-gallery slot="prefix"></sd-icon-browse-gallery
                        >Text</sd-sidebar-item
                    >
                    <sd-sidebar-item>Menu</sd-sidebar-item>
                    <sd-sidebar-item>Help</sd-sidebar-item>
                </sd-sidebar>
                <div class="content">
                    <sd-button class="toggle_expand">expand Sidebar</sd-button>
                    <sd-button class="toggle_show">show Sidebar</sd-button>
                </div>
            </div>

            <style>
                .sb-main-padded {
                    padding: 0 !important;
                }
                .page {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    height: 100%;
                }
                .content {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            </style>

            <script>
                const sidebar = document.querySelector(".sidebar-overview");
                const toggleExpansionButton = document.querySelector(".toggle_expand");
                const toggleShowButton = document.querySelector(".toggle_show");

                toggleExpansionButton.addEventListener("click", () =>
                    sidebar.toggleExpansion()
                );
                toggleShowButton.addEventListener("click", () => sidebar.toggleDisplay());
            </script>
        `;
    },
};

export default meta;
type Story = StoryObj;

export const Overlay: Story = {
    args: {
        variant: "overlay",
    },
};

export const Push: Story = {
    args: {
        variant: "push",
    },
};

export const Responsive: Story = {
    args: {
        variant: "responsive",
    },
};
