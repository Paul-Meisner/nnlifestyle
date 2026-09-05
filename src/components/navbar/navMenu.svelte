<script lang="ts">
import Icon from "@iconify/svelte";
import { onMount } from "svelte";

import type { NavbarLink } from "@/types/config";
import { LinkPresets } from "@constants/link-presets";
import { url } from "@utils/url";
import { onClickOutside } from "@utils/widget";


interface Props {
    links: NavbarLink[];
}

let { links }: Props = $props();
let isOpen = $state(false);
let expanded = $state<Record<string, boolean>>({});

function togglePanel() {
    isOpen = !isOpen;
}

function toggleExpanded(name: string) {
    expanded[name] = !expanded[name];
}

function resolveChildren(link: NavbarLink): NavbarLink[] {
    if (!link.children) return [];
    return link.children.map((item) =>
        typeof item === "number" ? LinkPresets[item] : item,
    );
}

// 点击外部关闭面板
function handleClickOutside(event: MouseEvent) {
    if (!isOpen) return;
    onClickOutside(event, "nav-menu-panel", "nav-menu-switch", () => {
        isOpen = false;
    });
}

onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
});
</script>

<div class="relative md:hidden">
    <button aria-label="Menu" name="Nav Menu" class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90"
        id="nav-menu-switch"
        onclick={togglePanel}
    >
        <Icon icon="material-symbols:menu-rounded" class="text-[1.25rem]"></Icon>
    </button>
    <div id="nav-menu-panel"
        class="float-panel fixed transition-all right-4 px-2 py-2 max-h-[80vh] overflow-y-auto"
        class:float-panel-closed={!isOpen}
    >
        {#each links as link}
            {@const children = resolveChildren(link)}
            <div class="mobile-menu-item mobile-dropdown" data-expanded={!!expanded[link.name]}>
                <div class="flex items-center">
                    <a href={link.external ? link.url : url(link.url)}
                        class="group flex-1 flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition"
                        target={link.external ? "_blank" : null}
                    >
                        <div class="flex items-center transition text-black/75 dark:text-white/75 font-bold group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
                            {#if link.icon}
                                <Icon icon={link.icon} class="text-[1.1rem] mr-2" />
                            {/if}
                            {link.name}
                        </div>
                        {#if !link.external}
                            <Icon icon="material-symbols:chevron-right-rounded" class="transition text-[1.25rem] text-[var(--primary)]" />
                        {:else}
                            <Icon icon="fa6-solid:arrow-up-right-from-square" class="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1" />
                        {/if}
                    </a>
                    {#if children.length > 0}
                        <button
                            aria-label={`Toggle ${link.name} submenu`}
                            class="btn-plain scale-animation rounded-lg w-9 h-9 shrink-0 flex items-center justify-center"
                            onclick={() => toggleExpanded(link.name)}
                        >
                            <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="mobile-dropdown-arrow transition text-[1.25rem]" />
                        </button>
                    {/if}
                </div>
                {#if children.length > 0}
                    <div class="mobile-submenu pl-4">
                        {#each children as child}
                            <a href={child.external ? child.url : url(child.url)}
                                class="group flex justify-between items-center py-2 pl-3 pr-1 rounded-lg gap-8 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition"
                                target={child.external ? "_blank" : null}
                            >
                                <div class="flex items-center transition text-black/60 dark:text-white/60 font-medium group-hover:text-[var(--primary)] group-active:text-[var(--primary)]">
                                    {#if child.icon}
                                        <Icon icon={child.icon} class="text-[1rem] mr-2" />
                                    {/if}
                                    {child.name}
                                </div>
                                {#if child.external}
                                    <Icon icon="fa6-solid:arrow-up-right-from-square" class="transition text-[0.75rem] text-black/25 dark:text-white/25 -translate-x-1" />
                                {/if}
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
