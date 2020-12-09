"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publiciteRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../../common");
const publicitedao_1 = require("../dao/publicitedao");
const util_1 = require("../util");
const publiciteRouter = express_1.Router();
exports.publiciteRouter = publiciteRouter;
const publiciteDAO = new publicitedao_1.PubliciteDAO;
publiciteRouter.use('/:publiciteId', util_1.wrap(async (req, res, next) => {
    const publicite = await publiciteDAO.getPublicite(req.params.publiciteId);
    if (publicite === null) {
        return res.sendStatus(404);
    }
    req.publicite = publicite;
    return next();
}));
publiciteRouter.get('/', util_1.wrap(async (_req, res) => {
    const publicites = await publiciteDAO.getPublicites();
    return res.send(publicites);
}));
publiciteRouter.get('/:publiciteId', util_1.wrap(async (req, res) => {
    return res.send(req.publicite);
}));
publiciteRouter.post('/', util_1.wrap(async (req, res) => {
    const publicite = common_1.PubliciteModel.fromJSON(req.body);
    const publiciteId = await publiciteDAO.createPublicite(publicite);
    return res.send(await publiciteDAO.getPublicite(publiciteId));
}));
publiciteRouter.put('/:publiciteId', util_1.wrap(async (req, res) => {
    const updated = common_1.PubliciteModel.fromJSON(req.body);
    updated.publiciteId = req.publicite.publiciteId;
    await publiciteDAO.updatePublicite(updated);
    return res.send(await publiciteDAO.getPublicite(req.publicite.publiciteId));
}));
publiciteRouter.delete('/:publiciteId', util_1.wrap(async (req, res) => {
    await publiciteDAO.deletePublicite(req.publicite.publiciteId);
    return res.sendStatus(204);
}));
//# sourceMappingURL=publiciterouter.js.map