import connection from "@/database/connection";
import { UsuarioType } from "@/types/usuarios";

class UsuariosModel {
  async crearUsuario(usuario: UsuarioType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO usuarios (nombres, apellidos, email, telefono, clave) VALUES (?, ?, ?, ?, ?)", [usuario.nombres, usuario.apellidos, usuario.email, usuario.telefono, usuario.clave], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear usuario");
    }
  }
}

const usuariosModel = new UsuariosModel();

export default usuariosModel;