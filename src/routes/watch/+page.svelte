<script>
    let { data } = $props();
    const res = data.response;
    let iframeSrc = 'https://nuxt-projects.darelisme.my.id/iplayer?v='+res.content_id
</script>

<iframe class="rounded-xl" loading="eager" allowfullscreen title="Player" src={iframeSrc}></iframe>
<h1 class="text-2xl mt-4 font-bold">{res.ytData.title}</h1>
<section id="section-owner">
    <h2>{res.submittedBy}</h2>
    <nav>
        <button>Share</button>
        <button title="Click here to go to YouTube if this video won't load">I'm having problems</button>
    </nav>
   
</section>
<section id="section-desc" class="py-4">
    <p>{res.total_views} views</p>
    <p>{res.created_at}</p>
    {#if res.description }
        <p>{res.description}</p>
    {:else}
        <p>{res.ytData.descriptionHtml}</p>
    {/if}
</section>
<style>
    button {
        @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }
    iframe {
        width: 100%;
        min-height: 400px;
    }
</style>