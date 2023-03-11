<script lang="ts">
	import 'compression-streams-polyfill';
	import { Viewer } from '$lib';
	import { fromHex } from './hex';

	const resources = import.meta.glob('../resources/*.nbt', { as: 'raw-hex' });

	const resourceNames = Object.entries(resources).map(([path, _]) => {
		const name = path.match(/\/([^/]+)\.nbt$/);

		if (!name) {
			throw Error(`Path ${path} does not match the expected pattern`);
		}

		return [name[1], path];
	});

	let selectedResource = resourceNames[0][1];
    let files: FileList | undefined;

    let data: Promise<Uint8Array> | undefined;
    $: if (!selectedResource) {
        if (files) {
            data = files[0].arrayBuffer().then((buffer) => new Uint8Array(buffer));
        } else {
            data = undefined;
        }
    } else {
        data = resources[selectedResource]().then((data) => fromHex(data.default));
		files = undefined;
    }
</script>

<select bind:value={selectedResource}>
    <option value="">Select a resource</option>
	{#each resourceNames as [name, path]}
		<option value={path}>{name}</option>
	{/each}
</select>

<span>OR</span>

<!-- file upload -->
<input type="file" accept=".nbt" bind:files={files} />

{#await data}
	<p>Loading...</p>
{:then data}
	<Viewer {data} />
{:catch error}
	<p>{error}</p>
{/await}
