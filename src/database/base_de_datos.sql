CREATE DATABASE proyecto_wedo;
USE proyecto_wedo;

-- EL UUID() GENERA UNA CADENA DE 36 CARACTERES QUE REPRESENTA UN IDENTIFICADOR ÚNICO UNIVERSAL
CREATE TABLE usuarios(
  id_usuario CHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  email VARCHAR(60) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  clave VARCHAR(60) NOT NULL
);

CREATE TABLE emprendimientos(
  id_emprendimiento INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  descripcion VARCHAR(80) NOT NULL,
  financiamiento FLOAT NOT NULL,
  id_usuario CHAR(36),
  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE prestamos(
  id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
  valor FLOAT NOT NULL,
  interes FLOAT NOT NULL,
  plazo INT NOT NULL,
  frecuencia VARCHAR(10) NOT NULL,
  id_emprendimiento INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  frecuencia_compra INT,
  cantidad INT,
  precio_promedio FLOAT,
  intencion_compra FLOAT,
  id_emprendimiento INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE    0 (
  id_segmentacion INT PRIMARY KEY AUTO_INCREMENT,
  texto TEXT,
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE potencial (
  id_potencial INT PRIMARY KEY AUTO_INCREMENT,
  texto TEXT,
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

CREATE TABLE inversion_activos (
  id_inversion INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  costo FLOAT,
  cantidad INT,
  utilidad INT,
  clasificacion_activo VARCHAR(255),
  id_emprendimiento INT,
  FOREIGN KEY (id_emprendimiento) REFERENCES emprendimiento (id_emprendimiento)
);

CREATE TABLE gastos_operacion (
  id_gastos INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(40),
  costo FLOAT,
  cantidad INT,
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