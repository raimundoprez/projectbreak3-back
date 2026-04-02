const basicInfo = require("./basicInfo.js");
const chore = require("./chore.js");
const components = require("./components.js");

module.exports = {
    ...basicInfo,
    ...chore,
    ...components
};