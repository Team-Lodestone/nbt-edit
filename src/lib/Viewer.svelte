<script lang="ts">
    import * as NBT from 'nbtify'
	import { onMount } from 'svelte';
    import Value from './Value.svelte'

    export let data: Uint8Array
    let nbt: unknown = null
    let error: unknown = null

    onMount(async () => {    
        try {
            nbt = await (await NBT.read(data)).data
            error = null
        } catch (e) {
            error = e
            console.error(e)
            nbt = null
        }
    })
</script>

{#if nbt}
    <ul>
        <Value value={nbt} />
    </ul>
{:else if error}
    <p>{error}</p>
{/if}