import connection from "@/database/connection";
import { EmprendimientoType } from "@/types/emprendimientos";

class EmprendimientoModel{
  async obtenerEmprendimientos(): Promise<EmprendimientoType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM emprendimientos", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as EmprendimientoType[]);
        });
      });
    } catch {
      throw new Error("Error al obtener emprendimientos");
    }
  }
  async obtenerEmprendimientoPorId(id: string): Promise<EmprendimientoType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM emprendimientos WHERE id_emprendimiento = ?", [id], (err, result) => {
          if (err) return resolve({} as EmprendimientoType);
          
          resolve((result as EmprendimientoType[])[0]);
        });
      });
    } catch {
      throw new Error("Emprendimiento no encontrado");
    }
  }
  async crearEmprendimiento(emprendimiento: EmprendimientoType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO emprendimientos (nombre, descripcion, financiamiento, id_usuario) VALUES (?, ?, ?, ?)", [emprendimiento.nombre, emprendimiento.descripcion, emprendimiento.financiamiento, emprendimiento.id_usuario], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear emprendimiento");
    }
  }
  async actualizarEmprendimiento(id: string, emprendimiento: EmprendimientoType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE emprendimientos SET nombre = ?, descripcion = ?, financiamiento = ?, id_usuario = ? WHERE id_emprendimiento = ?", [emprendimiento.nombre, emprendimiento.descripcion, emprendimiento.financiamiento, emprendimiento.id_usuario, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar emprendimiento");
    }
  }
  async eliminarEmprendimiento(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM emprendimientos WHERE id_emprendimiento = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar emprendimiento");
    }
  }
}

export default new EmprendimientoModel();