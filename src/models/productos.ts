import connection from "@/database/connection";
import { ProductosType } from "@/types/productos";

class ProductoModel {
  async obtenerProductos(): Promise<ProductosType[]> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM productos", (err, result) => {
          if (err) return resolve([]);
          
          resolve(result as ProductosType[]);
        });
    });
    } catch {
      throw new Error("Error al obtener los productos");
    }
  }
  async obtenerProductoPorId(id: string): Promise<ProductosType> {
    try {
      return new Promise((resolve) => {
        connection.query("SELECT * FROM productos WHERE id_producto = ?", [id], (err, result) => {
          if (err) return resolve({} as ProductosType);
          
          resolve((result as ProductosType[])[0]);
        });
      });
    } catch {
      throw new Error("Producto no encontrado");
    }
  }
  async crearProducto(producto: ProductosType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("INSERT INTO productos (nombre, frecuencia_compra, cantidad, precio_promedio, intencion_compra, id_emprendimiento) VALUES (?, ?, ?, ?, ?, ?)", [producto.nombre, producto.frecuencia_compra, producto.cantidad, producto.precio_promedio, producto.intencion_compra, producto.id_emprendimiento], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al crear producto");
    }
  }
  async actualizarProducto(id: string, producto: ProductosType): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("UPDATE productos SET nombre = ?, frecuencia_compra = ?, cantidad = ?, precio_promedio = ?, intencion_compra = ?, id_emprendimiento = ? WHERE id_producto = ?", [producto.nombre, producto.frecuencia_compra, producto.cantidad, producto.precio_promedio, producto.intencion_compra, producto.id_emprendimiento, id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al actualizar producto");
    }
  }
  async eliminarProducto(id: string): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        connection.query("DELETE FROM productos WHERE id_producto = ?", [id], (err) => {
          if (err) return resolve(false);
          
          resolve(true);
        });
      });
    } catch {
      throw new Error("Error al eliminar producto");
    }
  }
}

export default new ProductoModel();