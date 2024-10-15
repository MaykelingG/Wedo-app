import { Router, Request, Response } from "express";
import gastosOperacionController from "../controllers/gastosOperacion";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  gastosOperacionController.obtenerGastosOperacion(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  gastosOperacionController.obtenerGastoOperacionPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  gastosOperacionController.crearGastoOperacion(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  gastosOperacionController.actualizarGastoOperacion(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  gastosOperacionController.eliminarGastoOperacion(req, res);
});

export default router;