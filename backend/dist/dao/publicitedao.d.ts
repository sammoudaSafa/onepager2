import { PubliciteModel } from '../../../common';
export declare class PubliciteDAO {
    private knex;
    createPublicite(publicite: PubliciteModel): Promise<any>;
    getPublicite(publiciteId: number | string): Promise<PubliciteModel | null>;
    updatePublicite(publicite: PubliciteModel): Promise<void>;
    deletePublicite(publiciteId: number): Promise<void>;
    getPublicites(): Promise<PubliciteModel[]>;
}
