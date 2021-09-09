import PeopleApi from "../api/people";
import Person from "../models/person";
import rest from '../helpers/rest';

const addPerson = (person: Person) => {
    return rest.success(PeopleApi.addPerson(person));
};
const deletePerson = (id: string) => {
    let response;
    try {
        response = rest.success(PeopleApi.deletePerson(id));
    } catch (error) {
        response = rest.error(String(error));
    }
    return response;
};
const updatePerson = (id: string, person: Person) => {
    let response;
    try {
        response = rest.success(PeopleApi.updatePerson(id, person));
    } catch (error) {
        response = rest.error(String(error));
    }
    return response;
};
const listPeople = () => {
    return rest.success(PeopleApi.listPeople());
};

export default {
    addPerson,
    deletePerson,
    updatePerson,
    listPeople
};
