import { Permission } from '../enum';
import { Role } from '../enum/role';
export declare class UtilisateurModel {
    utilisateurId: number;
    username: string;
    password?: string;
    roles: Role[];
    constructor();
    static fromJSON(jsonUtilisateurModel: UtilisateurModel): UtilisateurModel;
    hasPermission(permission: Permission): boolean;
}
//# sourceMappingURL=utilisateurmodel.d.ts.map