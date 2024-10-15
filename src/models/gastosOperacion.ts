import connection from "@/database/connection";
import { GastosOperacionType } from "@/types/gastosOperacion";

class GastosOperacionModel {
  async obtenerGastosOperacion(): Promise<GastosOperacionType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM gastos_operacion", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as GastosOperacionType[]);
        });
    });
    } catch {
      throw new Error("Error al obtener los gastos de operación");
    }
  }
  async obtenerGastoOperacionPorId(id: string): Promise<GastosOperacionType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM gastos_operacion WHERE id_gastos = ?", [id], (err, result) => {
          if (err) return resolve({} as GastosOperacionType);
          
          resolve((result as GastosOperacionType[])[0]);
        });
      });
    } catch {
      throw new Error("Gasto de operación no encontrado");
    }
  }
  async crearGastoOperacion(gasto: GastosOperacionType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO gastos_operacion (nombre, costo, cantidad, id_emprendimiento) VALUES (?, ?, ?, ?)", [gasto.nombre, gasto.costo, gasto.cantidad, gasto.id_emprendimiento], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear gasto de operación");
    }
  }
  async actualizarGastoOperacion(id: string, gasto: GastosOperacionType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE gastos_operacion SET nombre = ?, costo = ?, cantidad = ?, id_emprendimiento = ? WHERE id_gastos = ?", [gasto.nombre, gasto.costo, gasto.cantidad, gasto.id_emprendimiento, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar gasto de operación");
    }
  }
  async eliminarGastoOperacion(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM gastos_operacion WHERE id_gastos = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
    });
    } catch {
      throw new Error("Error al eliminar gasto de operación");
    }
  }
}

export default new GastosOperacionModel();