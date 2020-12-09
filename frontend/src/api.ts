import axios from 'axios';
import { API_URL } from 'config.json';

export class Api {
    public axios: any;
    private header = API_URL;

    constructor(header?: string) {
        if (header) {
            this.header = API_URL + header;
        }
    }

    public async put(url: string, id: string | number, body: any) {
        const queryLocation = url.indexOf('?');
        const result = await fetch(queryLocation !== -1
            ? `${this.header}${url.substr(0, queryLocation)}/${id}${url.substr(queryLocation)}`
            : `${this.header}${url}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        await this.validateResult(result);
        return result;
    }

    public async post(url: string, body?: any) {
        const result = await fetch(this.header + url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include'
        });
        await this.validateResult(result);
        return result;
    }

    public async getAxios(url: string) {
        const result=axios.get(this.header + url, {
            headers: {
                'Content-Type': 'application/json',
                 Accept: 'application/json'
            }
        })
        return result;
    }

    public async putGetJson(url: string, id: string | number, body?: any) {
        const result = await this.put(url, id, body);
        await this.validateResult(result);
        return result.json();
    }

    public async postGetJson(url: string, body?: any) {
        const result = await this.post(url, body);
        await this.validateResult(result);
        return result.json();
    }

    public async delete(url: string, id: string | number) {
        const result = await fetch(`${this.header}${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        });
        await this.validateResult(result);
        return result;
    }

    protected notify(statusCode: number, message: string) {
        console.error(`${statusCode}: ${message}`);
    }

    private async validateResult(result: Response) {
        if (!result.ok) {
            this.notify(result.status, await result.text());
            throw new Error;
        }
    }
}
