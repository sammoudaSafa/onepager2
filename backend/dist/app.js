"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const common_1 = require("common");
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_1 = __importDefault(require("express"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const config_1 = require("./config");
const authdao_1 = require("./dao/authdao");
const authRouter_1 = require("./router/authRouter");
const publiciterouter_1 = require("./router/publiciterouter");
const authDAO = new authdao_1.AuthDAO;
const sessionStore = new (express_mysql_session_1.default(express_session_1.default))({
    host: config_1.config.database.url,
    user: config_1.config.database.username,
    password: config_1.config.database.password,
    database: config_1.config.database.database
});
const app = express_1.default();
exports.app = app;
app.set('trust proxy', 'loopback');
app.use(express_session_1.default({
    name: 'archetype_session',
    secret: '9b74c9897bac770ffc029102a200c5de',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(errorhandler_1.default({ log: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
passport_1.default.serializeUser((utilisateur, done) => {
    done(null, utilisateur.utilisateurId);
});
passport_1.default.deserializeUser(async (utilisateurId, done) => {
    const utilisateur = await authDAO.getUtilisateurById(utilisateurId);
    delete utilisateur.password;
    done(null, utilisateur ? common_1.UtilisateurModel.fromJSON(utilisateur) : undefined);
});
passport_1.default.use(new passport_local_1.Strategy(authRouter_1.loginHandler));
app.use('/publicites', publiciterouter_1.publiciteRouter);
app.use('/auth', authRouter_1.authRouter);
//# sourceMappingURL=app.js.map