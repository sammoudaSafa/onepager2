"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBProvider = void 0;
const knex_1 = __importDefault(require("knex"));
const config_1 = require("./config");
class DBProvider {
    static getKnexConnection() {
        if (this.knex === undefined) {
            this.createKnexConnection();
        }
        return this.knex;
    }
    static createKnexConnection() {
        this.knex = knex_1.default({
            client: 'mysql',
            connection: {
                host: config_1.config.database.url,
                port: config_1.config.database.port,
                user: config_1.config.database.username,
                password: config_1.config.database.password,
                database: config_1.config.database.database,
                typeCast: this.castForDatabase,
                options: { nestTables: true, rowMode: 'array' }
            }
        });
    }
}
exports.DBProvider = DBProvider;
DBProvider.castForDatabase = (field, next) => {
    if (field.type === 'TINY' && field.length === 1) {
        const value = field.string();
        return value ? (value === '1') : null;
    }
    return next();
};
//# sourceMappingURL=dbprovider.js.map