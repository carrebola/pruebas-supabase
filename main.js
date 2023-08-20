console.log("PRUEBAS SUPABASE")

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://snyzfvtempkxddfgrfji.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXpmdnRlbXBreGRkZmdyZmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyODE0ODYsImV4cCI6MTk5ODg1NzQ4Nn0.5Q9IBst3l-ohFkaC2MARtfSHe_X-BPCJLDzeHdt8RVY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Mostramos por consola la conexión establecida
console.log('conexión', supabase)

//Probamos la api de las tablas
//Leer perfiles
const leerPerfiles = async ()=>{
  try {
    let { data: perfiles, error } = await supabase
  .from('perfiles')
  .select('*')
  console.log('Consulta a la tabla perfiles', perfiles);
  } catch (error) {
    console.log(error);
  }
}

await leerPerfiles()

// Probamos a logearnos
const login = async ()=>{
  try {
    //USER LOGIN
    let { data, error } = await supabase.auth.signInWithPassword({
    email: 'carrebola_test_alumno1@gmail.com',
    password: '123456'
    })
    console.log('login: ', data);
  } catch (error) {
    console.log(error);
  }
}

await login()

// Probamos obtener datos de usuario logueado
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

const perfilDetalleTodos = async ()=>{
  try {
    let { data, error } = await supabase
    .rpc('perfil_detalle_todos')
    console.log('Consulta a la función perfil_detalle_todos: ', data);
  } catch (error) {
    console.log(error);
  }

}
await login()
await perfilDetalleTodos()