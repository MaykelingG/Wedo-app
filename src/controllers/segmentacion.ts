import { Request, Response } from "express";
import segmentacionModel from "../models/segmentacion";

class SegmentacionController {
  async obtenerSegmentaciones(req: Request, res: Response) {
    try {
      const response = await segmentacionModel.obtenerSegmentaciones();

      if (response.length === 0) {
        return res.status(404).json({ message: "No hay segmentaciones" });
      }

      res.status(200).json(response);
    } catch {
      res.status(500).json({ message: "Error al obtener las segmentaciones" });
    }
  }
  async obtenerSegmentacionPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await segmentacionModel.obtenerSegmentacionPorId(id);

      if (response.id_segmentacion === undefined) {
        return res.status(404).json({ message: "Segmentación no encontrada" });
      }

      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: "Segmentación no encontrada" });
    }
  }
  async crearSegmentacion(req: Request, res: Response) {
    try {
      const { texto, id_producto } = req.body;

      if (!texto || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await segmentacionModel.crearSegmentacion({ id_segmentacion: "", texto, id_producto });

      if (!response) {
        return res.status(400).json({ message: "Error al crear segmentación" });
      }

      res.status(200).json({ message: "Segmentación creada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarSegmentacion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { texto, id_producto } = req.body;

      if (!id || !texto || !id_producto) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await segmentacionModel.actualizarSegmentacion(id, { id_segmentacion: id, texto, id_producto });

      if (!response) {
        return res.status(400).json({ message: "La segmentación no existe" });
      }

      res.status(200).json({ message: "Segmentación actualizada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarSegmentacion(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await segmentacionModel.eliminarSegmentacion(id);

      if (!response) {
        return res.status(400).json({ message: "La segmentación no existe" });
      }

      res.status(200).json({ message: "Segmentación eliminada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new SegmentacionController();