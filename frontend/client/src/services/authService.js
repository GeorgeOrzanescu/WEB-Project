import { endpoints } from "../endpoints/endpoints";

const register = async (userName, password) => {
  const result = await fetch(endpoints.__API_URL__ + "register", {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (result.status === 201) {
    const data = await result.json();
    return data;
  }
};

const login = async (userName, password) => {
  const result = await fetch(endpoints.__API_URL__ + "login", {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (result.status === 201) {
    const data = await result.json();
    return data;
  }
};

const AuthService = {
  register,
  login,
};

export default AuthService;
