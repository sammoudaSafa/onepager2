import { Router } from 'express';
import { PubliciteModel } from '../../../common';
import { PubliciteDAO } from '../dao/publicitedao';
import { wrap } from '../util';

const publiciteRouter = Router();
const publiciteDAO = new PubliciteDAO;

publiciteRouter.use('/:publiciteId', wrap(async (req, res, next) => {
    const publicite = await publiciteDAO.getPublicite(req.params.publiciteId);
    if (publicite === null) { return res.sendStatus(404); }
    req.publicite = publicite;
    return next();
}));

publiciteRouter.get('/', wrap(async (_req, res) => {
    const publicites = await publiciteDAO.getPublicites();
    return res.send(publicites);
}));

publiciteRouter.get('/:publiciteId', wrap(async (req, res) => {
    return res.send(req.publicite);
}));

publiciteRouter.post('/', wrap(async (req, res) => {
    const publicite = PubliciteModel.fromJSON(req.body);
    const publiciteId = await publiciteDAO.createPublicite(publicite);
    return res.send(await publiciteDAO.getPublicite(publiciteId));
}));

publiciteRouter.put('/:publiciteId', wrap(async (req, res) => {
    const updated = PubliciteModel.fromJSON(req.body);
    updated.publiciteId = req.publicite.publiciteId;
    await publiciteDAO.updatePublicite(updated);
    return res.send(await publiciteDAO.getPublicite(req.publicite.publiciteId));
}));

publiciteRouter.delete('/:publiciteId', wrap(async (req, res) => {
    await publiciteDAO.deletePublicite(req.publicite.publiciteId);
    return res.sendStatus(204);
}));

export { publiciteRouter };
