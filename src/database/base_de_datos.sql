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

  --VALIDAR EL NUMERO DE TELEFONO
CREATE TRIGGER validar_telefono
ON usuarios
FOR INSERT, UPDATE
AS
BEGIN
    DECLARE @telefono VARCHAR(9)
    SELECT @telefono = telefono FROM inserted
    IF @telefono NOT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
    BEGIN
        RAISERROR ('El formato del teléfono no es válido', 16, 1)
        ROLLBACK TRANSACTION
    END
END
GO

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

-- Insertar datos en la tabla usuarios
INSERT INTO usuarios (nombres, email, telefono) VALUES 
('Juan Pérez', 'juan.perez@example.com', '123456789'),
('María López', 'maria.lopez@example.com', '987654321');

-- Insertar datos en la tabla emprendimiento
INSERT INTO emprendimiento (nombre, descripcion, financiamiento) VALUES 
('Tech Solutions', 'Desarrollo de software', 50000.00),
('Eco Products', 'Productos ecológicos', 30000.00);

-- Insertar datos en la tabla prestamo
INSERT INTO prestamo (valor, interes, plazo, frecuencia) VALUES 
(10000.00, 5.5, 12, 'Mensual'),
(20000.00, 4.5, 24, 'Mensual');

-- Insertar datos en la tabla calculo
INSERT INTO calculo (interes, cuotas, total_cuotas, pago_cuota, id_prestamo) VALUES 
(5.5, 12, 12, 850.00, 1),
(4.5, 24, 24, 900.00, 2);

-- Insertar datos en la tabla producto
INSERT INTO producto (nombre, frecuencia_compra, cantidad, precio_promedio, intension_compra, id_emprendimiento) VALUES 
('Laptop', 6, 50, 800.00, 0.8, 1),
('Botella Reutilizable', 12, 200, 15.00, 0.9, 2);

-- Insertar datos en la tabla segmentacion
INSERT INTO segmentacion (zona, rango_edad, densidad, id_producto, id_departamento, id_municipio, id_oferta) VALUES 
('Urbana', '18-35', 1000, 1, 1, 1, 1),
('Rural', '36-50', 500, 2, 2, 2, 2);

-- Insertar datos en la tabla potencial
INSERT INTO potencial (potencial_clientes, potencial_monetario, consumo_percapita, id_producto) VALUES 
(1000.00, 800000.00, 800.00, 1),
(500.00, 7500.00, 15.00, 2);

-- Insertar datos en la tabla inversion_activos
INSERT INTO inversion_activos (nombre, costo, cantidad, utilidad, id_emprendimiento, id_clasificacion_activo) VALUES 
('Servidor', 5000.00, 10, 5, 1, 1),
('Máquina de reciclaje', 2000.00, 5, 3, 2, 2);

-- Insertar datos en la tabla gastos_operacion
INSERT INTO gastos_operacion (nombre, costo, cantidad, id_emprendimiento, id_clasificacion_gasto) VALUES 
('Electricidad', 100.00, 12, 1, 1),
('Agua', 50.00, 12, 2, 2);

-- Insertar datos en la tabla inversion
INSERT INTO inversion (total_inversion, total_depreciaciones, total_gasto, costo, inversion, capital, id_emprendimiento) VALUES 
(100000.00, 5000.00, 2000.00, 95000.00, 50000.00, 45000.00, 1),
(50000.00, 2000.00, 1000.00, 47000.00, 30000.00, 17000.00, 2);

-- Insertar datos en la tabla material
INSERT INTO material (nombre, medida, cantidad, coste, id_producto) VALUES 
('Plástico', 'kg', 100.00, 200.00, 2),
('Metal', 'kg', 50.00, 500.00, 1);

-- Insertar datos en la tabla margen
INSERT INTO margen (costo, precio, margen, id_producto) VALUES 
(700.00, 800.00, 100.00, 1),
(10.00, 15.00, 5.00, 2);

