"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDAO = void 0;
const common_1 = require("common");
const dbprovider_1 = require("../dbprovider");
class MessageDAO {
    constructor() {
        this.knex = dbprovider_1.DBProvider.getKnexConnection();
    }
    async getMessages() {
        const messages = await this.knex('message_accueil').select('*');
        return messages.map(common_1.MessageModel.fromJSON);
    }
    async getMessage(messageId) {
        const message = await this.knex('message_accueil').first('*').where({ messageId });
        if (!message) {
            return null;
        }
        return common_1.MessageModel.fromJSON(message);
    }
    async updateMessage(message) {
        const { messageId, presentation } = message;
        await this.knex('message_accueil').update({ presentation }).where({ messageId });
    }
}
exports.MessageDAO = MessageDAO;
//# sourceMappingURL=messagedao.js.map