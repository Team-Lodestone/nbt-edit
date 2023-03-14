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

<div id="container">
	<main>
		<h1>NBT-Edit</h1>

		<p>View and edit NBT data.</p>

		<p>View the demo here, or open the dedicated <a href="/nbt-edit/app">NBT-Edit app</a>.</p>

		<div class="editor">
			<div class="select">
				<select bind:value={selectedResource}>
					<option value="">Select a resource</option>
					{#each resourceNames as [name, path]}
						<option value={path}>{name}</option>
					{/each}
				</select>
	
				<span>OR</span>
	
				<input type="file" accept=".nbt" bind:files />
			</div>


			{#await data}
				<p>Loading...</p>
			{:then data}
				<Viewer {data} />
			{:catch error}
				<p>{error}</p>
			{/await}
		</div>
	</main>
</div>

<style>
	.select {
		text-align: center;
		width: 100%;
		margin-bottom: 0.5rem;
	}

	.editor {
		border: 1px solid #ccc;
		padding: 0.5rem;
		margin: 0.5rem;
		width: 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 800px;
	}

	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>