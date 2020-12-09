"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = exports.authRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("common");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authdao_1 = require("../dao/authdao");
const util_1 = require("../util");
const authRouter = express_1.Router();
exports.authRouter = authRouter;
const authDAO = new authdao_1.AuthDAO;
authRouter.post('/login', passport_1.default.authenticate('local', { session: true }), (req, res) => {
    if (req.user) {
        res.send(req.user);
    }
    else {
        res.sendStatus(401);
    }
});
authRouter.post('/logout', util_1.wrap(async (req, res) => {
    if (!req.session) {
        return res.send();
    }
    req.session.destroy(err => {
        if (err !== undefined) {
            console.error(`Error destroying session, ${err}`);
        }
    });
    return res.send();
}));
authRouter.get('/manage', util_1.hasPermission(common_1.Permission.manageUsers), util_1.wrap(async (req, res) => {
    if (!req.user) {
        return res.sendStatus(403);
    }
    const users = await authDAO.getUtilisateurs();
    return res.send(users);
}));
authRouter.get('/manage/current', util_1.hasPermission(common_1.Permission.manageUsers), util_1.wrap(async (req, res) => {
    if (!req.user) {
        return res.sendStatus(404);
    }
    return res.send(req.user);
}));
authRouter.post('/manage', util_1.hasPermission(common_1.Permission.manageUsers), util_1.wrap(async (req, res) => {
    const user = req.body;
    user.password = await bcrypt_1.default.hash(user.password, 12);
    const createdUserId = await authDAO.createManageUser(user);
    if (createdUserId === null) {
        return res.sendStatus(400);
    }
    const createdUser = (await authDAO.getUtilisateurById(createdUserId));
    delete createdUser.password;
    return res.send(createdUser);
}));
authRouter.put('/manage/:utilisateurId', util_1.hasPermission(common_1.Permission.manageUsers), util_1.wrap(async (req, res) => {
    const user = req.body;
    user.utilisateurId = parseInt(req.params.utilisateurId);
    if (user.password) {
        user.password = await bcrypt_1.default.hash(user.password, 12);
    }
    await authDAO.updateUtilisateur(user);
    const updateUser = (await authDAO.getUtilisateurById(user.utilisateurId));
    delete updateUser.password;
    return res.send(updateUser);
}));
const loginHandler = async (username, password, done) => {
    const utilisateur = await authDAO.getUtilisateur(username);
    if (utilisateur === undefined) {
        return done(null, false);
    }
    if (await bcrypt_1.default.compare(password, utilisateur.password)) {
        delete utilisateur.password;
        return done(null, utilisateur);
    }
    return done(null, false);
};
exports.loginHandler = loginHandler;
//# sourceMappingURL=authRouter.js.map