

const API_URL = "https://api.spotify.com/v1/";

const getData = async (endpoint) => {
    const data = await fetch(API_URL+endpoint,{
        method: "GET",
        headers: {
            Authorization: "Bearer " + global.ACCESS_TOKEN,
            "Content-Type": "application/json"
        }
    })
    return data;
}


export {
    getData
}