import { MessageModel } from 'common';
export declare class MessageDAO {
    private knex;
    getMessages(): Promise<MessageModel[]>;
    getMessage(messageId: number | string): Promise<MessageModel | null>;
    updateMessage(message: MessageModel): Promise<void>;
}
