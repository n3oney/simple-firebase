export class Database {
    public get(key: string): Promise<any>;
    public increment(key: string, number: number): Promise<number>;
    public set(key: string, value: any): Promise<any>;
}

export function init(path: string): Promise<Database>;