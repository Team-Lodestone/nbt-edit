<script lang="ts">
    import * as NBT from 'nbtify'
	import { onMount } from 'svelte';

    export let data: Uint8Array
    let nbt: NBT.NBTData

    onMount(async () => {    
        nbt = await NBT.read(data)
    })
</script>

{#if nbt}
    <pre>{JSON.stringify(nbt, null, 2)}</pre>
{/if}