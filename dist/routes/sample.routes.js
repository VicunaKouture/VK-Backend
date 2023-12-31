"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_controller_1 = require("../controllers/sample.controller");
const router = (0, express_1.Router)();
router.get("/all", sample_controller_1.sampleController.getAll);
router.get("/id/:id", sample_controller_1.sampleController.getById);
router.post("/", sample_controller_1.sampleController.create);
router.put("/", sample_controller_1.sampleController.update);
router.delete("/", sample_controller_1.sampleController.remove);
exports.default = router;
