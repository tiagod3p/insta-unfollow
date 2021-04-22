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

  await Promise.all([page.waitForSelector(".eyXLr.wUAXj")]);

  let count = 1;
  const QUANTITY_OF_USERS_TO_UNFOLLOW = usersToUnfollow.length
  for (username of usersToUnfollow) {
    try {

      await page.goto(`https://instagram.com/${username}`);
      await Promise.all([
        page.waitForSelector("._5f5mN.-fzfL._6VtSN.yZn4P"),
        page.click("._5f5mN.-fzfL._6VtSN.yZn4P"),
      ]);

      await Promise.all([
        page.waitForSelector(".aOOlW.-Cab_"),
        page.click(".aOOlW.-Cab_"),
      ]);

      console.log(`
      Unfollowing ${username}.
      WAITING ${time}ms to proceed to next unfollow.
      ${count} unfollows.
      ${QUANTITY_OF_USERS_TO_UNFOLLOW - count} remaining.`);

      count++;
    } catch (err) {
      console.log(err.message || err);
    }
  }

  await browser.close();
})();
