import connection from "@/database/connection";
import { PrestamoType } from "@/types/prestamos";

class PrestamosModel {
  async obtenerPrestamos(): Promise<PrestamoType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM prestamos", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as PrestamoType[]);
        });
      });
    } catch {
      throw new Error("Error al obtener emprendimientos");
    }
  }
  async obtenerPrestamoPorId(id: string): Promise<PrestamoType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM prestamos WHERE id_prestamo = ?", [id], (err, result) => {
          if (err) return resolve({} as PrestamoType);
          
          resolve((result as PrestamoType[])[0]);
        });
      });
    } catch {
      throw new Error("Emprendimiento no encontrado");
    }
  }
  async crearPrestamo(prestamo: PrestamoType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO prestamos (valor, interes, plazo, frecuencia, id_emprendimiento) VALUES (?, ?, ?, ?, ?)", [prestamo.valor, prestamo.interes, prestamo.plazo, prestamo.frecuencia, prestamo.id_emprendimiento], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear emprendimiento");
    }
  }
  async actualizarPrestamo(id: string, prestamo: PrestamoType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE prestamos SET valor = ?, interes = ?, plazo = ?, frecuencia = ?, id_emprendimiento = ? WHERE id_prestamo = ?", [prestamo.valor, prestamo.interes, prestamo.plazo, prestamo.frecuencia, prestamo.id_emprendimiento, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar emprendimiento");
    }
  }
  async eliminarPrestamo(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM prestamos WHERE id_prestamo = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar emprendimiento");
    }
  }
}

export default new PrestamosModel();