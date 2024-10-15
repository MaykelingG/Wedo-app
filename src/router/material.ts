import { Router, Request, Response } from "express";
import materialController from "../controllers/material";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  materialController.obtenerMateriales(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  materialController.obtenerMaterialPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  materialController.crearMaterial(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  materialController.actualizarMaterial(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  materialController.eliminarMaterial(req, res);
});

export default router;