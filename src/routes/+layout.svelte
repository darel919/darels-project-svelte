<script module>
// @ts-nocheck

	// @ts-ignore
	export const load = async ({ fetch, request }) => {
	  const cookie = request.headers.get('cookie');
	  let dp_access_token = null;
  
	  if (cookie) {
		const match = cookie.match(/dp_access_token=([^;]+)/);
		if (match) dp_access_token = match[1];
	  }
	  
  
	  return {
		props: {
		  dp_access_token,
		}
	  };
	};
  </script>
  
  <script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/authStore'; // Adjust the path to your actual store file
	import '../app.css';
	import Profile from '$lib/component/profile.svelte';
  
	// @ts-ignore
	let { children, dp_access_token } = $props();
  
	// @ts-ignore
	function getCookie(name) { 
		const value = `; ${document.cookie}`; 
		const parts = value.split(`; ${name}=`); 
		// @ts-ignore
		if (parts.length === 2) return parts.pop().split(';').shift(); 
	} 
	onMount(async () => { 
		dp_access_token = getCookie('dp_access_token'); 
		if (dp_access_token) { 
			// @ts-ignore
			auth.update(store=>{
				store.token = dp_access_token;
				return store;
			 }); 
			console.log("Auth token detected!", dp_access_token); 
			try {
				const response = await fetch("https://api.darelisme.my.id/dws/user?loginWithCookies=true", {
					credentials: 'include'
				})
				console.log(response)
				const data = await response.json();
				console.log(data);
				auth.update(store => {
					store.current_session = data;
					return store;
				})
			} catch(e) {
				console.error("Can't login using cookies!", e)
			}
		} else { 
			console.log("Auth token not found in cookies"); 
		} 
	});
  </script>
  
  <main class="px-4 py-4">
	<header class="pb-4">
	  <nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
	  </nav>
	  <Profile/>
	</header>
	{@render children()}
  </main>
  
  <style>
	nav {
		display: flex;
		align-items: center;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
  </style>