import { Request, Response } from "express";
import gastosOperacionModel from "../models/gastosOperacion";

class GastosOperacionController {
  async obtenerGastosOperacion(req: Request, res: Response) {
    try {
      const response = await gastosOperacionModel.obtenerGastosOperacion();

      if (response.length === 0) {
        return res.status(404).json({ message: "No hay gastos de operación" });
      }

      res.status(200).json(response);
    } catch {
      res.status(500).json({ message: "Error al obtener los gastos de operación" });
    }
  }
  async obtenerGastoOperacionPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await gastosOperacionModel.obtenerGastoOperacionPorId(id);

      if (response.id_gastos === undefined) {
        return res.status(404).json({ message: "Gasto de operación no encontrado" });
      }

      res.status(200).json(response);
    } catch {
      res.status(404).json({ message: "Gasto de operación no encontrado" });
    }
  }
  async crearGastoOperacion(req: Request, res: Response) {
    try {
      const { nombre, costo, cantidad, id_emprendimiento } = req.body;

      if (!nombre || !costo || !cantidad || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await gastosOperacionModel.crearGastoOperacion({ id_gastos: 0, nombre, costo, cantidad, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "Error al crear gasto de operación" });
      }

      res.status(200).json({ message: "Gasto de operación creado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarGastoOperacion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, costo, cantidad, id_emprendimiento } = req.body;

      if (!id || !nombre || !costo || !cantidad || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await gastosOperacionModel.actualizarGastoOperacion(id, { id_gastos: 0, nombre, costo, cantidad, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "Error al actualizar gasto de operación" });
      }

      res.status(200).json({ message: "Gasto de operación actualizado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarGastoOperacion(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await gastosOperacionModel.eliminarGastoOperacion(id);

      if (!response) {
        return res.status(400).json({ message: "Error al eliminar gasto de operación" });
      }

      res.status(200).json({ message: "Gasto de operación eliminado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new GastosOperacionController();