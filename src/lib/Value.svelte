<script lang="ts">
    export let value: unknown
</script>

<!-- if object, show all keys and values (recursion) -->
<!-- else, stringify the value. -->

{#if typeof value === "object" && value !== null}
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