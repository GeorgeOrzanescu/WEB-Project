const API_URL = "https://api.spotify.com/v1/";

/**
 * Handles GET requests for different Spotify endpoints
 *
 * @param {String} endpoint - the endpoint of the Spotify API
 *
 * @returns - the data from the endpoint
 */
const getSpotifyData = async (endpoint) => {
  const data = await fetch(API_URL + endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + global.ACCESS_TOKEN.access_token,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export { getSpotifyData };
