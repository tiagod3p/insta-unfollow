const puppeteer = require("puppeteer");

const usersToUnfollow = require("./usernames.json");
const account = require("./env.json");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // set true to run on background
  const page = await browser.newPage();
  await page.goto("https://instagram.com");

  await browser.close();
})();
