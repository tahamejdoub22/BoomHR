import express from "express";
import { createCoordinates, getCoordinatesById } from "../controllers/coordinatesController.js";

const router = express.Router();

router.post('/', createCoordinates);
router.get('/:coordinatesId', getCoordinatesById);

export default router;
