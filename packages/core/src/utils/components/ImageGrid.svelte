<script lang="ts">
	import type { IPlugin } from 'packages/core/src/IPlugin';
	import ImageCard from 'packages/core/src/utils/components/ImageCard.svelte';

	const {
		plugin,
		images = [],
	}: {
		plugin: IPlugin;
		images: { link: string; internal: boolean }[];
	} = $props();
</script>

<div class="mb-image-card-grid">
	{#each images as image}
		<ImageCard plugin={plugin} image={image.link} internal={image.internal}></ImageCard>
	{/each}
</div>
