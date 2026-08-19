import axios from 'axios';

// Use user agents
// User agents is not working
// const USER_AGENTS = [
//   'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/91.0',
//   'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
// ];


// Use proxies
const API_ENDPOINTS = [
  'http://localhost:3000/musixmatch/lyrics',
  'https://lyrics.shittybot.xyz/musixmatch/lyrics',
];

async function fetchLyricsWithAgentAndEndpoint(title: string, userAgent: string, apiEndpoint: string) {
  try {
    const response = await axios.get(`${apiEndpoint}?title=${encodeURIComponent(title)}`, {
    // No longer use as user agent do not work
    //   headers: {
    //     'User-Agent': userAgent,
    //   },
    });

    if (!response.data) return undefined;

    return {
      artwork: response.data.artwork_url,
      trackName: response.data.track_name,
      artistName: response.data.artist_name,
      lyrics: response.data.lyrics,
    };
  } catch (error) {
    console.error(`Error with User-Agent "${userAgent}" on API "${apiEndpoint}": ${error as string}`);
    return undefined;
  }
}

export default async function fetchLyrics(title: string) {
  for (const apiEndpoint of API_ENDPOINTS) {
    for (const userAgent of USER_AGENTS) {
      const result = await fetchLyricsWithAgentAndEndpoint(title, userAgent, apiEndpoint);
      if (result) {
        return result;
      }
    }
  }

  console.log('Lyrics not found with any User-Agent or API endpoint.');
  return undefined;
}

fetchLyrics("Title here").then((result) => {
  if (result) {
    console.log(result);
  } else {
    console.log("Lyrics not found or an error occurred.");
  }
});
