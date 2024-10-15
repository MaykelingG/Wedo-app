import connection from "@/database/connection";
import { InversionActivosType } from "@/types/invercionActivos";

class InversionActivoModel {
  async obtenerInversionActivos(): Promise<InversionActivosType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM inversion_activos", (err, result) => {
          if (err) return resolve([]);

          resolve(result as InversionActivosType[]);
        });
      });
    } catch {
      throw new Error("Error al obtener la inversion de activos");
    }
  }
  async obtenerInversionActivoPorId(id: string): Promise<InversionActivosType> {
    try {
      return new Promise((resolve) => {
        connection.query(
          "SELECT * FROM inversion_activos WHERE id_inversion = ?",
          [id],
          (err, result) => {
            if (err) return resolve({} as InversionActivosType);

            resolve((result as InversionActivosType[])[0]);
          }
        );
      });
    } catch {
      throw new Error("Inversion de activos no encontrada");
    }
  }
  async crearInversionActivo(
    inversionActivo: InversionActivosType
  ): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query(
          "INSERT INTO inversion_activos (nombre, costo, cantidad, utilidad, clasificacion_activo, id_emprendimiento) VALUES (?, ?, ?, ?, ?, ?)",
          [
            inversionActivo.nombre,
            inversionActivo.costo,
            inversionActivo.cantidad,
            inversionActivo.utilidad,
            inversionActivo.clasificacion_activo,
            inversionActivo.id_emprendimiento,
          ],
          (err) => {
            if (err) return resolve(false);

            resolve(true);
          }
        );
      });
    } catch {
      throw new Error("Error al crear inversion de activos");
    }
  }
  async actualizarInversionActivo(
    id: string,
    inversionActivo: InversionActivosType
  ): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query(
          "UPDATE inversion_activos SET nombre = ?, costo = ?, cantidad = ?, utilidad = ?, clasificacion_activo = ?, id_emprendimiento = ? WHERE id_inversion = ?",
          [
            inversionActivo.nombre,
            inversionActivo.costo,
            inversionActivo.cantidad,
            inversionActivo.utilidad,
            inversionActivo.clasificacion_activo,
            inversionActivo.id_emprendimiento,
            id,
          ],
          (err) => {
            if (err) return resolve(false);

            resolve(true);
          }
        );
      });
    } catch {
      throw new Error("Error al actualizar inversion de activos");
    }
  }
  async eliminarInversionActivo(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query(
          "DELETE FROM inversion_activos WHERE id_inversion = ?",
          [id],
          (err) => {
            if (err) return resolve(false);

            resolve(true);
          }
        );
      });
    } catch {
      throw new Error("Error al eliminar inversion de activos");
    }
  }
}

export default new InversionActivoModel();
