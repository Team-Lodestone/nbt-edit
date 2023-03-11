<script lang="ts">
	import { Short, Float, Int, Byte } from 'nbtify';

	function isNumber(value: unknown): value is number {
		return (
			value instanceof Short ||
			value instanceof Float ||
			value instanceof Int ||
			value instanceof Byte
		);
	}

	function isArray(value: unknown): value is unknown[] {
		return Array.isArray(value) || value instanceof Uint8Array || value instanceof Int8Array;
	}

	export let value: unknown;
</script>

{#if isNumber(value)}
	{value}
{:else if isArray(value)}
	{#if value.length === 0}
		<span><i>Empty List</i></span>
	{:else}
		<ul class="list-l73tg8">
			{#each value as val, i}
				<li>
					[{i}]: <svelte:self value={val} />
				</li>
			{/each}
		</ul>
	{/if}
{:else if typeof value === 'object' && value !== null}
	<ul class="list-l73tg8">
		{#each Object.entries(value) as [key, val]}
			<li>
				<span>{key}: </span>
				<svelte:self value={val} />
			</li>
		{/each}
	</ul>
{:else if typeof value === 'bigint'}
	<span>{value}n</span>
{:else}
	<span>{JSON.stringify(value)}</span>
{/if}

<style>
	ul {
		list-style: none;
	}
</style>
