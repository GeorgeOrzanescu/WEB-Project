import __API_URL__ from "../endpoints/endpoints";

const getUserSongs = async (userId) => {
  const result = await fetch(__API_URL__ + "songs/" + userId);
  if (result.status === 200) {
    const data = await result.json();
    return data;
  }
};

const UserService = {
  getUserSongs,
};

export default UserService;
