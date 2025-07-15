const { defineConfig } = require("cypress");
require("dotenv").config(); // Load from .env

module.exports = defineConfig({
  e2e: {
    //baseUrl: process.env.BASE_URL || "http://fake-api.com:3000",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    env: {
      login_url: process.env.LOGIN_URL,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      api_url: process.env.API_URL,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
