import connection from "@/database/connection";
import { PotencialType } from "@/types/potencial";

class PotencialModel {
  async obtenerPotenciales(): Promise<PotencialType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM potencial", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as PotencialType[]);
        });
    });
    } catch {
      throw new Error("Error al obtener el potencial");
    }
  }
  async obtenerPotencialPorId(id: string): Promise<PotencialType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM potencial WHERE id_potencial = ?", [id], (err, result) => {
          if (err) return resolve({} as PotencialType);
          
          resolve((result as PotencialType[])[0]);
        });
      });
    } catch {
      throw new Error("Potencial no encontrado");
    }
  }
  async crearPotencial(potencial: PotencialType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO potencial (texto, id_producto) VALUES (?, ?)", [potencial.texto, potencial.id_producto], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear potencial");
    }
  }
  async actualizarPotencial(id: string, potencial: PotencialType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE potencial SET texto = ?, id_producto = ? WHERE id_potencial = ?", [potencial.texto, potencial.id_producto, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar potencial");
    }
  }
  async eliminarPotencial(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM potencial WHERE id_potencial = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar potencial");
    }
  }
}

export default new PotencialModel();
