import usuariosControllers from "@/controllers/usuarios";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    usuariosControllers.obtenerUsuarios(req, res);
});

router.get("/:id", (req, res) => {
    usuariosControllers.obtenerUsuarioPorId(req, res);
});

router.post("/", (req, res) => {
    usuariosControllers.crearUsuario(req, res);
});

router.put("/:id", (req, res) => {
    usuariosControllers.actualizarUsuario(req, res);
});

router.delete("/:id", (req, res) => {
    usuariosControllers.eliminarUsuario(req, res);
});


export default router;