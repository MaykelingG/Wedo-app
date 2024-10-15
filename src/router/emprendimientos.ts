import { Router } from "express";
import emprendimientoController from "@/controllers/emprendimientos";

const router = Router();

router.get('/', (req, res) => {
    emprendimientoController.obtenerEmprendimientos(req, res);
});

router.get('/:id', (req, res) => {
    emprendimientoController.obtenerEmprendimientoPorId(req, res);
});

router.post('/', (req, res) => {
    emprendimientoController.crearEmprendimiento(req, res);
});

router.put('/:id', (req, res) => {
    emprendimientoController.actualizarEmprendimiento(req, res);
});

router.delete('/:id', (req, res) => {
    emprendimientoController.eliminarEmprendimiento(req, res);
});

export default router;