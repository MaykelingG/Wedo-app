import usuariosControllers from "@/controllers/usuarios";
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    usuariosControllers.crearUsuario(req, res);
});

export default router;