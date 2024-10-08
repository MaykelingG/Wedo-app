# Base de datos

## Entidades

### calculo
- id_calculo **(PK)**
- intere
- cuotas
- total_cuotas
- pago_cuotas

### emprendimiento
- id_emprendimiento **(PK)**
- nombre
- descripcion
- financiamiento

### gastos_operacion
- id_gastos **(PK)**
- nombre
- costo
- cantidad

### inversion_activos 
- id_inversiones **(PK)**
- nombre
- costo
- cantidad
- utilidad

### inversion
- id_inversion **(PK)**
- total_inversion
- total_depreciaciones
- total_gasto
- costo
- inversion
- capital

### margen
- id_margen **(PK)**
- costo
- precio
- margen

### material
- id_material **(PK)**
- nombre
- cantidad
- medida
- coste

### potencial 
- id_potencial **(PK)**
- potencial_clientes
- potencial_monetario
- consumo_percapita

### prestamo
- id_prestamo **(PK)**
- valor
- interes
- plazo
- frecuencia

### producto
- id_producto **(PK)**
- nombre
- frecuencia_compra
- cantidad
- precio_promedio
- intension_compra

### segmentacion
- id_segmentacion **(PK)**
- zona
- rango_edad
- densidad
- departamento
- municipio
- sexo
- oferta

### usuarios
- id_usuario **(PK)**
- nombres
- apellidos
- email
- telefono
- clave

## Modelo relacional

![ModeloRelacional](wedo/Base_de_datos_Wedo.png)

## Normalización 

![Normalización](https://docs.google.com/spreadsheets/d/1s7fv8oianVfr7drxLJk2PFrrUzUceg-V/edit?usp=drive_link&ouid=109186360589439784373&rtpof=true&sd=true)
## Diccionario de datos
![Diccionario de datos](https://docs.google.com/spreadsheets/d/1f35bQOtE-CeyartV0HPUPvvTz1NOqTSl/edit?usp=drive_link&ouid=109186360589439784373&rtpof=true&sd=true)
