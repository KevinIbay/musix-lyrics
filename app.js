// api keys
const musixApi = config.musixKey;

// input selectors
const artistInput = document.querySelector('#artist');
const songInput = document.querySelector('#song');
const searchBtn = document.querySelector('#search');
const lyricsDisplay = document.querySelector('#lyrics');
const titleDisplay = document.querySelector('#titleDisplay');

// cors proxy cloned from https://github.com/Rob--W/cors-anywhere/
let proxyurl = 'https://serene-sierra-41298.herokuapp.com/';

// event listeners
searchBtn.addEventListener('click', (e) => {
  searchSong(songInput.value, artistInput.value, musixApi)
    .then((res) => {
      console.log(res);
      titleDisplay.textContent = `${res.message.body.track.track_name} by ${res.message.body.track.artist_name}`;

      if (res.message.header.status_code === 200) {
        searchLyrics(res.message.body.track.track_id)
          .then((res) => {
            lyricsDisplay.textContent = res.message.body.lyrics.lyrics_body;
          })
          .catch((err) => console.log(err));
        clearInput();
      }
    })
    .catch((err) => console.log(err));
  e.preventDefault();
});

async function searchSong(songInput, artistInput, musixApi) {
  let url = 'https://api.musixmatch.com/ws/1.1/matcher.track.get?';
  let artist = artistInput;
  let song = songInput;
  const response = await fetch(
    `${proxyurl}${url}apikey=${musixApi}&q_artist=${artist}&q_track=${song}`
  );
  const responseData = await response.json();
  return responseData;
}

async function searchLyrics(trackId, apikey = musixApi) {
  // console.log(`Track ID = ${trackId}`);
  let url = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?';
  const response = await fetch(
    `${proxyurl}${url}apikey=${musixApi}&track_id=${trackId}`
  );
  const responseData = await response.json();
  return responseData;
}

function clearInput() {
  artistInput.value = '';
  songInput.value = '';
}
