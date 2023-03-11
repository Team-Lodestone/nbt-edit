# [nbt-edit](https://minecraft-manipulator.github.io/nbt-edit)

nbt editor &amp;&amp; viewer component for the web.

```svelte
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
```

## polyfill

The internal library that `nbt-edit` uses, `NBTify`, uses [Compression](https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream) and [Decompression](https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream) streams.\
These are not supported in all browsers. If you are using `nbt-edit` in a browser that does not support these streams, you will need to include a polyfill.

The reccomended polyfill is [compression-streams-polyfill](https://github.com/101arrowz/compression-streams-polyfill), as it works well with SvelteKit.

Firefox does not support these streams, and Chrome supports them only in version 80 and above.
