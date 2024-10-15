import { Request, Response } from "express";
import productoModel from "../models/productos";

class ProductoController {
  async obtenerProductos(req: Request, res: Response) {
    try {
      const productos = await productoModel.obtenerProductos();
      res.json(productos);
    } catch {
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  }
  async obtenerProductoPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const producto = await productoModel.obtenerProductoPorId(id);

      if (!producto.id_producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.status(200).json(producto);
    } catch {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  }
  async crearProducto(req: Request, res: Response) {
    try {
      const { nombre, frecuencia_compra, cantidad, precio_promedio, intencion_compra, id_emprendimiento } = req.body;

      if (!nombre || !frecuencia_compra || !cantidad || !precio_promedio || !intencion_compra || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await productoModel.crearProducto({ id_producto: "", nombre, frecuencia_compra, cantidad, precio_promedio, intencion_compra, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "Error al crear producto" });
      }

      res.status(200).json({ message: "Producto creado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async actualizarProducto(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, frecuencia_compra, cantidad, precio_promedio, intencion_compra, id_emprendimiento } = req.body;

      if (!id || !nombre || !frecuencia_compra || !cantidad || !precio_promedio || !intencion_compra || !id_emprendimiento) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const response = await productoModel.actualizarProducto(id, { id_producto: id, nombre, frecuencia_compra, cantidad, precio_promedio, intencion_compra, id_emprendimiento });

      if (!response) {
        return res.status(400).json({ message: "El producto no existe" });
      }

      res.status(200).json({ message: "Producto actualizado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
  async eliminarProducto(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Falta el id" });
      }

      const response = await productoModel.eliminarProducto(id);

      if (!response) {
        return res.status(400).json({ message: "El producto no existe" });
      }

      res.status(200).json({ message: "Producto eliminado" });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export default new ProductoController();