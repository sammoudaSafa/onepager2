import Knex from 'knex';
export declare class DBProvider {
    private static knex;
    static getKnexConnection(): Knex<any, unknown[]>;
    private static createKnexConnection;
    private static castForDatabase;
}
