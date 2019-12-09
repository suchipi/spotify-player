require("dotenv").config();

const py = require("pypress");

const spotify = {};

function waitForPypress() {
  return new Promise((resolve, reject) => {
    Promise.resolve(py).then(() => {
      resolve();
    });
    py.onError = reject;
  });
}

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

  return waitForPypress();
};

spotify.searchAndPlay = (term) => {
  py.get("a:withText(Search)").click();
  py.get("input").type(term);
  py.get(":header:withText(Songs)")
    .closest("section")
    .within(() => {
      py.get("img")
        .first()
        .click();
    });

  return waitForPypress();
};

spotify.play = () => {
  py.get('button[title="Play"]').click();

  return waitForPypress();
};

spotify.pause = () => {
  py.get('button[title="Pause"]').click();

  return waitForPypress();
};

spotify.previous = () => {
  py.get("button[title=Previous]").click();

  return waitForPypress();
};

spotify.next = () => {
  py.get("button[title=Next]").click();

  return waitForPypress();
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

  return waitForPypress();
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

  return waitForPypress();
};

spotify.logout = () => {
  py.close();

  return waitForPypress();
};

module.exports = spotify;
