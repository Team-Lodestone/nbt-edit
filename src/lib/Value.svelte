<script lang="ts">
	import { Short, Float, Int, Byte } from 'nbtify';

	function fmtNumber(value: unknown): string | undefined {
		if (value instanceof Short) return value.toString() + 's';
		if (value instanceof Float) return value.toString() + 'f';
		if (value instanceof Int) return value.toString();
		if (value instanceof Byte) return value.toString() + 'b';
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'bigint') return value.toString() + 'l';
		return undefined;
	}

	function isArray(value: unknown): value is unknown[] {
		return Array.isArray(value) || value instanceof Uint8Array || value instanceof Int8Array;
	}

	export let value: unknown;
	export let key: string | undefined;
	export let root = false;
</script>

{#if fmtNumber(value) !== undefined}
	<span>{key}: {fmtNumber(value)}</span>
{:else if isArray(value)}
	{#if value.length === 0}
		<span>{key}: <i>Empty List</i></span>
	{:else}
		<details open>
			<summary>{key}</summary>
			<div class="body">
				{#each value as val, i}
					<p>
						<svelte:self root={false} key={`[${i}]`} value={val} />
					</p>
				{/each}
			</div>
		</details>
	{/if}
{:else if typeof value === 'object' && value !== null}
	{#if !root}
		<details open>
			{#if key !== undefined}
				<summary>{key}</summary>
			{/if}
			<div class="body">
				{#each Object.entries(value) as [key, val]}
					<p>
						<svelte:self root={false} {key} value={val} />
					</p>
				{/each}
			</div>
		</details>
	{:else}
		{#each Object.entries(value) as [key, val]}
			<p>
				<svelte:self root={false} {key} value={val} />
			</p>
		{/each}
	{/if}
{:else}
	<span>{key}: {JSON.stringify(value)}</span>
{/if}

<style lang="scss">
	div.body {
		padding-left: 1rem;
		border-left: 1px solid #ccc;
	}

	details summary {
		cursor: pointer;
	}
</style>