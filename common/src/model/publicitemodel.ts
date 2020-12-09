
export class PubliciteModel {
    public publiciteId: number;
    public nom_client: string;
    public status: number;
    public message: string;
    public lien: string;
    public clientId: number;
    public image: string;
    public roles: string;

    public static fromJSON(jsonPubliciteModel: PubliciteModel) {
        const publiciteModel = new PubliciteModel;
        Object.assign(publiciteModel, jsonPubliciteModel);
        return publiciteModel;
    }
}
