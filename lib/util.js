const { clickElement, getText } = require("./commands.js");

module.exports = {
  orderTickets: async function (page, day, time, row, ...seats) {
    await clickElement(page, day);
    await clickElement(page, time);
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await clickElement(
          page,
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]})`
        );
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_selected`
        );
      }
    } catch (error) {
      throw new Error(`Seat(s) is taken`);
    }
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, ".acceptin-button");
  },
  checkSuccess: async function (page, message) {
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(message);
  },
  checkSeatIsTaken: async function (page, day, time, row, ...seats) {
    await clickElement(page, day);
    await clickElement(page, time);
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_taken`
        );
      }
    } catch (error) {
      throw new Error("Seat(s) is free");
    }
  },
};
