import __API_URL__ from "../endpoints/endpoints";

const register = async (userName,password) => {
    const result = await fetch(__API_URL__ + "register",{
        method: "POST",
        body: JSON.stringify({
            username: userName,
            password: password
        }),
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(result.status === 200) {
      console.log(result);
    }
}


const AuthService = {
    register
}

export default AuthService;