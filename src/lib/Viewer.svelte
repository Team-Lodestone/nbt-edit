<script lang="ts">
    import * as NBT from 'nbtify'
	import { onMount } from 'svelte';

    export let data: Uint8Array
    let nbt: NBT.NBTData | null = null
    let error: unknown = null

    onMount(async () => {    
        try {
            nbt = await NBT.read(data)
            error = null
        } catch (e) {
            error = e
            console.error(e)
            nbt = null
        }
    })
</script>

{#if nbt}
    <pre>{JSON.stringify(nbt, null, 2)}</pre>
{:else if error}
    <p>{error}</p>
{/if}