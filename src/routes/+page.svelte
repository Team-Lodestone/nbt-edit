<script lang="ts">
    import { Viewer } from "$lib";
    import { fromHex } from "./hex";
    
    const resources = import.meta.glob("../resources/*.nbt", { as: "raw-hex" })

    const resourceNames = Object.entries(resources).map(([path, _]) => {
        const name = path.match(/\/([^/]+)\.nbt$/);

        if (!name) {
            throw Error(`Path ${path} does not match the expected pattern`);
        }

        return [name[1], path]
    })

    let selectedResource = resourceNames[0][1];
    let data: Promise<Uint8Array>;
    
    $: data = resources[selectedResource]().then((data) => fromHex(data.default));
</script>

<select bind:value={selectedResource}>
    {#each resourceNames as [name, path]}
        <option value={path}>{name}</option>
    {/each}
</select>

{#await data}
    <p>Loading...</p>
{:then data}
    <Viewer {data} />
{:catch error}
    <p>{error}</p>
{/await}