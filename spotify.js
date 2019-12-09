require("dotenv").config();

const makePypress = require("pypress");

const spotify = {};

const py = makePypress();

spotify.login = (username, password) => {
  py.launch({
    // Can't get music to play in headless mode :\
    headless: false,

    // You have to use real Chrome; spotify doesn't work with chromium
    executablePath: process.env.CHROME_PATH,
  });
  py.goto("https://open.spotify.com");

  py.getByText("Log in").click();

  py.getInputForLabel("username").type(username);
  py.getInputForLabel("password").type(password);

  py.click("button:withText(Log in)");
  py.should("navigate");

  return py.asPromise();
};

spotify.searchAndPlay = (term) => {
  py.get("a:withText(Search)").click();
  py.get("input").type(term);

  py.sleep(100);

  py.get(":header:withText(Songs)")
    .closest("section")
    .within(() => {
      py.get("img")
        .first()
        .click();
    });

  return py.asPromise();
};

spotify.play = () => {
  py.get('button[title="Play"]').click();

  return py.asPromise();
};

spotify.pause = () => {
  py.get('button[title="Pause"]').click();

  return py.asPromise();
};

spotify.previous = () => {
  py.get("button[title=Previous]").click();

  return py.asPromise();
};

spotify.next = () => {
  py.get("button[title=Next]").click();

  return py.asPromise();
};

spotify.startRadio = () => {
  py.click('button[title="Queue"]');

  py.get(":header:withText(Now Playing)")
    .closest("section")
    .within(() => {
      py.get("li").hover();
    });

  py.sleep(100);

  py.within(() => {
    py.get("button").click();
  });

  py.sleep(100);

  py.getByText("start radio").click();

  return py.asPromise();
};

spotify.nowPlayingInfo = async () => {
  py.click('button[title="Queue"]');

  py.get(":header:withText(Now Playing)")
    .closest("section")
    .within(() => {
      py.get("li");
    });

  const { el } = await py;

  const text = await el.evaluate((node) => node.innerText || node.textContent);

  return text;
};

spotify.playURL = (url) => {
  py.goto(url);
  py.get("header").within(() => {
    py.get("button:withText(Play)").click();
  });

  return py.asPromise();
};

spotify.logout = () => {
  py.close();

  return py.asPromise();
};

spotify.then = (cb, cb2) => {
  return py.asPromise().then(cb, cb2);
};

spotify.catch = (cb) => {
  py.asPromise().catch(cb);
};

spotify._py = py;

module.exports = spotify;
