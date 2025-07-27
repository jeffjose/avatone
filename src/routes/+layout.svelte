<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	
	// Register service worker for aggressive caching
	onMount(() => {
		if (browser && 'serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').catch((error) => {
				console.error('Service worker registration failed:', error);
			});
		}
	});
</script>

{@render children()}
