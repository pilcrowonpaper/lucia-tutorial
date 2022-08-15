<script lang="ts">
	import '../app.css';
    import { Lucia } from "lucia-sveltekit/client"
    import { session } from "$app/stores"
</script>

<Lucia {session} on:error={(e) => {console.error(e)}}>
	<slot />
</Lucia>


<style lang="postcss">
	:global(body) {
		@apply flex place-content-center place-items-center h-screen;
	}
	:global(div) {
		@apply flex flex-col max-w-sm w-full p-4;
	}
	:global(input) {
		@apply border rounded px-2 py-1;
	}
	:global(button) {
		@apply bg-black text-white px-2 py-1 rounded my-1;
	}
	:global(.error) {
		@apply text-sm text-red-400;
	}
	:global(label) {
		@apply text-sm;
	}
</style>
