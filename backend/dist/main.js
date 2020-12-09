"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const app_1 = require("./app");
const config_1 = require("./config");
start().catch(error => console.error(error));
async function start() {
    app_1.app.listen(config_1.config.listeningPort, config_1.config.listeningDomain, () => {
        console.log('Listening on port ' + config_1.config.listeningPort + '.');
        console.log('App is started.');
    });
}
//# sourceMappingURL=main.js.map