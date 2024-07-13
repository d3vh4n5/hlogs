# cac-fullstack-node-g10-backend

### Iniciar el proyecto:

1. Instalar dependencias
```bash
npm i
```
2. Preparar el archivo .env, ejecutar el siguiente comando y completarlo con la información de tu entorno local
```bash
cp .env.example .env
```
* ⚠️ Las claves de jwt pueden poner cualquier cosa para probar. La del captcha si tendría que ser real, pero de ultima le ponen cualquier cosa y como solo se usa ene l formulario de contacto, simplemente no usen ese endpoint.

* En cuanto a la base de datos, estamos haciendo una prueba de conexión
al momento de iniciar la aplicación, esta se hace automaticamente y ejecuta la funcion "sync()" de sequelize, la cual crea automaticamente las tablas en la base de datos, tal cual están diseñadas en el modelo. Por ello es que no brindamos el código SQL de las mismas.

3. Correr proyecto:
```bash
npm run dev
```



## Extensiones recomendadas:

- Rest Client: Para hacer archivos de extención .rest y facilitar el testeo.


## Ayudas: 

### Español:

Deploy DB alwaysdata: https://www.youtube.com/watch?v=B5sa_tCCou4

Multer: https://www.youtube.com/watch?v=nRZE3It4B-E

Fernando Herrera:
sequelize: https://www.youtube.com/watch?v=TqpC6Ih05K8&t=1s

Leifer Mendez:
jwt: https://www.youtube.com/watch?v=gkzLAVh8tGM
express-validator: https://www.youtube.com/watch?v=VMRgFfmv6j0&t=117s

Jean Paul Ferreira:
express-validator: https://www.youtube.com/watch?v=gjetVkKLUjU


### Web Dev Simplified (Inglés)

- Autenticacion con contraseña: https://www.youtube.com/watch?v=Ud5xKCYQTjM
- JWT: https://www.youtube.com/watch?v=mbsmsi7l3r4
- Permisos: https://www.youtube.com/watch?v=jI4K7L-LI58 

## Machete de errores:

* 200 OK: Todo salió bien, se puede devolver información útil.
* 201 Created: Se creó satisfactoriamente un nuevo recurso.
* 204 No Content: Todo salió bien, pero no devuelvo nada al cliente.
* 400 Bad Request: La solicitud es incorrecta o no puede ser procesada. Útil para validaciones de entrada fallidas.
* 401 Unauthorized: No está autenticado. Por ejemplo, falta un token de autenticación o es inválido.
* 403 Forbidden: No está permitido, por ejemplo, errores de permisos.
* 404 Not Found: No se encuentra el recurso.
* 409 Conflict: Hay un conflicto, por ejemplo, el correo ya está registrado.
* 422 Unprocessable Entity: La solicitud está bien formada, pero no se puede procesar, por ejemplo, errores de validación específicos del dominio.
* 500 Internal Server Error: Cualquier error del servidor, por ejemplo, problemas con la base de datos.
* 503 Service Unavailable: El servidor no está disponible, por ejemplo, cuando el servidor está en mantenimiento o sobrecargado.

### Redirecciones:

* 301 y 308: Para redirecciones permanentes.
* 302 y 307: Para redirecciones temporales.
* 303: Para redirigir después de operaciones que no deben ser repetidas con el mismo método (como POST).
* 304: Para indicar que el contenido no ha cambiado y puede ser cargado desde la caché.
* 300: Rara vez se usa, pero indica múltiples opciones.

## Ejemplos de uso:

```bash 
// 200 OK
app.get('/recurso/:id', (req, res) => {
    // Lógica para obtener el recurso
    res.status(200).json({ data: recurso });
});

// 201 Created
app.post('/recurso', (req, res) => {
    // Lógica para crear el recurso
    res.status(201).json({ message: 'Recurso creado con éxito', data: nuevoRecurso });
});

// 204 No Content
app.delete('/recurso/:id', (req, res) => {
    // Lógica para eliminar el recurso
    res.status(204).send();
});

// 400 Bad Request
app.post('/recurso', (req, res) => {
    // Lógica para validar la solicitud
    if (!esValido(req.body)) {
        res.status(400).json({ error: 'Solicitud incorrecta' });
    } else {
        // Lógica para crear el recurso
        res.status(201).json({ message: 'Recurso creado con éxito', data: nuevoRecurso });
    }
});

// 401 Unauthorized
app.get('/recurso-seguro', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'No autenticado' });
    } else {
        // Lógica para obtener el recurso seguro
        res.status(200).json({ data: recursoSeguro });
    }
});

// 403 Forbidden
app.get('/recurso-prohibido', (req, res) => {
    if (!tienePermiso(req.user)) {
        res.status(403).json({ error: 'Prohibido' });
    } else {
        // Lógica para obtener el recurso prohibido
        res.status(200).json({ data: recursoProhibido });
    }
});

// 404 Not Found
app.get('/recurso/:id', (req, res) => {
    // Lógica para obtener el recurso
    const recurso = obtenerRecurso(req.params.id);
    if (!recurso) {
        res.status(404).json({ error: 'Recurso no encontrado' });
    } else {
        res.status(200).json({ data: recurso });
    }
});

// 409 Conflict
app.post('/registro', (req, res) => {
    // Lógica para registrar el usuario
    if (emailYaRegistrado(req.body.email)) {
        res.status(409).json({ error: 'El correo ya está registrado' });
    } else {
        // Lógica para registrar el usuario
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
});

// 422 Unprocessable Entity
app.post('/recurso', (req, res) => {
    // Lógica para validar la solicitud
    if (!esValido(req.body)) {
        res.status(422).json({ error: 'Entidad no procesable' });
    } else {
        // Lógica para crear el recurso
        res.status(201).json({ message: 'Recurso creado con éxito', data: nuevoRecurso });
    }
});

// 500 Internal Server Error
app.get('/recurso', (req, res) => {
    try {
        // Lógica para obtener el recurso
        res.status(200).json({ data: recurso });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 503 Service Unavailable
app.get('/recurso', (req, res) => {
    // Simular servidor no disponible
    res.status(503).json({ error: 'Servicio no disponible' });
});

// redireccion:

app.get('/old-route', (req, res) => {
    res.redirect(301, 'http://example.com/new-route');
});


```