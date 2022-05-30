module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  orderPlace: async function (page, row, seat) {
    try {
      await page.waitForSelector(".buying-scheme__wrapper");
      let needPlace =
        ".buying-scheme__wrapper :nth-child(" +
        row +
        ") :nth-child(" +
        seat +
        ")";
      await this.clickElement(page, needPlace);
      await page.waitForSelector(needPlace + ".buying-scheme__chair_selected");
    } catch (error) {
      throw error;
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
};
