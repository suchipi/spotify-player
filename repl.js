require("dotenv").config();
const chalk = require("chalk");

const py = require("pypress");
py.onCommandRun = (command) => {
  if (command.name === "evaluate") {
    console.log("Run:", { name: command.name });
  } else {
    console.log("Run:", command);
  }
};
py.onError = (error) => console.error("Error:", chalk.red(error.stack));

const spotify = require("./spotify");
const repl = require("repl");

spotify.login(process.env.SPOTIFY_USERNAME, process.env.SPOTIFY_PASSWORD);
spotify.searchAndPlay("dark cat crazy milk");

const replServer = repl.start();
Object.assign(replServer.context, {
  py,
  spotify,
});
