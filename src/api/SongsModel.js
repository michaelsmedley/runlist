import axios from "axios";

// function api() {
//   return axios.create({
//     baseURL: "https://api.spotify.com/v1",
//     timeout: 1000,
//   });
// }

const SongsModel = {
  searchTrack: function(query, token) {
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    return new Promise((resolve, reject) => {
      axios
        .get("/search", {
          params: {
            type: "track",
            q: query,
          },
        })
        .then((resp) => {
          resolve(resp.data.tracks.items);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getTrackInfo: function(track, token) {
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    return new Promise((resolve, reject) => {
      axios
        .get(`/audio-features/${track}`)
        .then((resp) => {
          console.log("resp", resp);
          resolve(resp.data.tempo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getRecommendations: function(tempo, track, token) {
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    return new Promise((resolve, reject) => {
      axios
        .get(`/recommendations`, {
          params: {
            target_tempo: tempo,
            // or seed_genres or seed_artists
            seed_tracks: track,
            limit: 20,
            target_popularity: 50,
          },
        })
        .then((resp) => {
          resolve(resp.data.tracks);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createPlaylist: function(userId, info, token) {
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    return new Promise((resolve, reject) => {
      axios
        .post(`/users/${userId}/playlists`, info)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addSongsToPlaylist: function(playlistId, userId, songs, token) {
    console.log("songs", JSON.stringify(songs));
    axios.defaults.baseURL = "https://api.spotify.com/v1";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    const entries = songs;

    return new Promise((resolve, reject) => {
      axios
        .post(`/users/${userId}/playlists/${playlistId}/tracks`, entries,{
          headers: {
            "content-type": "application/json",
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default SongsModel;
