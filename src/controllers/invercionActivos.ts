import { Request, Response } from "express";
import invercionActivoModel from "../models/invercionActivos";

class InvercionActivoController {
  async obtenerInvercionActivos(req: Request, res: Response) {
    try {
      const response = await invercionActivoModel.obtenerInversionActivos();

      if (response.length === 0) {
        return res.status(404).json({ message: "No hay invercionActivos" });
      }

      res.status(200).json(response);
    } catch {
      res.status(500).json({ message: "Error al obtener las invercionActivos" });
    }
  }
  async obtenerInvercionActivoPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await invercionActivoModel.obtenerInversionActivoPorId(id);

      if (response.id_inversion === undefined) {
        return res.status(404).json({ message: "InvercionActivo no encontrada" });
      }

      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: "InvercionActivo no encontrada" });
    }
  }
  async crearInvercionActivo(req: Request, res: Response) {
    try {
      const { nombre, costo, cantidad, utilidad, clasificacion_activo, id_emprendimiento } = req.body;

      if (!nombre || !costo || !cantidad || !utilidad || !clasificacion_activo || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await invercionActivoModel.crearInversionActivo({ id_inversion: 0, nombre, costo, cantidad, utilidad, clasificacion_activo, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "Error al crear invercionActivo" });
      }

      res.status(200).json({ message: "InvercionActivo creada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarInvercionActivo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, costo, cantidad, utilidad, clasificacion_activo, id_emprendimiento } = req.body;

      if (!id || !nombre || !costo || !cantidad || !utilidad || !clasificacion_activo || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await invercionActivoModel.actualizarInversionActivo(id, { id_inversion: 0, nombre, costo, cantidad, utilidad, clasificacion_activo, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "Error al actualizar invercionActivo" });
      }

      res.status(200).json({ message: "InvercionActivo actualizada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarInvercionActivo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await invercionActivoModel.eliminarInversionActivo(id);

      if (!response) {
        return res.status(400).json({ message: "Error al eliminar invercionActivo" });
      }

      res.status(200).json({ message: "InvercionActivo eliminada" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new InvercionActivoController();