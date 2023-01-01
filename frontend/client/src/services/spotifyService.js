import { endpoints } from "../endpoints/endpoints";

const authorizeSpotify = async () => {
  const result = await fetch(endpoints.__SPOTIFY_AUTHORIZE__);
  if (result.status === 200) {
    return true;
  }
};

const getSpotifyTrendingSongs = async () => {
  const result = await fetch(endpoints.__SPOTIFY_URL_SONGS__);
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const SpotifyService = {
  getSpotifyTrendingSongs,
  authorizeSpotify,
};

export default SpotifyService;
