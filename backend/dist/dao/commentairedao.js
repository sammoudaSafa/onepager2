"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaireDAO = void 0;
const common_1 = require("common");
const dbprovider_1 = require("../dbprovider");
class CommentaireDAO {
    constructor() {
        this.knex = dbprovider_1.DBProvider.getKnexConnection();
    }
    async createCommentaire(commentaire) {
        const { message, date, utilisateurId, name } = commentaire;
        const [commentaireId] = await this.knex('commentaire').insert({
            message, date, utilisateurId, name
        });
        return commentaireId;
    }
    async getCommentaire(commentaireId) {
        const commentaire = await this.knex('commentaire').first('*').where({ commentaireId });
        if (!commentaire) {
            return null;
        }
        return common_1.CommentaireModel.fromJSON(commentaire);
    }
    async getCommentaires() {
        const commentaires = await this.knex('commentaire').select('*');
        return commentaires.map(common_1.CommentaireModel.fromJSON);
    }
    async updateCommentaire(commentaire) {
        const { commentaireId, message, date, hide } = commentaire;
        await this.knex('commentaire').update({ message, date, hide }).where({ commentaireId });
    }
    async deleteCommentaire(commentaireId) {
        await this.knex('commentaire').delete().where({ commentaireId });
    }
}
exports.CommentaireDAO = CommentaireDAO;
//# sourceMappingURL=commentairedao.js.map