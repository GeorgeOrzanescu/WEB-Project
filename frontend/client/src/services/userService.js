import __API_URL__ from "../endpoints/endpoints";

const getUserSongs = async (userId) => {
  const result = await fetch(__API_URL__ + "songs/" + userId);
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const addFavouriteSong = async (userId,data) => {
  const result = await fetch(__API_URL__ + "songs/" + userId + "/add",{
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
}

const UserService = {
  getUserSongs,
  addFavouriteSong
};

export default UserService;
