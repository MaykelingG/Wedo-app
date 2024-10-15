import connection from "@/database/connection";
import { SegmentacionType } from "@/types/segmentacion";

class SegmentacionModel {
  async obtenerSegmentaciones(): Promise<SegmentacionType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM segmentacion", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as SegmentacionType[]);
        });
    });
    } catch {
      throw new Error("Error al obtener la segmentación");
    }
  }
  async obtenerSegmentacionPorId(id: string): Promise<SegmentacionType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM segmentacion WHERE id_segmentacion = ?", [id], (err, result) => {
          if (err) return resolve({} as SegmentacionType);
          
          resolve((result as SegmentacionType[])[0]);
        });
      });
    } catch {
      throw new Error("Segmentación no encontrada");
    }
  }
  async crearSegmentacion(segmentacion: SegmentacionType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO segmentacion (texto, id_producto) VALUES (?, ?)", [segmentacion.texto, segmentacion.id_producto], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear segmentación");
    }
  }
  async actualizarSegmentacion(id: string, segmentacion: SegmentacionType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE segmentacion SET texto = ?, id_producto = ? WHERE id_segmentacion = ?", [segmentacion.texto, segmentacion.id_producto, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar segmentación");
    }
  }
  async eliminarSegmentacion(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM segmentacion WHERE id_segmentacion = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar segmentación");
    }
  }
}

export default new SegmentacionModel();