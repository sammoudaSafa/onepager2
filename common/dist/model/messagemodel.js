"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
class MessageModel {
    static fromJSON(jsonMessageModel) {
        const messageModel = new MessageModel;
        Object.assign(messageModel, jsonMessageModel);
        return messageModel;
    }
}
exports.MessageModel = MessageModel;
//# sourceMappingURL=messagemodel.js.map