import axios from "axios";

function api(token) {
  axios.create({
    baseURL: "https://api.spotify.com/v1",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export default api;
