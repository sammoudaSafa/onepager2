"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
class ClientModel {
    static fromJSON(jsonClientModel) {
        const clientModel = new ClientModel;
        Object.assign(clientModel, jsonClientModel);
        return clientModel;
    }
}
exports.ClientModel = ClientModel;
//# sourceMappingURL=clientmodel.js.map