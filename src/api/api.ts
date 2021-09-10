import fs from "fs";
import Person from "../models/person";
const fileExists = (path: string): Promise<any> =>
    new Promise<boolean>((resolve, reject) => {
        fs.stat(path, (err, data) => {
            if (err) resolve(false);
            else resolve(true);
        });
    });
const writeFile = (path: string, data: string) =>
    new Promise<void>((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
const readFile = (path: string) =>
    new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err: any, data: any) => {
            if (err) reject(err);
            else resolve(data);
        });
    });

type Data = {
    people: Person[]; // Expect people to be an array of strings
};

class DB {
    file: string;
    data: Data;
    constructor(file: string) {
        this.file = file;
        this.data = { people: [] };
    }
    async read() {
        const exists = await fileExists(this.file);
        if (exists) {
            const data = await readFile(this.file);
            this.data = typeof data === "string" ? JSON.parse(data) : data;
        }
    }
    async write() {
        await writeFile(this.file, JSON.stringify(this.data));
    }
}
export default DB;
