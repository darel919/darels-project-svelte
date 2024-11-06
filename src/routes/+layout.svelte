<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="px-4 py-4">
	<header class="pb-4">
		<nav>
			<a href="/">Home</a>
		</nav>
	</header>
	{@render children()}
</main>
