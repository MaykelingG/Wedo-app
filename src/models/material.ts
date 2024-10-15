import connection from "@/database/connection";
import { MaterialType } from "@/types/material";

class MaterialModel {
  async obtenerMateriales(): Promise<MaterialType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM material", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as MaterialType[]);
        });
    });
    } catch {
      throw new Error("Error al obtener los materiales");
    }
  }
  async obtenerMaterialPorId(id: string): Promise<MaterialType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM material WHERE id_material = ?", [id], (err, result) => {
          if (err) return resolve({} as MaterialType);
          
          resolve((result as MaterialType[])[0]);
        });
      });
    } catch {
      throw new Error("Material no encontrado");
    }
  }
  async crearMaterial(material: MaterialType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO material (nombre, medida, cantidad, coste, id_producto) VALUES (?, ?, ?, ?, ?)", [material.nombre, material.medida, material.cantidad, material.coste, material.id_producto], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear material");
    }
  }
  async actualizarMaterial(id: string, material: MaterialType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE material SET nombre = ?, medida = ?, cantidad = ?, coste = ?, id_producto = ? WHERE id_material = ?", [material.nombre, material.medida, material.cantidad, material.coste, material.id_producto, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar material");
    }
  }
  async eliminarMaterial(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM material WHERE id_material = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar material");
    }
  }
}

export default new MaterialModel();