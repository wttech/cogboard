/// <reference types="cypress" />
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(`${file}.env.json`);

  return fs.readJson(pathToConfigFile);
}

// plugins file
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // accept a configFile value or use development by default
  const file = config.env.configFile || 'local';

  return getConfigurationByFile(file);
};
