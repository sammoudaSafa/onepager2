import { UtilisateurModel } from 'common';
export declare class AuthDAO {
    private knex;
    getUtilisateur(username: string): Promise<UtilisateurModel | undefined>;
    getUtilisateurById(utilisateurId: number): Promise<UtilisateurModel | undefined>;
    getUtilisateurs(): Promise<UtilisateurModel[]>;
    createUtilisateur(user: UtilisateurModel): Promise<number | null>;
    createManageUser(user: UtilisateurModel): Promise<number | null>;
    updateUtilisateur(utilisateur: UtilisateurModel): Promise<void>;
    private hydrate;
}
