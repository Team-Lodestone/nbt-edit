<script lang="ts">
	import { Short, Float, Int, Byte } from 'nbtify';

	function isNumber(value: unknown): value is number {
		return (
			value instanceof Short ||
			value instanceof Float ||
			value instanceof Int ||
			value instanceof Byte ||
			typeof value === 'number'
		);
	}

	function isArray(value: unknown): value is unknown[] {
		return Array.isArray(value) || value instanceof Uint8Array || value instanceof Int8Array;
	}

	export let value: unknown;
	export let key: string | undefined;
	export let root = false;

	$: fmttedKey = key ? `${key}: ` : '';
</script>

{#if isNumber(value)}
	<span>{fmttedKey}{value}</span>
{:else if isArray(value)}
	{#if value.length === 0}
		{fmttedKey}<span><i>Empty List</i></span>
	{:else}
		<details open>
			<summary>{fmttedKey}</summary>
			<div class="body">
				{#each value as val, i}
					<p>
						[{i}]: <svelte:self root={false} key={undefined} value={val} />
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
{:else if typeof value === 'bigint'}
	<span>{fmttedKey}{value}n</span>
{:else}
	<span>{fmttedKey}{JSON.stringify(value)}</span>
{/if}

<style>
	div.body {
		padding-left: 1rem;
		border-left: 1px solid #ccc;
	}
</style>