<script lang="ts">
	import * as NBT from 'nbtify';
	import Value from './Value.svelte';
    import "./list.scss"

	export let data: Uint8Array | undefined;
	let nbt: Promise<NBT.NBTData> | null = null;
	let error: unknown = null;

    let view: "structured" | "raw" = "structured";
    let writer = new NBT.SNBTWriter()

    $: try {
        if (data) {
            nbt = NBT.read(data);
            error = null;
        } else {
            nbt = null;
            error = "No data";
        }
    } catch (e) {
        error = e;
        console.error(e);
        nbt = null;
    }
</script>

<div>
    <div class="tabs">
        <button class="{view === 'structured' ? 'active' : ''}" on:click={() => view = "structured"}>Structured View</button>
        <button class="{view === 'raw' ? 'active' : ''}" on:click={() => view = "raw"}>Raw View</button>
    </div>
    {#if nbt}
        {#await nbt}
            <p>Loading...</p>
        {:then nbt}
            {#if view === "structured"}
                <ul class="list-l73tg8">
                    <Value value={nbt.data} />
                </ul>
            {:else}
                {writer.write(nbt.data)}
            {/if}
        {/await}
    {:else if error}
        <p>{error}</p>
    {/if}
</div>

<style lang="scss">
    .tabs {
        background: #f1f1f1;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 0.5rem;

        button {
            width: 50%;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            padding: 0.5rem;

            &.active {
                background: #ccc;
            }
        }
    }
</style>