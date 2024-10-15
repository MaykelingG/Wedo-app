import { Router, Request, Response } from "express";
import potencialController from "../controllers/potencial";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  potencialController.obtenerPotenciales(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  potencialController.obtenerPotencialPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  potencialController.crearPotencial(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  potencialController.actualizarPotencial(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  potencialController.eliminarPotencial(req, res);
});

export default router;