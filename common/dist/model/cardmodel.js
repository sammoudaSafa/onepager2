"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModel = void 0;
class CardModel {
    static fromJSON(jsonCardModel) {
        const cardModel = new CardModel;
        Object.assign(cardModel, jsonCardModel);
        cardModel.date = new Date(cardModel.date);
        return cardModel;
    }
}
exports.CardModel = CardModel;
//# sourceMappingURL=cardmodel.js.map