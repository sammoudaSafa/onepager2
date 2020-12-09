import { CommentaireModel } from 'common';
export declare class CommentaireDAO {
    private knex;
    createCommentaire(commentaire: CommentaireModel): Promise<any>;
    getCommentaire(commentaireId: number | string): Promise<CommentaireModel | null>;
    getCommentaires(): Promise<CommentaireModel[]>;
    updateCommentaire(commentaire: CommentaireModel): Promise<void>;
    deleteCommentaire(commentaireId: number): Promise<void>;
}
