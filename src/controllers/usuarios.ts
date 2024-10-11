import usuariosModel from "@/model/usuarios";
import { UsuarioType } from "@/types/usuarios";
import { Request, Response } from "express";

const expEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const expTelefono = /^[0-9]{4}-[0-9]{4}$/;

class UsuariosControllers{
    async crearUsuario(req: Request, res: Response){
      try {
        const { nombres, apellidos, email, telefono, clave } = req.body as UsuarioType;
        
        if(!nombres || !apellidos || !email || !telefono || !clave){
          return res.status(400).json({ message: 'Faltan campos por llenar' });
        }

        if(!expEmail.test(email)){
          return res.status(400).json({ message: 'Email no válido' });
        }

        if(!expTelefono.test(telefono)){
          return res.status(400).json({ message: 'Teléfono no válido' });
        }

        if(clave.length < 8){
          return res.status(400).json({ message: 'La clave debe tener al menos 8 caracteres' });
        }

        const response = await usuariosModel.crearUsuario({id: '', nombres, apellidos, email, telefono, clave });

        if(!response){
          return res.status(400).json({ message: 'Error al crear usuario' });
        }

        res.status(200).json({ message: 'Usuario creado' });
      } catch {
        res.status(400).json({ message: 'Error en el sevidor' });
      }
    }
}

const usuariosControllers = new UsuariosControllers();

export default usuariosControllers;