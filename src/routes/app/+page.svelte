<script lang="ts">
	import 'compression-streams-polyfill';
	import { Viewer } from '$lib';

	let files: FileList | undefined;

	let data: Promise<Uint8Array> | undefined;
	$: if (files) {
		data = files[0].arrayBuffer().then((buffer) => new Uint8Array(buffer));
	} else {
		data = undefined;
	}
</script>

<input type="file" accept=".nbt" bind:files />

{#await data}
	<p>Loading...</p>
{:then data}
	<Viewer {data} />
{:catch error}
	<p>{error}</p>
{/await}
