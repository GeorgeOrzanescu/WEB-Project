const API_URL = "https://api.spotify.com/v1/";

const getSpotifyData = async (endpoint) => {
  const data = await fetch(API_URL + endpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + global.ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export { getSpotifyData };
