CREATE DATABASE proyecto_wedo;

USE proyecto_wedo;

CREATE TABLE usuarios(
id_usuario INT PRIMARY KEY IDENTITY(1,1),
nombres VARCHAR(80) NOT NULL,
email VARCHAR(60) NOT NULL,
telefono VARCHAR (9) NOT NULL
);

CREATE TABLE emprendimiento(
id_emprendimiento INT PRIMARY KEY IDENTITY(1,1),
nombre VARCHAR(80) NOT NULL,
descripcion VARCHAR(80) NOT NULL,
financiamiento FLOAT NOT NULL
);

CREATE TABLE prestamo(
id_prestamo  INT PRIMARY KEY IDENTITY(1,1),
valor FLOAT NOT NULL,
interes FLOAT NOT NULL,
plazo INT NOT NULL,
frecuencia VARCHAR(10) NOT NULL
);

CREATE TABLE calculo (
  id_calculo int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  interes float,
  cuotas int,
  total_cuotas int,
  pago_cuota float,
  id_prestamo int,
  FOREIGN KEY (id_prestamo) REFERENCES Prestamo (id_prestamo)
);
GO

CREATE TABLE producto (
  id_producto int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  nombre varchar(40),
  frecuencia_compra int,
  cantidad int,
  precio_promedio float,
  intension_compra float,
  id_emprendimiento int,
  FOREIGN KEY (id_emprendimiento) REFERENCES Emprendimiento (id_emprendimiento)
);
GO

CREATE TABLE segmentacion (
  id_segmentacion int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  zona varchar(10),
  rango_edad varchar(20),
  densidad int,
  id_producto int,
  id_departamento int,
  id_municipio int,
  id_oferta int,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto),
  FOREIGN KEY (id_departamento) REFERENCES departamento (id_departamento),
  FOREIGN KEY (id_municipio) REFERENCES municipio (id_municipio),
  FOREIGN KEY (id_oferta) REFERENCES oferta (id_oferta)
);
GO

CREATE TABLE potencial (
  id_potencial int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  potencial_clientes float,
  potencial_monetario float,
  consumo_percapita float,
  id_producto int,
  FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);
GO

CREATE TABLE inversion_activos (
  id_inversiones int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  nombre varchar(40),
  costo float,
  cantidad int,
  utilidad int,
  id_emprendimiento int,
  id_clasificacion_activo int,
  FOREIGN KEY (id_emprendimiento) REFERENCES Emprendimiento (id_emprendimiento)
);
GO

CREATE TABLE gastos_operacion (
  id_gastos int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  nombre varchar(40),
  costo float,
  cantidad int,
  id_emprendimiento int,
  id_clasificacion_gasto int,
  FOREIGN KEY (id_emprendimiento) REFERENCES Emprendimiento (id_emprendimiento)
);
GO

CREATE TABLE inversion (
  id_inversion int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  total_inversion float,
  total_depreciaciones float,
  total_gasto float,
  costo float,
  inversion float,
  capital float,
  id_emprendimiento int,
  FOREIGN KEY (id_emprendimiento) REFERENCES Emprendimiento (id_emprendimiento)
);
GO

CREATE TABLE material (
  id_material int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  nombre varchar(30),
  medida varchar(20),
  cantidad float,
  coste float,
  id_producto int,
  FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);
GO

CREATE TABLE margen (
  id_margen int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  costo float,
  precio float,
  margen float,
  id_producto int,
  FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);
GO
-- TRIGGER
CREATE TRIGGER validar_email
ON usuarios
FOR INSERT, UPDATE
AS
BEGIN
    DECLARE @email VARCHAR(60)
    SELECT @email = email FROM inserted
    IF @email NOT LIKE '%_@__%.__%'
    BEGIN
        RAISERROR ('El formato del email no es válido', 16, 1)
        ROLLBACK TRANSACTION
    END
END
GO

CREATE TRIGGER actualizar_stock_material
ON material
AFTER INSERT, UPDATE
AS
BEGIN
    DECLARE @id_producto INT, @cantidad FLOAT
    SELECT @id_producto = id_producto, @cantidad = cantidad FROM inserted

    UPDATE producto
    SET cantidad = cantidad - @cantidad
    WHERE id_producto = @id_producto
END
GO
-- PENDIENTE CREAR TRIGGER
