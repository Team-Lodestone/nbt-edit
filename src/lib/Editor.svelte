<script lang="ts">
    import { EditorView, basicSetup } from "codemirror"
	import { onMount } from "svelte";

    let container: HTMLDivElement

    onMount(() => {
        new EditorView({
            extensions: [basicSetup],
            parent: container
        })
    })

</script>

<div bind:this={container}/>