---
title: Pruebas de conexión a la bd desde proyecto javascript
---

Para verificar que somos capaces de conectarnos desde una aplicación basada en javascript a nuestro servicio backend vamos a hacer unas pruebas.

La idea es crear una aplicación con **vite** que contenga un archivo **main.js** con todo el código necesario para hacer la conexión y las consultas de prueba. Los resultados los mostraremos a través de la consola del navegador.

:::note
Si en el momento de hacer estas pruebas aún no sabes que es vite, no te rayes y sigue los pasos. En el Srpint 3, cuando configuramos nuestro entorno de desarrollo para crear la SPA lo explicamos con detalle.
:::

Hagámoslo paso a paso

## Conexión con la base de datos
### Creando el proyecto con vite

1. Crea una carpeta con nombre `pruebas-supabase` en tu carpeta de trabajo
2. Abre tu VSCode y arrastra la carpeta hasta la ventana central
3. Abre un terminal y crea el proyecto nuevo:

:::note Nota
   El punto indica que quieres que se cree el proyecto en la misma carpeta que estas en ese momento, es decir, en la carpeta *pruebas-supabase*
:::
  
  ```
  npm create vite@latest .   
  ```
4. Te preguntará si quieres instalar la última versión de vite. Diremos que sí e indicaremos que queremos un proyecto basado en *vanilla* (Es decir, en JS puro) y usando JavaScript (y no TypeScript).

  Si todo ha ido bien debería haberse creado el scaffolding con una serie de archivos de prueba.

5. Ahora toca ejecutar desde el terminal npm install y npm run dev para que se instalen las librerias necesarias y se levante un servidor con la apliación ejecutandose.

  ```
  npm install
  ```
  ```
  npm run dev
  ```
  Abrimos un navegador con la url en la que se está mostrando la aplicación (en mi caso ➜  Local:   http://localhost:5173/) y podremos ver la app con un ejemplo de ejecución.

6. Como a mi solo me interesa ejecutar código desde **main.js** para probar la los scripts de conexión con la bd, podemos borrar todo lo que hay en main.js y poner un console.log con el texto "PRUEBA SUPABASE".

  ```javascript title="main.js"
  console.log("PRUEBAS SUPABASE")
  ```
  Si ejecutamos ahora veremos una página en blanco y en la consola del navegador veremos el console.log

  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas1.png)

### Conectando con la base de datos
7. Para conectarnos con la base de datos necesitamos el script de la documentación de nuestro proyecto de supabase. Lo rescatamos y lo añadimos main.js. 

  ```javascript title="main.js"
  console.log("PRUEBAS SUPABASE")

  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = 'https://snyzfvtempkxddfgrfji.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXpmdnRlbXBreGRkZmdyZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyODE0ODYsImV4cCI6MTk5ODg1NzQ4Nn0.5Q9IBst3l-ohFkaC2MARtfSHe_X-BPCJLDzeHdt8RVY'
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Mostramos por consola la conexión establecida
  console.log('conexión', supabase)
  ```

  :::danger ¡Cuidado!
  No copies el código de la documentación, debes copiarlo de tu proyecto ya que no tenemos ni la misma url ni la misma apikey
  :::

8. Como puedes ver de momento no funciona. Eso es debido a que no tenemos instaladas las dependencias necesarias (librerias de supabase). Vamos a instalarlas escribiendo en el terminal:

  ```
  npm install --save @supabase/supabase-js
  ```
  :::note Nota
  Si la aplicación se está ejecutando puedes pararla con **ctrl+c**, instalar la libreria y volver a ejecutar la aplicación con **npm run dev**
  :::

  El navegador debería mostrar la conexíon con un mensaje de este tipo:

  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas2.png)

## Consultando las tablas
### Consultas a la tabla perfiles

Para probar la api de supabase vamos a crear una función llamada leerPerfiles que despues ejecutaremos. Esta función debería mostrar por consola una respuesta en formato json con todas las filas de la tabla perfiles. 

1. Añade el siguiente código a tu archivo main.js
   
  ```javascript	title="main.js"
  //Probamos la api de las tablas
  //función para Leer perfiles
  const leerPerfiles = async ()=>{
    try {
      let { data: perfiles, error } = await supabase
    .from('perfiles')
    .select('*')
    console.log('perfiles', perfiles);
    } catch (error) {
      console.log(error);
    }
  }
  // Ejecutamos la función
  await leerPerfiles()
  ```
  :::note Nota
  Fíjate que en la definición de la función ponemos *await*. Esto es porque las conexiones con supabase son asincronas.

  También hemos incluido en nuestra función un try/catch para gestionar los posibles errores de conexión.
  :::

  Esto es lo que debería mostrarnos:
  
  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas3.png)

  Como puedes ver, lo que nos devuelve la función es **un array de tantos objetos como filas tiene la consulta** y cada objeto tiene una **propiedad que corresponde a un campo** de la tabla. 

