"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentaireRouter = void 0;
const common_1 = require("common");
const express_1 = require("express");
const commentairedao_1 = require("../dao/commentairedao");
const util_1 = require("../util");
const authRouter_1 = require("./authRouter");
const commentaireRouter = express_1.Router();
exports.commentaireRouter = commentaireRouter;
const commentaireDAO = new commentairedao_1.CommentaireDAO;
commentaireRouter.use('/:commentaireId', util_1.wrap(async (req, res, next) => {
    const commentaire = await commentaireDAO.getCommentaire(req.params.commentaireId);
    if (commentaire === null) {
        return res.sendStatus(404);
    }
    req.commentaire = commentaire;
    return next();
}));
commentaireRouter.get('/', util_1.wrap(async (_req, res) => {
    const commentaires = await commentaireDAO.getCommentaires();
    return res.send(commentaires);
}));
commentaireRouter.get('/:commentaireId', util_1.wrap(async (req, res) => {
    return res.send(req.commentaire);
}));
commentaireRouter.post('/', util_1.wrap(async (req, res) => {
    const commentaire = common_1.CommentaireModel.fromJSON(req.body);
    const commentaireId = await commentaireDAO.createCommentaire(commentaire);
    return res.send(await commentaireDAO.getCommentaire(commentaireId));
}));
commentaireRouter.put('/:commentaireId', util_1.hasPermission(common_1.Permission.managePublicite), util_1.wrap(async (req, res) => {
    const updated = common_1.CommentaireModel.fromJSON(req.body);
    updated.commentaireId = req.commentaire.commentaireId;
    await commentaireDAO.updateCommentaire(updated);
    return res.send(await commentaireDAO.getCommentaire(req.commentaire.commentaireId));
}));
commentaireRouter.delete('/:commentaireId', util_1.hasPermission(common_1.Permission.managePublicite), util_1.wrap(async (req, res) => {
    await commentaireDAO.deleteCommentaire(req.commentaire.commentaireId);
    return res.sendStatus(204);
}));
commentaireRouter.use('/:commentaireId/utilisateur', authRouter_1.authRouter);
//# sourceMappingURL=commentairerouter.js.map