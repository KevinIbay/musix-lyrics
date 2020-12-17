// api keys
const musixApi = '8c9aba7820f0a2a2c679ca19e9441cbe';

// input selectors
const artistInput = document.querySelector('#artist').value;
const songInput = document.querySelector('#song').value;
const searchBtn = document.querySelector('#search');
const lyricsDisplay = document.querySelector('#lyrics');

// event listeners
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchSong(songInput, artistInput, musixApi)
    .then((res) => {
      if (res.message.header.status_code === 200) {
        searchLyrics(res.message.body.track.track_id)
          .then((res) => {
            lyricsDisplay.textContent = res.message.body.lyrics.lyrics_body;
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

async function searchSong(songInput, artistInput, musixApi) {
  let proxyurl = 'https://cors-anywhere.herokuapp.com/';
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
  let proxyurl = 'https://cors-anywhere.herokuapp.com/';
  let url = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?';
  const response = await fetch(
    `${proxyurl}${url}apikey=${musixApi}&track_id=${trackId}`
  );
  const responseData = await response.json();
  return responseData;
}
