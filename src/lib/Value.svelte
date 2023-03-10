<script lang="ts">
    import { Short, Float, Int, Byte } from "nbtify";

    function isNumber(value: unknown): value is number {
        return value instanceof Short || value instanceof Float || value instanceof Int || value instanceof Byte;
    }

    export let value: unknown
</script>
{#if isNumber(value)}
    {value}
{:else if typeof value === "object" && value !== null}
    <ul>
        {#each Object.entries(value) as [key, val]}
            <li>
                <span>{key}: </span>
                <svelte:self value={val} />
            </li>
        {/each}
    </ul>
{:else if typeof value === "bigint"}
    <span>{value}n</span>
{:else}
    <span>{JSON.stringify(value)}</span>
{/if}