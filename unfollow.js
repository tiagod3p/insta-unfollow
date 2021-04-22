const puppeteer = require("puppeteer");

const usersToUnfollow = require("./usernames.json");
const account = require("./env.json");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // set true to run on background
  const page = await browser.newPage();
  await page.goto("https://instagram.com");

  await Promise.all([
    page.waitForSelector('[name="username"]'),
    page.waitForSelector('[name="password"]'),
  ]);

  await page.type('[name="username"]', account.user);
  await page.type('[name="password"]', account.password);

  await Promise.all([
    page.waitForSelector(".sqdOP.L3NKy.y3zKF"),
    page.click(".sqdOP.L3NKy.y3zKF"),
  ]);


  await browser.close();
})();
