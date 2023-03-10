<script lang="ts">
	import * as NBT from 'nbtify';
	import { onMount } from 'svelte';
	import Value from './Value.svelte';
    import "./list.scss"

	export let data: Uint8Array | undefined;
	let nbt: Promise<unknown> | null = null;
	let error: unknown = null;

    $: try {
        if (data) {
            nbt = NBT.read(data).then((nbt) => nbt.data);
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
	{#if nbt}
        {#await nbt}
            <p>Loading...</p>
        {:then nbt}
            <ul class="list">
                <Value value={nbt} />
            </ul>
        {/await}
	{:else if error}
		<p>{error}</p>
	{/if}
</div>