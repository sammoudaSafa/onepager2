"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const common_1 = require("common");
const express_1 = require("express");
const messagedao_1 = require("../dao/messagedao");
const util_1 = require("../util");
const messageRouter = express_1.Router();
exports.messageRouter = messageRouter;
const messageDAO = new messagedao_1.MessageDAO;
messageRouter.use('/:messageId', util_1.wrap(async (req, res, next) => {
    const message = await messageDAO.getMessage(req.params.messageId);
    if (message === null) {
        return res.sendStatus(404);
    }
    req.message = message;
    return next();
}));
messageRouter.get('/', util_1.wrap(async (_req, res) => {
    const messages = await messageDAO.getMessages();
    return res.send(messages);
}));
messageRouter.get('/:messageId', util_1.wrap(async (req, res) => {
    const message = await messageDAO.getMessage(req.message.messageId);
    return res.send(message);
}));
messageRouter.put('/:messageId', util_1.hasPermission(common_1.Permission.modifierMessage), util_1.wrap(async (req, res) => {
    if (!req.user?.hasPermission(common_1.Permission.modifierMessage)) {
        return res.sendStatus(403);
    }
    const updated = common_1.MessageModel.fromJSON(req.body);
    updated.messageId = req.message.messageId;
    await messageDAO.updateMessage(updated);
    return res.send(await messageDAO.getMessage(req.message.messageId));
}));
//# sourceMappingURL=messagerouter.js.map