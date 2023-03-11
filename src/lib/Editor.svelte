<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	export let value = '';
	let view: EditorView;

	onMount(() => {
		view = new EditorView({
			extensions: [
				basicSetup,
				EditorView.updateListener.of(function (e) {
					value = e.state.doc.toString();
				})
			],
			doc: value,
			parent: container
		});
	});

	$: {
		const transaction = view?.state.update({
			changes: { from: 0, to: view.state.doc.length, insert: value }
		});
		view?.dispatch(transaction);
	}
</script>

<div bind:this={container} />
