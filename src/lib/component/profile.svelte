<script>
    // @ts-nocheck
        import { auth } from '$lib/stores/authStore';
        
        let session = null;
        let error = null;
    
        auth.subscribe(value => {
            try {
                if (value.current_session) {
                    session = value.current_session.data.user.user_metadata;
                } else {
                    session = null;
                }
            } catch (err) {
                session = null;
                error = 'Failed to retrieve session data';
                console.error('Error in auth subscription:', err);
            }
        });
    </script>
    
<section>
    {#if session}
        <a href="https://darelisme.my.id/profile" target="_blank">
            <nav id="profile">
                <p>{session.full_name}</p>
                <img class="rounded-full w-12 ml-2" src={session.avatar_url} alt={session.full_name}/>
            </nav>
        </a>
    {:else if error}
        <p>{error}</p>
    {:else} 
       <nav id="notSignedIn">
            <p>Sign in</p>
            <a href="https://darelisme.my.id/auth/login">
                <button>Login to DWS to use full functionality</button>
            </a>
       </nav>
    {/if}
</section>

<style>
#profile {
    display: flex;
    align-items: center;
}
</style>

    