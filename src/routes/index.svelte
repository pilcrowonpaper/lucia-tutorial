<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session.lucia) return;
		return {
			status: 302,
			redirect: '/profile'
		};
	};
</script>

<script lang="ts">
	let username: string;
	let password: string;

	let error = '';

	const login = async () => {
		error = '';
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.ok) return (window.location.href = '/profile');
		const result = await response.json();
		error = result.error;
	};

	const signup = async () => {
		error = '';
		const response = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.ok) return (window.location.href = '/profile');
		const result = await response.json();
		error = result.error;
	};
</script>

<div>
	<label for="username">username</label>
	<input id="username" bind:value={username} />
	<label for="password">password</label>
	<input id="password" bind:value={password} />
	<button on:click={login}>Sign in</button>
	<button on:click={signup}>Create an account</button>
	<p class="error">{error}</p>
</div>
