import { join } from "path";
import Person from "../models/person";
import DB from "./api";

// Use JSON file for storage
const file = join(
    __dirname.substr(0, __dirname.lastIndexOf("build")),
    "db.json"
);
const db = new DB(file);
db.read().then(() => {
    db.data = db.data?.people?.length
        ? { people: db.data.people.filter((p) => p) }
        : { people: [] };
});

const addPerson = (person: Person) => {
    const id = db.data?.people.length
        ? `${Number(db.data?.people[db.data?.people.length - 1].id) + 1}`
        : "1";
    db.data?.people.push({ id, ...person });
    db.write();
    return "Ok";
};
const deletePerson = (id: string) => {
    if (db.data?.people) {
        db.data.people = db.data.people.filter((p) => p.id !== id);
        db.write();
    } else {
        throw Error("Cannot delete a person. DB is empty");
    }
    return "Ok";
};
const updatePerson = (id: string, person: Person) => {
    const indexPerson = db.data?.people.findIndex((p) => p.id === id);
    if (db.data && typeof indexPerson === "number" && indexPerson > -1) {
        db.data.people[indexPerson] = { id, ...person };
        db.write();
    } else {
        const error = db.data
            ? "Person ID not matching any of the existing people"
            : "DB is empty";
        throw Error(error);
    }
    return "Ok";
};
const listPeople = () => {
    return db.data?.people;
};

export default {
    addPerson,
    deletePerson,
    updatePerson,
    listPeople,
};