### Consultas a la tabla proyectos

:::note ✍ TAREA ✍ 
Prueba a leer los datos de la **tabla proyectos**. 
:::

:::note ✍ TAREA ✍ 
Prueba a insertar un nuevo proyecto en la **tabla proyectos**. Ten en cuenta que en el user_id debes usar un UUID real que corresponda a uno de tus usuarios registrados
:::

:::note ✍ TAREA ✍ 
Prueba a leer ese proyecto en concreto a partir de su ID **tabla proyectos**. 
:::

:::note ✍ TAREA ✍ 
Prueba a borrar ese proyecto. A continuación muestra todos los proyectos de nuevo para verificar que efectivamente se ha borrado. 
:::

:::note ✍ TAREA ✍ 
Prueba a leer el proyecto borrado de la **tabla proyectos** y comprueba que error te muestra. 
:::

## Manejando sesiones y usuarios
### Inicio de sesión

Vamos a probar el inicio de sesión. Pero antes, **es imprescindible que habilitemos el sistema de Autenticación** que podemos usar en nuestro proyecto de Supabase. Puedes hacerlo desde esta ventana:

![Providers](/imagenes/v1/bd/providers.png)

:::tip Google authentication
Puedes usar otros proveedores para trabajar con usuarios, como el sistema de autenticación de Google. Tienes más información en el blog:

👉[Usando el proveedor de Google](Auth con Google)👈
:::

1. Crea la función **login()** en tu archivo main.js y ejecutala
   

  ```javascript title="main.js"
  // Probamos a logearnos
  const login = async ()=>{
    try {
      //USER LOGIN
      let { data, error } = await supabase.auth.signInWithPassword({
      email: 'carrebola_test_alumno1@gmail.com',
      password: '123456'
      })
      console.log('login', data);
    } catch (error) {
      console.log(error);
    }
  }

  await login()
  ```
  Si el usuario existe y las credenciales coinciden debería mostrarte todos los datos: 

  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas4.png)

### Consultando datos de usuario logueado
2. Como ahora tenemos una sesión abierta podemos consultar los datos del usuario logueado. Para ello creamos la función getUser()

  ```javascript title ="main.js"
  const getUser = async ()=>{
    try {
      //GET USER
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Consultamos datos de usuario con getUser(): ', user);
    } catch (error) {
      console.log(error);
    }
  }

  await getUser()

  ```

  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas5.png)

  El resultado es justo lo que esperabamos. Tenemos un **json** con todos los **datos del usuario** que en este momento ha iniciado sesión. Pero... y ¿si cerramos la sesión? Vamos a comprobarlo.

### Cerrando sesión
3. Vamos a cerrar la sesión y a intentar mostrar los datos de usuario logueado, veremos que nos muestra:

  ```javascript title="main.js"
  // Probamos a cerrar sesión
  const logout = async ()=>{
    try {
      let { error } = await supabase.auth.signOut()
      console.log('Sesión cerrada con exito: ');
    } catch (error) {
      console.log(error);
    }
  }
  // Cerramos sesión 
  await logout()
  // Probamos a mostrar datos de usuario logueado. Debería darnos null 
  await getUser()

  ```
  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas6.png)

  Efectívamente, la sesión se ha cerrado con éxito y prueba de ello es que, al intentar mostrar los datos del usuario logueado, obtenemos un **error 401** y como mensaje: *null*.

  :::info ¿Qué es el Error 401?
  El error HTTP 401, también conocido como "Unauthorized" (No autorizado), es un código de estado que indica que el servidor ha entendido la solicitud, pero el cliente que realiza la solicitud no tiene las credenciales o autorización adecuadas para acceder al recurso solicitado.
  :::

## Probando funciones de posgreSQL
### Función proyectosDetalleTodos
Es hora de usar la API para acceder a funciones especificas que hemos creado en Supabase. 
1. Para ello vamos a crear la función proyectosDetalleTodos() y la ejecutamos

  ```javascript title="main.js"
  //Probamos la api de las funciones
  const proyectoDetalleTodos = async ()=>{
    try {
      let { data, error } = await supabase
      .rpc('proyecto_detalle_todos')
      console.log('Consulta a la función proyecto_detalle_todos: ', data);
    } catch (error) {
      console.log(error);
    }

  }
  await proyectoDetalleTodos()

  ```
  ![PRUEBAS SUPABASE](/imagenes/v1/bd/pruebas7.png)

  ¡Ahí lo tenemos! Un array con todos los proyectos donde se incluyen las propiedades nombre_usuario y apellidos_usuario. ¡Somos unos/as putos/as cracks! 😎

Hasta aquí las pruebas de la conexión al servicio backend con supabase. En versiones posteriores probaremos otras funcionalidades que nos ofrece Supabase como el **Storage de archivos**, **triggers**, **funciones en tiempo real**, etc.








