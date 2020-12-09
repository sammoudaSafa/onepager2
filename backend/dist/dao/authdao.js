"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDAO = void 0;
const dbprovider_1 = require("../dbprovider");
class AuthDAO {
    constructor() {
        this.knex = dbprovider_1.DBProvider.getKnexConnection();
        this.hydrate = async (utilisateur) => {
            const utilisateurId = utilisateur.utilisateurId;
            const roles = await this.knex('role').pluck('role').where({ utilisateurId });
            utilisateur.roles = roles;
            return utilisateur;
        };
    }
    async getUtilisateur(username) {
        const utilisateur = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ username });
        if (!utilisateur) {
            return utilisateur;
        }
        await this.hydrate(utilisateur);
        return utilisateur;
    }
    async getUtilisateurById(utilisateurId) {
        const utilisateur = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ utilisateurId });
        if (!utilisateur) {
            return utilisateur;
        }
        await this.hydrate(utilisateur);
        return utilisateur;
    }
    async getUtilisateurs() {
        const users = await this.knex('utilisateur').select('utilisateurId', 'username');
        await Promise.all(users.map(this.hydrate));
        return users;
    }
    async createUtilisateur(user) {
        const { username, password } = user;
        try {
            const createUtilisateurId = await this.knex('utilisateur').insert({ username, password });
            return createUtilisateurId;
        }
        catch (e) {
            if (e.code !== 'ER_DUP_ENTRY') {
                console.log('Error trying to create duplicate user.', e);
            }
            return null;
        }
    }
    async createManageUser(user) {
        const { username, password, roles } = user;
        try {
            const utilisateurId = await this.knex('utilisateur').insert({ username, password });
            if (roles.length > 0) {
                await this.knex('role').insert(roles.map(role => { return { utilisateurId, role }; }));
            }
            return utilisateurId;
        }
        catch (e) {
            if (e.code !== 'ER_DUP_ENTRY') {
                console.log('Error trying to create duplicate user.', e);
            }
            return null;
        }
    }
    async updateUtilisateur(utilisateur) {
        const { username, password, utilisateurId, roles } = utilisateur;
        if (password) {
            await this.knex('utilisateur').update({ username, password }).where({ utilisateurId });
        }
        else {
            await this.knex('utilisateur').update({ username }).where({ utilisateurId });
        }
        await this.knex('role').delete().where({ utilisateurId });
        if (roles.length) {
            await this.knex('role').insert(roles.map(role => { return { role, utilisateurId }; }));
        }
    }
}
exports.AuthDAO = AuthDAO;
//# sourceMappingURL=authdao.js.map