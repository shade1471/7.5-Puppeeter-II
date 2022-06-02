const {
  orderTickets,
  checkSuccess,
  checkSeatIsTaken,
} = require("./lib/util.js");

let page;
let tomorrow = "nav.page-nav > a:nth-child(2)"; // Билеты на завтра
let oneWeek = "nav.page-nav > a:nth-child(7)"; // Билеты через неделю
let movieTime = "[data-seance-id='93']"; // 19:00, Hercules, Movie1

describe("Service for Movie tickets order", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(0);
  });

  afterEach(() => {
    page.close();
  });

  test("Should order one ticket for Movie-1 tomorrow", async () => {
    await orderTickets(page, tomorrow, movieTime, 4, 10);
    await checkSuccess(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should order three tickets for Movie-1 in a week", async () => {
    await orderTickets(page, oneWeek, movieTime, 4, 1, 2, 3);
    await checkSuccess(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should try to order ticket for Movie-1 if seat is taken already", async () => {
    await orderTickets(page, tomorrow, movieTime, 4, 10);
    await checkSuccess(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Check if the place is taken after ordering ", async () => {
    await orderTickets(page, oneWeek, movieTime, 4, 6);
    await checkSuccess(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await checkSeatIsTaken(page, oneWeek, movieTime, 4, 6);
  });
});
