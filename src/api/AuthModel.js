import { authApi, api } from "./index";

const AuthModel = {
  getAppToken: function() {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      authApi()
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
    return new Promise((resolve, reject) => {
      api(token)
        .get("/me")
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default AuthModel;
