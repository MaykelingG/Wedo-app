import { Router, Request, Response } from "express";
import segmentacionController from "../controllers/segmentacion";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  segmentacionController.obtenerSegmentaciones(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  segmentacionController.obtenerSegmentacionPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  segmentacionController.crearSegmentacion(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  segmentacionController.actualizarSegmentacion(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  segmentacionController.eliminarSegmentacion(req, res);
});

export default router;
