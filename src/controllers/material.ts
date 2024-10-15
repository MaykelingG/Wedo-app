import { Request, Response } from "express";
import materialModel from "../models/material";

class MaterialController {
  async obtenerMateriales(req: Request, res: Response) {
    try {
      const response = await materialModel.obtenerMateriales();

      if (response.length === 0) {
        return res.status(404).json({ message: "No hay materiales" });
      }

      res.status(200).json(response);
    } catch {
      res.status(500).json({ message: "Error al obtener los materiales" });
    }
  }
  async obtenerMaterialPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await materialModel.obtenerMaterialPorId(id);

      if (response.id_material === undefined) {
        return res.status(404).json({ message: "Material no encontrado" });
      }

      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: "Material no encontrado" });
    }
  }
  async crearMaterial(req: Request, res: Response) {
    try {
      const { nombre, medida, cantidad, coste, id_producto } = req.body;

      if (!nombre || !medida || !cantidad || !coste || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await materialModel.crearMaterial({ id_material: 0, nombre, medida, cantidad, coste, id_producto });

      if (!response) {
        return res.status(400).json({ message: "Error al crear material" });
      }

      res.status(200).json({ message: "Material creado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarMaterial(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, medida, cantidad, coste, id_producto } = req.body;

      if (!id || !nombre || !medida || !cantidad || !coste || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await materialModel.actualizarMaterial(id, { id_material: 0, nombre, medida, cantidad, coste, id_producto });

      if (!response) {
        return res.status(400).json({ message: "Error al actualizar material" });
      }

      res.status(200).json({ message: "Material actualizado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarMaterial(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await materialModel.eliminarMaterial(id);

      if (!response) {
        return res.status(400).json({ message: "Error al eliminar material" });
      }

      res.status(200).json({ message: "Material eliminado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new MaterialController();