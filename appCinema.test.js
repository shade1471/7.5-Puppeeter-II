const { expect } = require("chai");
const {
  clickElement,
  putText,
  getText,
  orderPlace,
  checkStatus,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

function needPlace(row, seat) {
  return `.buying-scheme__wrapper :nth-child(${row}) :nth-child(${seat})`;
}

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Should order ticket for Movie-1 at 19:00", async () => {
    await clickElement(page, '[data-seance-id="93"]');
    await clickElement(page, needPlace(1, 5));
    await clickElement(page, "button.acceptin-button"); //Нажать забронировать
    let timeMovie = await getText(page, ".ticket__start");
    expect(timeMovie).equal("19:00");
    await clickElement(page, ".acceptin-button");
  });

  test.only("The second test should to check that seat is not free", async () => {
    await clickElement(page, '[data-seance-id="93"]');
    await clickElement(page, needPlace(1, 5));
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector(".ticket__check-title");
  });

  test("The first link leads on 'Медиа' page", async () => {
    await clickElement(page, "header a + a");
    const actual = await getText(page, ".logo__media");
    await expect(actual).toContain("Медиа");
  });
});

test("Should look for a course", async () => {
  await page.goto("https://netology.ru/navigation");
  await putText(page, "input", "тестировщик");
  const actual = await page.$eval("a[data-name]", (link) => link.textContent);
  const expected = "Тестировщик ПО";
  expect(actual).toContain(expected);
});

test("Should show warning if login is not email", async () => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await putText(page, 'input[type="email"]', generateName(5));
});
