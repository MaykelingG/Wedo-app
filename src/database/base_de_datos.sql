CREATE DATABASE proyecto_wedo;
USE proyecto_wedo;

CREATE TABLE usuarios(
  id_usuario CHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  clave VARCHAR(60) NOT NULL
);

CREATE TABLE emprendimiento(
  id_emprendimiento INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  descripcion VARCHAR(80) NOT NULL,
  financiamiento FLOAT NOT NULL
);

CREATE TABLE prestamo(
  id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
  valor FLOAT NOT NULL,
  interes FLOAT NOT NULL,
  plazo INT NOT NULL,
  frecuencia VARCHAR(10) NOT NULL
);

CREATE TABLE calculo (
  id_calculo INT PRIMARY KEY AUTO_INCREMENT,
  interes FLOAT,
  cuotas INT,
  total_cuotas INT,
  pago_cuota FLOAT,
  id_prestamo INT,
  FOREIGN KEY (id_prestamo) REFERENCES prestamo (id_prestamo)
);

CREATE TABLE producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  frecuencia_compra INT,
  cantidad INT,
  precio_promedio FLOAT,
  intension_compra FLOAT,
  id_emprendimiento INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE segmentacion (
  id_segmentacion INT PRIMARY KEY AUTO_INCREMENT,
  zona VARCHAR(10),
  rango_edad VARCHAR(20),
  densidad INT,
  id_producto INT,
  id_departamento INT,
  id_municipio INT,
  id_oferta INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE potencial (
  id_potencial INT PRIMARY KEY AUTO_INCREMENT,
  potencial_clientes FLOAT,
  potencial_monetario FLOAT,
  consumo_percapita FLOAT,
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE inversion_activos (
  id_inversiones INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  costo FLOAT,
  cantidad INT,
  utilidad INT,
  id_emprendimiento INT,
  id_clasificacion_activo INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE gastos_operacion (
  id_gastos INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  costo FLOAT,
  cantidad INT,
  id_emprendimiento INT,
  id_clasificacion_gasto INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE inversion (
  id_inversion INT PRIMARY KEY AUTO_INCREMENT,
  total_inversion FLOAT,
  total_depreciaciones FLOAT,
  total_gasto FLOAT,
  costo FLOAT,
  inversion FLOAT,
  capital FLOAT,
  id_emprendimiento INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE material (
  id_material INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(30),
  medida VARCHAR(20),
  cantidad FLOAT,
  coste FLOAT,
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE margen (
  id_margen INT PRIMARY KEY AUTO_INCREMENT,
  costo FLOAT,
  precio FLOAT,
  margen FLOAT,
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

-- TRIGGERS

DELIMITER //
CREATE TRIGGER validar_telefono
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF NEW.telefono NOT REGEXP '^[0-9]{4}-[0-9]{4}$' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El formato del teléfono no es válido';
    END IF;
END; //
DELIMITER ;

DELIMITER //
CREATE TRIGGER validar_email
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF NEW.email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El formato del email no es válido';
    END IF;
END; //
DELIMITER ;

-- TRIGGER PARA ACTUALIZAR EL STOCK DE MATERIAL
DELIMITER //
CREATE TRIGGER actualizar_stock_material
AFTER INSERT ON material
FOR EACH ROW
BEGIN
    UPDATE producto
    SET cantidad = cantidad - NEW.cantidad
    WHERE id_producto = NEW.id_producto;
END; //
DELIMITER ;