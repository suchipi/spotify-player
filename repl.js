require("dotenv").config();

const spotify = require("./spotify");
const repl = require("repl");

spotify.login(process.env.SPOTIFY_USERNAME, process.env.SPOTIFY_PASSWORD);
spotify.searchAndPlay("dark cat crazy milk");

spotify.catch((err) => {
  console.error(err);
});

const replServer = repl.start();
Object.assign(replServer.context, {
  spotify,
  py: spotify._py,
});
