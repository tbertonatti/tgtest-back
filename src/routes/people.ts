import { Router } from "express";
import peopleController from "../controllers/people";

const router = Router();

router.get("/all", (req, res) => {
    const response = peopleController.listPeople();
    res.status(response.code).send(response);
});
router.get("/delete/:id", (req, res) => {
    const response = peopleController.deletePerson(req.params.id);
    res.status(response.code).send(response);
});
router.post("/add", (req, res) => {
    const response = peopleController.addPerson(req.body);
    res.status(response.code).send(response);
});
router.post("/update/:id", (req, res) => {
    const response = peopleController.updatePerson(req.params.id, req.body);
    res.status(response.code).send(response);
});
export default router;
