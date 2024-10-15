import { Router, Request, Response } from "express";
import prestamosController from "@/controllers/prestamos";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    prestamosController.obtenerPrestamos(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    prestamosController.obtenerPrestamoPorId(req, res);
});

router.post('/', (req: Request, res: Response) => {
    prestamosController.crearPrestamo(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
    prestamosController.actualizarPrestamo(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    prestamosController.eliminarPrestamo(req, res);
});

export default router;
