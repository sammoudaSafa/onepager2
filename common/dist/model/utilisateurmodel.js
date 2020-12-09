"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurModel = void 0;
const enum_1 = require("../enum");
class UtilisateurModel {
    constructor() {
        this.roles = [];
    }
    static fromJSON(jsonUtilisateurModel) {
        const utilisateurModel = new UtilisateurModel;
        Object.assign(utilisateurModel, jsonUtilisateurModel);
        return utilisateurModel;
    }
    hasPermission(permission) {
        return this.roles.some(role => {
            return enum_1.rolePermissions[role].includes(permission);
        });
    }
}
exports.UtilisateurModel = UtilisateurModel;
//# sourceMappingURL=utilisateurmodel.js.map