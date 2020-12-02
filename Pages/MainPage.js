var config = require("../config");

class MainPage {
    constructor(page) {
      this.page = page;
    }

    async openSearchPage() {
        await this.page.goto(config.web.url);
    }

    async search(text){
        await this.page.waitForSelector("css=input[name=q]");
        await this.page.fill("css=input[name=q]" ,text);
        await this.page.click("css=input[name=btnK]");
    }
}

module.exports = { MainPage };