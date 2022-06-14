const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, And, Then, Before, After } = require("cucumber");
const {
  selectDateTime,
  orderTickets,
  checkSeatIsTaken,
} = require("../../lib/util.js");
const { setDefaultTimeout } = require("cucumber");
const { getText } = require("../../lib/commands.js");
setDefaultTimeout(60 * 1000);

let tomorrow = "nav.page-nav > a:nth-child(2)"; // Билеты на завтра
let oneWeek = "nav.page-nav > a:nth-child(7)"; // Билеты через неделю
let movieTime = "[data-seance-id='94']"; // 14:00, Hercules, Movie1
let ticketHint = "p.ticket__hint";
let confirmingText =
  "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

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

When("user select day and movie", async function () {
  await selectDateTime(this.page, tomorrow, movieTime);
});

When("select and book {int} row and {int} seat", async function (int1, int2) {
  await orderTickets(this.page, int1, int2);
});

When("see that {int} row and {int} seat is taken", async function (int1, int2) {
  await checkSeatIsTaken(this.page, int1, int2);
});

Then("user received confirmation and gr-code", async function () {
  const actual = await getText(this.page, ticketHint);
  expect(actual).contain(confirmingText);
});

Then("Book button is not active", async function () {
  const buttonStatus = await this.page.$eval(
    ".acceptin-button",
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});
