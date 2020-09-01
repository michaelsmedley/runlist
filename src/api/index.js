import axios from "axios";

function api(token) {
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const authApi = () => {
  return axios.create({
    baseURL: "https://accounts.spotify.com/api",
    timeout: 1000,
    auth: {
      username: process.env.VUE_APP_SPOTIFY_ID,
      password: process.env.VUE_APP_SPOTIFY_SECRET,
    },
    params: {
      grant_type: "client_credentials",
    },
  });
};

export { api, authApi };
