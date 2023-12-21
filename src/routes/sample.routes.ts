import { Router } from "express";
import { sampleController } from "../controllers/sample.controller";

const router = Router();

router.get("/all", sampleController.getAll);
router.get("/id/:id", sampleController.getById);
router.post("/", sampleController.create);
router.put("/", sampleController.update);
router.delete("/", sampleController.remove);

export default router;
