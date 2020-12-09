"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubliciteDAO = void 0;
const common_1 = require("../../../common");
const dbprovider_1 = require("../dbprovider");
class PubliciteDAO {
    constructor() {
        this.knex = dbprovider_1.DBProvider.getKnexConnection();
    }
    async createPublicite(publicite) {
        const { nom_client, status, message, lien, image, clientId, roles } = publicite;
        const [publiciteId] = await this.knex('publicites').insert({ nom_client, status, message, lien, image, clientId, roles });
        return publiciteId;
    }
    async getPublicite(publiciteId) {
        const publicite = await this.knex('publicites').first('*').where({ publiciteId });
        if (!publicite) {
            return null;
        }
        return common_1.PubliciteModel.fromJSON(publicite);
    }
    async updatePublicite(publicite) {
        const { publiciteId, nom_client, status, message, lien, image, clientId } = publicite;
        await this.knex('publicites').update({ nom_client, status, message, lien, image, clientId }).where({ publiciteId });
    }
    async deletePublicite(publiciteId) {
        await this.knex('publicites').delete().where({ publiciteId });
    }
    async getPublicites() {
        const publicites = await this.knex('publicites').select('*');
        return publicites.map(common_1.PubliciteModel.fromJSON);
    }
}
exports.PubliciteDAO = PubliciteDAO;
//# sourceMappingURL=publicitedao.js.map