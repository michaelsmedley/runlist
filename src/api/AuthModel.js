import axios from "axios";

const AuthModel = {
  getAppToken: function() {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      console.log("params", params);
      axios
        .post("https://accounts.spotify.com/api/token", params, {
          auth: {
            username: process.env.VUE_APP_SPOTIFY_ID,
            password: process.env.VUE_APP_SPOTIFY_PASS,
          },

          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then((resp) => {
          resolve(resp.data.access_token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCurrentUser: function(token) {
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    return new Promise((resolve, reject) => {
      axios.get("/me", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(resp => {
        resolve(resp.data)
      }).catch(err => {
        reject(err)
      });
    });
  },
};

export default AuthModel;
