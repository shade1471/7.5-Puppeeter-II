const {
  clickElement,
  putText,
  getText,
  orderPlace,
} = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

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

  test.only("Should order ticket for Movie-1 at 19:00", async () => {
    await clickElement(page, '[data-seance-id="93"]');

    await orderPlace(page, 1, 3);

    // let firstPlaceFirsRow =
    //   ".buying-scheme__wrapper :nth-child(1) :nth-child(1)";
    // let placeSelected = firstPlaceFirsRow + ".buying-scheme__chair_selected";

    //await clickElement(page, firstPlaceFirsRow);
    // await page.waitForSelector(placeSelected);

    await clickElement(page, "button.acceptin-button"); //Нажать забронировать

    // let timeMovie = await page.$eval(
    //   ".ticket__start",
    //   (element) => element.textContent
    // );
    // await expect(timeMovie).toEqual("19:00");

    // await clickElement(page, ".acceptin-button"); //Нажать забронировать

    //await p

    // await clickElement(page, first);

    // await Wai;

    // console.log("Page title: " + title2);
    // const pageList = await browser.newPage();
    // await pageList.goto("https://netology.ru/navigation");
    // await pageList.waitForSelector("h1");
  });

  test("The first link text 'Медиа Нетологии'", async () => {
    const actual = await getText(page, "header a + a");
    expect(actual).toContain("Медиа Нетологии");
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
