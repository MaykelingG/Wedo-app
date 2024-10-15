import { Router, Request, Response } from "express";
import productoController from "@/controllers/productos";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  productoController.obtenerProductos(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  productoController.obtenerProductoPorId(req, res);
});

router.post("/", (req: Request, res: Response) => {
  productoController.crearProducto(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  productoController.actualizarProducto(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  productoController.eliminarProducto(req, res);
});

export default router;