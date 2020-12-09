import { PubliciteModel, UtilisateurModel } from "common";

declare global {
    module Express {
        interface Request {
            utilisateur: UtilisateurModel;
            publicite: PubliciteModel;
        }
        interface User extends UtilisateurModel { }
    }
}
