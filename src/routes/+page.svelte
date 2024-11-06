<script>
	import { onMount } from 'svelte';

    let { data } = $props();
    const res = data.response;
    let dp_access_token; // Function to get a specific cookie by name 
    // @ts-ignore
    function getCookie(name) { 
        const value = `; ${document.cookie}`; 
        const parts = value.split(`; ${name}=`); 
        // @ts-ignore
        if (parts.length === 2) return parts.pop().split(';').shift(); 
    } // Get the authToken cookie 

    onMount(() => {
        dp_access_token = getCookie('authToken'); // Now you can use authToken as needed 
        console.log('Auth Token:', dp_access_token);
    })
</script>

<h1 class="text-xl font-bold">Welcome to darel's Project</h1>
<h2>{res.length} videos total</h2>
<h3>What do you want to watch today?</h3>
<main class="my-4">
    {#each res as item}
    <a href={`/watch?v=${item.content_id}`}>
        <article class="vid-items my-4">
            <img class="rounded w-40 h-auto sm:w-40 sm:h-auto md:w-64 md:h-auto lg:w-58 lg:h-auto aspect-[16/9] object-cover" src={item.ytData.videoThumbnails[4].url} loading="lazy" alt={`${item.ytData.title} thumbnail`} />
            <section class="ml-4">
                <h2 class="font-semibold text-xl">{item.ytData.title}</h2>
                <h3 class="text-sm">{item.total_views} views</h3>
            </section>
        </article>
    </a>
    {/each}
</main>

<style>
    .vid-items {
        display: flex;
        align-items: center;
    }
</style>
<footer><h3>Built on Svelte!</h3></footer>

