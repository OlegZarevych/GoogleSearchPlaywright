const { chromium } = require("playwright");
const { MainPage } = require("../Pages/MainPage");
const assert = require("assert");
var config = require("../config");
let browser;
let page;


beforeAll(async () => {
    console.log("headless : " + config.web.headless);
    console.log("sloMo : " + config.web.sloMo);
    browser = await chromium.launch({
      headless: config.web.headless == "true",
      slowMo: parseInt(config.web.sloMo, 10),
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    if (config.web.networkSubscription) {
      page.on("request", (request) =>
        console.log(">>", request.method(), request.url())
      );
      page.on("response", (response) =>
        console.log("<<", response.status(), response.url())
      );
    }
  });

  afterEach(async () => {
    await page.close();
  });
  
  test("User search text", async () => {
    const mainPage = new MainPage(page);
    await mainPage.openSearchPage();
    await mainPage.search("text");
  });
  