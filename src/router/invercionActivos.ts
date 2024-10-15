import { Router, Request, Response } from "express";
import invercionActivosController from "../controllers/invercionActivos";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  invercionActivosController.obtenerInvercionActivos(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  invercionActivosController.obtenerInvercionActivoPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  invercionActivosController.crearInvercionActivo(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  invercionActivosController.actualizarInvercionActivo(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  invercionActivosController.eliminarInvercionActivo(req, res);
});

export default router;