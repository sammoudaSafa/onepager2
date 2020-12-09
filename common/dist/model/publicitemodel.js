"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubliciteModel = void 0;
class PubliciteModel {
    static fromJSON(jsonPubliciteModel) {
        const publiciteModel = new PubliciteModel;
        Object.assign(publiciteModel, jsonPubliciteModel);
        return publiciteModel;
    }
}
exports.PubliciteModel = PubliciteModel;
//# sourceMappingURL=publicitemodel.js.map