// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// promisified fs module
const { readJson } = require("fs-extra");
const { resolve } = require("path");

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
function getConfigurationByFile(file) {
  if (file) {
    const pathToConfigFile = resolve("cypress/", "config", `${file}.json`);

    return readJson(pathToConfigFile);
  }
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // accept a configFile value or use development by default

  const file = config ? config.env.configFile : null;
  return getConfigurationByFile(file);
};
