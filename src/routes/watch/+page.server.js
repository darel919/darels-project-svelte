import { error } from "@sveltejs/kit";

// @ts-ignore
export async function load({url, fetch}) {
    const videoId = url.searchParams.get('v');
    if(!videoId) {
        throw error (400, "No VideoId supplied!")
    }
    const res = await fetch(`http://10.10.10.10:328/dp/watch?v=${videoId}`);
    if(!res.ok) {
        throw error (res.status, 'Failed to fetch video data.')
    }

    const videoData = await res.json();
    if(!videoData) {
        throw error (404, "Video not found");
    }

    return {
        // props: { videoData }
        response: videoData

    }
}