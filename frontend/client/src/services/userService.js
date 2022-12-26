import { endpoints } from "../endpoints/endpoints";

const getUserSongs = async (userId) => {
  const result = await fetch(endpoints.__API_URL_SONGS__ + userId);
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const addFavouriteSong = async (userId, data) => {
  const result = await fetch(endpoints.__API_URL_SONGS__ + userId + "/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const removeFavouriteSong = async (userId, songId) => {
  const result = await fetch(
    endpoints.__API_URL_SONGS__ + userId + "/remove/" + songId,
    {
      method: "DELETE",
    }
  );
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const UserService = {
  getUserSongs,
  addFavouriteSong,
  removeFavouriteSong,
};

export default UserService;
