# spotify-player

This is a JavaScript API that drives Spotify in a Chrome window.

You need to have Chrome installed. And it can't run headless, so on Linux, you need an x window server. You can use xvfb if you don't have a graphics card or are in a container.

## Usage

You need the following environment variable(s) set:

```sh
CHROME_PATH="path to your chrome executable"
```

Then:

```js
const spotify = require("@suchipi/spotify-player");

// You have to login first
spotify.login(username, password);

// Then you can search for something and play the first result
spotify.searchAndPlay("c418");

// Or, you can play an album or playlist URL directly
spotify.playURL("https://open.spotify.com/playlist/1L3GAiiBL5sBNbDEAMGMEA");

// These functions click the corresponding buttons at the bottom of the screen:
spotify.play();
spotify.pause();
spotify.previous();
spotify.next();

// To start radio for the currently-playing song:
spotify.startRadio();

// To get info about the currently-playing song:
const infoString = await spotify.nowPlayingInfo();
```

## Example REPL

Given a `.env` file in the current working directory with the following environment variables defined:

```
SPOTIFY_USERNAME="your spotify username or email"
SPOTIFY_PASSWORD="your spotify password"
CHROME_PATH="path to your chrome executable"
```

You can run `node -r @suchipi/spotify-player/repl -e ''` to load a sample song and open a repl where you can test other commands.

## License

MIT
