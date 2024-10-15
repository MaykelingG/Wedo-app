import { Request, Response } from "express";
import prestamoModel from "@/models/prestamos";

class PrestamosController {
  async obtenerPrestamos(req: Request, res: Response){
    try {
      const response = await prestamoModel.obtenerPrestamos();

      if(response.length === 0){
        return res.status(404).json({ message: 'No hay prestamos' });
      }

      res.status(200).json(response);
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async obtenerPrestamoPorId(req: Request, res: Response){
    try {
      const { id } = req.params;

      if(!id){
        return res.status(400).json({ message: 'Falta el id' });
      }

      const response = await prestamoModel.obtenerPrestamoPorId(id);

      if(response.id_prestamo === undefined){
        return res.status(404).json({ message: 'Prestamo no encontrado' });
      }

      res.status(200).json(response);
    } catch {
      res.status(400).json({ message: 'Prestamo no encontrado' });
    }
  }
  async crearPrestamo(req: Request, res: Response){
    try {
      const { valor, interes, plazo, frecuencia, id_emprendimiento } = req.body;

      if(!valor || !interes || !plazo || !frecuencia || !id_emprendimiento){
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const response = await prestamoModel.crearPrestamo({ id_prestamo: 0, valor, interes, plazo, frecuencia, id_emprendimiento });

      if(!response){
        return res.status(400).json({ message: 'Error al crear prestamo' });
      }

      res.status(200).json({ message: 'Prestamo creado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async actualizarPrestamo(req: Request, res: Response){
    try {
      const { id } = req.params;
      const { valor, interes, plazo, frecuencia, id_emprendimiento } = req.body;

      if(!id || !valor || !interes || !plazo || !frecuencia || !id_emprendimiento){
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const response = await prestamoModel.actualizarPrestamo(id, { id_prestamo: 0, valor, interes, plazo, frecuencia, id_emprendimiento });

      if(!response){
        return res.status(400).json({ message: 'Error al actualizar prestamo' });
      }

      res.status(200).json({ message: 'Prestamo actualizado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async eliminarPrestamo(req: Request, res: Response){
    try {
      const { id } = req.params;

      if(!id){
        return res.status(400).json({ message: 'Falta el id' });
      }

      const response = await prestamoModel.eliminarPrestamo(id);

      if(!response){
        return res.status(400).json({ message: 'Error al eliminar prestamo' });
      }

      res.status(200).json({ message: 'Prestamo eliminado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
}

export default new PrestamosController();