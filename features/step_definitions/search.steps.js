const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  orderTickets,
  checkSuccess,
  checkSeatIsTaken,
} = require("../../lib/util.js");
const { setDefaultTimeout } = require("cucumber");
const { getText } = require("../../lib/commands.js");
setDefaultTimeout(60 * 1000);

let tomorrow = "nav.page-nav > a:nth-child(2)"; // Билеты на завтра
let oneWeek = "nav.page-nav > a:nth-child(7)"; // Билеты через неделю
let movieTime = "[data-seance-id='93']"; // 19:00, Hercules, Movie1

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When(
  "user select day and movie and then select {int} row and {int} seat and click button to book",
  async function (int1, int2) {
    await orderTickets(this.page, tomorrow, movieTime, int1, int2);
  }
);

When(
  "user select day and movie and then try to select {int} row and {int} seat and sees that seat is taken",
  async function (int1, int2) {
    await checkSeatIsTaken(this.page, tomorrow, movieTime, int1, int2);
  }
);

Then("user received confirmation and gr-code", async function () {
  const actual = await getText(this.page, "p.ticket__hint");
  expect(actual).contain(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
});

Then("user go back to main {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});
