import { PubliciteModel } from '../../../common';
import { DBProvider } from '../dbprovider';

export class PubliciteDAO {
    private knex = DBProvider.getKnexConnection();

    public async createPublicite(publicite: PubliciteModel) {
        const { nom_client, status, message, lien, image, clientId, roles } = publicite;
        const [publiciteId] = await this.knex('publicites').insert({ nom_client, status, message, lien, image, clientId, roles });
        return publiciteId;
    }

    public async getPublicite(publiciteId: number | string) {
        const publicite = await this.knex('publicites').first('*').where({ publiciteId });
        if (!publicite) { return null; }
        return PubliciteModel.fromJSON(publicite);
    }

    public async updatePublicite(publicite: PubliciteModel) {
        const { publiciteId, nom_client, status, message, lien, image, clientId } = publicite;
        await this.knex('publicites').update({ nom_client, status, message, lien, image, clientId }).where({ publiciteId });
    }

    public async deletePublicite(publiciteId: number) {
        await this.knex('publicites').delete().where({ publiciteId });
    }

    public async getPublicites() {
        const publicites = await this.knex('publicites').select('*');
        return publicites.map(PubliciteModel.fromJSON);
    }
}
