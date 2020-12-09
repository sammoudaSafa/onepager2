"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaireModel = void 0;
class CommentaireModel {
    static fromJSON(jsonCommentaireModel) {
        const commentaireModel = new CommentaireModel;
        Object.assign(commentaireModel, jsonCommentaireModel);
        commentaireModel.date = new Date(commentaireModel.date);
        return commentaireModel;
    }
}
exports.CommentaireModel = CommentaireModel;
//# sourceMappingURL=commentairemodel.js.map