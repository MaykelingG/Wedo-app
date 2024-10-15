import { Request, Response } from "express";
import emprendimientoModel from "@/models/emprendimientos";

class EmprendimientosControllers{
  async obtenerEmprendimientos(req: Request, res: Response){
    try {
      const response = await emprendimientoModel.obtenerEmprendimientos();

      if(response.length === 0){
        return res.status(404).json({ message: 'No hay emprendimientos' });
      }

      res.status(200).json(response);
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async obtenerEmprendimientoPorId(req: Request, res: Response){
    try {
      const { id } = req.params;

      if(!id){
        return res.status(400).json({ message: 'Falta el id' });
      }

      const response = await emprendimientoModel.obtenerEmprendimientoPorId(id);

      if(response.id_emprendimiento === undefined){
        return res.status(404).json({ message: 'Emprendimiento no encontrado' });
      }

      res.status(200).json(response);
    } catch {
      res.status(400).json({ message: 'Emprendimiento no encontrado' });
    }
  }
  async crearEmprendimiento(req: Request, res: Response){
    try {
      const { nombre, descripcion, financiamiento, id_usuario } = req.body;

      if(!nombre || !descripcion || !financiamiento || !id_usuario){
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const response = await emprendimientoModel.crearEmprendimiento({ id_emprendimiento: 0, nombre, descripcion, financiamiento, id_usuario });

      if(!response){
        return res.status(400).json({ message: 'Error al crear emprendimiento' });
      }

      res.status(200).json({ message: 'Emprendimiento creado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async actualizarEmprendimiento(req: Request, res: Response){
    try {
      const { id } = req.params;
      const { nombre, descripcion, financiamiento, id_usuario } = req.body;

      if(!id || !nombre || !descripcion || !financiamiento || !id_usuario){
        return res.status(400).json({ message: 'Faltan datos' });
      }

      const response = await emprendimientoModel.actualizarEmprendimiento(id, { id_emprendimiento: 0, nombre, descripcion, financiamiento, id_usuario });

      if(!response){
        return res.status(400).json({ message: 'Error al actualizar emprendimiento' });
      }

      res.status(200).json({ message: 'Emprendimiento actualizado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
  async eliminarEmprendimiento(req: Request, res: Response){
    try {
      const { id } = req.params;

      if(!id){
        return res.status(400).json({ message: 'Falta el id' });
      }

      const response = await emprendimientoModel.eliminarEmprendimiento(id);

      if(!response){
        return res.status(404).json({ message: 'El usuario no existe' });
      }

      res.status(200).json({ message: 'Emprendimiento eliminado' });
    } catch {
      res.status(400).json({ message: 'Error en el servidor' });
    }
  }
}

export default new EmprendimientosControllers();