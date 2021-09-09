import { join } from "path";
import { Low, JSONFile } from "lowdb";
import Person from "../models/person";

// Use JSON file for storage
const file = join(
    __dirname.substr(0, __dirname.lastIndexOf("build")),
    "db.json"
);
type Data = {
    people: Person[]; // Expect people to be an array of strings
};
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);
db.read().then(() => {
    db.data = db.data?.people?.length
        ? { people: db.data.people.filter((p) => p) }
        : { people: [] };
});

const addPerson = (person: Person) => {
    db.data?.people.push({ id: String(db.data?.people.length + 1), ...person });
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
