CREATE DATABASE Wedo;

USE Wedo;

CREATE TABLE `usuarios` (
  `id_usuario` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombres` varchar(80),
  `email` varchar(60),
  `telefono` varchar(9),
  `clave` varchar(80)
);

CREATE TABLE `clasificacion_gasto` (
  `id_clasificacion_gasto` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `gasto` varchar(40)
);

CREATE TABLE `clasificacion_activo` (
  `id_clasificacion_activo` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `activo` varchar(40)
);

CREATE TABLE `Departamento` (
  `id_departamento` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `departamento` varchar(40)
);

CREATE TABLE `Municipio` (
  `id_municipio` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `municipio` varchar(40),
  `id_departamento` int UNSIGNED,
  FOREIGN KEY (`id_departamento`) REFERENCES `Departamento` (`id_departamento`) ON
DELETE
	CASCADE
);

CREATE TABLE `Emprendimiento` (
  `id_emprendimiento` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` int UNSIGNED,
  `nombre` varchar(80),
  `descripcion` varchar(80),
  `financiamiento` double,
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON
DELETE
	CASCADE
);

CREATE TABLE `Prestamo` (
  `id_prestamo` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `valor` double,
  `interes` double,
  `plazo` int,
  `frecuencia` varchar(10),
  `id_emprendimiento` int UNSIGNED,
  FOREIGN KEY (`id_emprendimiento`) REFERENCES `Emprendimiento` (`id_emprendimiento`) ON
DELETE
	CASCADE
);

CREATE TABLE `Calculo` (
  `id_calculo` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `interes` double,
  `cuotas` int,
  `total_coutas` int,
  `pago_couta` double,
  `id_prestamo` int UNSIGNED,
  FOREIGN KEY (`id_prestamo`) REFERENCES `Prestamo` (`id_prestamo`) ON
DELETE
	CASCADE
);

CREATE TABLE `Producto` (
  `id_producto` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_emprendimiento` int UNSIGNED,
  `nombre` varchar(40),
  `cantidad` int,
  `precio_promedio` double,
  `intension_compra` double,
  `frecuencia_compra` int,
  FOREIGN KEY (`id_emprendimiento`) REFERENCES `Emprendimiento` (`id_emprendimiento`) ON
DELETE
	CASCADE
);

CREATE TABLE `segmentacion` (
  `id_segmentacion` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `zona` varchar(10),
  `rango_edad` varchar(20),
  `densidad` int,
  `id_producto` int UNSIGNED,
  `id_municipio` int UNSIGNED,
  FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON
DELETE
	CASCADE,
	FOREIGN KEY (`id_municipio`) REFERENCES `Municipio` (`id_municipio`) ON
	DELETE
		CASCADE
);

CREATE TABLE `potencial` (
  `id_potencial` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `potencial_clientes` double,
  `potencial_monetario` double,
  `consumo_percapita` double,
  `id_producto` int UNSIGNED,
  FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON
DELETE
	CASCADE
);

CREATE TABLE `inversion_activos` (
  `id_inversiones` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40),
  `costo` double,
  `cantidad` int,
  `utilidad` int,
  `id_emprendimiento` int UNSIGNED,
  `id_clasificacion_activo` int UNSIGNED,
  FOREIGN KEY (`id_emprendimiento`) REFERENCES `Emprendimiento` (`id_emprendimiento`) ON
DELETE
	CASCADE,
	FOREIGN KEY (`id_clasificacion_activo`) REFERENCES `clasificacion_activo` (`id_clasificacion_activo`) ON
	DELETE
		CASCADE
);

CREATE TABLE `gastos_operacion` (
  `id_gastos` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40),
  `costo` double,
  `cantidad` int,
  `id_emprendimiento` int UNSIGNED,
  `id_clasificacion_gasto` int UNSIGNED,
  FOREIGN KEY (`id_emprendimiento`) REFERENCES `Emprendimiento` (`id_emprendimiento`) ON
DELETE
	CASCADE,
	FOREIGN KEY (`id_clasificacion_gasto`) REFERENCES `clasificacion_gasto` (`id_clasificacion_gasto`) ON
	DELETE
		CASCADE
);

CREATE TABLE `inversion` (
  `id_inversion` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `total_inversion` double,
  `total_depreciaciones` double,
  `total_gasto` double,
  `costo` double,
  `inversion` double,
  `capital` double,
  `id_emprendimiento` int UNSIGNED,
  FOREIGN KEY (`id_emprendimiento`) REFERENCES `Emprendimiento` (`id_emprendimiento`) ON
DELETE
	CASCADE
);

CREATE TABLE `material` (
  `id_material` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30),
  `medida` varchar(20),
  `cantidad` double,
  `coste` double,
  `id_producto` int UNSIGNED,
  FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON
DELETE
	CASCADE
);

CREATE TABLE `margen` (
  `id_margen` int UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `costo` double,
  `precio` double,
  `margen` double,
  `id_producto` int UNSIGNED,
  FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`) ON
DELETE
	CASCADE
);
