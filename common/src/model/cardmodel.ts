export class CardModel {
    public cardId: number;
    public title: string;
    public excerpt: string;
    public date: Date;
    public link: string;
    public featured_image_src: string;

    public static fromJSON(jsonCardModel: CardModel) {
        const cardModel = new CardModel;
        Object.assign(cardModel, jsonCardModel);
        cardModel.date = new Date(cardModel.date);
        return cardModel;
    }
}
