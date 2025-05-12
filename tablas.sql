----Atributos derivados: 
-- Edad del usuario: se deriva de fecha_nacimiento con DATE_PART('year', AGE(fecha_nacimiento))
-- Total donado por usuario: Se deriva de la suma de monto en tabla donaciones --> SUM(monto) GROUP BY usuario_id
-- Cantidad de campañas en las que participa un voluntario, se deriva del conteo de registros en la tabla voluntarios --> COUNT(*) GROUP BY usuario_id

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    fecha_nacimiento DATE,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20)
);

CREATE TABLE direcciones_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    direccion TEXT
);

CREATE TABLE campanas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    tipo VARCHAR(50) -- 'donación', 'voluntariado' o ambos
);

CREATE TABLE donaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    campana_id INT REFERENCES campanas(id),
    fecha DATE,
    monto DECIMAL(10,2)
);

CREATE TABLE voluntarios (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    campana_id INT REFERENCES campanas(id),
    fecha_inscripcion DATE
);

CREATE TABLE organizaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    contacto_email VARCHAR(100)
);

CREATE TABLE habilidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

----Tabla de cruce 	N:M
CREATE TABLE usuario_habilidad (
    usuario_id INT REFERENCES usuarios(id),
    habilidad_id INT REFERENCES habilidades(id),
    PRIMARY KEY (usuario_id, habilidad_id)
);

---Tabla de cruce N:M
CREATE TABLE campana_organizacion (
    campana_id INT REFERENCES campanas(id),
    organizacion_id INT REFERENCES organizaciones(id),
    PRIMARY KEY (campana_id, organizacion_id)
);

CREATE TABLE medios_contacto (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    tipo VARCHAR(50), -- 'teléfono', 'email', 'red social'
    valor TEXT
);

CREATE TABLE seguimientos_voluntarios (
    id SERIAL PRIMARY KEY,
    voluntario_id INT REFERENCES voluntarios(id),
    observacion TEXT,
    horas DECIMAL(5,2),
    fecha DATE
);

CREATE TABLE comentarios_campana (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    campana_id INT REFERENCES campanas(id),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


