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
  async obtenerUsuarios(): Promise<UsuarioType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM usuarios", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as UsuarioType[]);
        });
      });
    } catch {
      throw new Error("Error al obtener usuarios");
    }
  }
  async obtenerUsuarioPorId(id: string): Promise<UsuarioType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id], (err, result) => {
          if (err) return resolve({} as UsuarioType);
          
          resolve((result as UsuarioType[])[0]);
        });
      });
    } catch {
      throw new Error("Usuario no encontrado");
    }
  }
  async actualizarUsuario(id: string, usuario: UsuarioType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?, telefono = ?, clave = ? WHERE id_usuario = ?", [usuario.nombres, usuario.apellidos, usuario.email, usuario.telefono, usuario.clave, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar usuario");
    }
  }
  async eliminarUsuario(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar usuario");
    }
  }
}

export default new UsuariosModel();