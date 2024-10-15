import { Request, Response } from "express";
import potencialModel from "../models/potencial";

class PotencialController {
  async obtenerPotenciales(req: Request, res: Response) {
    try {
      const response = await potencialModel.obtenerPotenciales();

      if (response.length === 0) {
        return res.status(404).json({ message: "No hay potenciales" });
      }

      res.status(200).json(response);
    } catch {
      res.status(500).json({ message: "Error al obtener los potenciales" });
    }
  }
  async obtenerPotencialPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await potencialModel.obtenerPotencialPorId(id);

      if (response.id_potencial === undefined) {
        return res.status(404).json({ message: "Potencial no encontrado" });
      }

      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: "Potencial no encontrado" });
    }
  }
  async crearPotencial(req: Request, res: Response) {
    try {
      const { texto, id_producto } = req.body;

      if (!texto || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await potencialModel.crearPotencial({ id_potencial: 0, texto, id_producto });

      if (!response) {
        return res.status(400).json({ message: "Error al crear potencial" });
      }

      res.status(200).json({ message: "Potencial creado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarPotencial(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { texto, id_producto } = req.body;

      if (!id || !texto || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await potencialModel.actualizarPotencial(id, { id_potencial: 0, texto, id_producto });

      if (!response) {
        return res.status(400).json({ message: "Error al actualizar potencial" });
      }

      res.status(200).json({ message: "Potencial actualizado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarPotencial(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await potencialModel.eliminarPotencial(id);

      if (!response) {
        return res.status(400).json({ message: "Error al eliminar potencial" });
      }

      res.status(200).json({ message: "Potencial eliminado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new PotencialController();