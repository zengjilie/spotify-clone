var SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
    'playlist-read-collaborative',
    'playlist-read-private',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-modify-playback-state',
].join(',');

const params = {
    scope:scopes,
}

const queryParamString = new URLSearchParams(params).toString();
console.log(queryParamString);
const LOGIN_URL ='https://accounts.spotify.com/authorize?' + queryParamString;

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default LOGIN_URL;

export {spotifyApi};
