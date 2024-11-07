import { error } from "@sveltejs/kit";

// @ts-ignore
export async function load({fetch}) {
    const res = await fetch(`http://10.10.10.10:328/dp?sortBy=desc`, {
        // credentials: 'include'
    });
    if(!res.ok) {
        throw error (res.status, 'Failed to fetch video data.')
    }

    const videoData = await res.json();
    if(!videoData) {
        throw error (404, "Video not found");
    }

    return {
        response: videoData
    }
}