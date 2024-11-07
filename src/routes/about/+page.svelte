<script>
// @ts-nocheck

    import {auth} from '$lib/stores/authStore';
    // @ts-ignore
    let token;
    let session;
    auth.subscribe(value => {
        token = value.token;
        session = value.current_session.data.user
    })
</script>

<h1 class="font-bold text-2xl">About Projects: </h1>
<h2>darel's Project was built using Svelte</h2>
{#if token && session}
    <p>Your token is: {token}</p>
    <p>Current session: {JSON.stringify(session)}</p>
{:else} 
    <p>You're not signed in.</p>
    <a href="https://darelisme.my.id/auth/login">
        <button>Login to DWS to use full functionality</button>
    </a>
{/if}
